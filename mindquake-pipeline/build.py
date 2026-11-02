"""Build one Mindquake reel: narration -> timing -> video -> sound mix -> final mp4 + cover."""
import json, re, subprocess, sys, os
import numpy as np, soundfile as sf
from scipy.signal import butter, sosfilt, fftconvolve

OUT = 'out'; os.makedirs(OUT, exist_ok=True); os.makedirs('vo', exist_ok=True)
SPECS = {s['id']: s for s in json.load(open('specs.json'))}
_k = None
def kokoro():
    global _k
    if _k is None:
        from kokoro_onnx import Kokoro
        _k = Kokoro('/home/claude/reel/kokoro.onnx', '/home/claude/reel/voices.bin')
    return _k

SR = 24000
def voice(text, path, seed):
    rng = np.random.default_rng(seed)
    parts = [p.strip() for p in re.split(r'(?<=[.?!])\s+|(?<=\.\.\.)\s*', text) if p.strip()]
    chunks = []
    for i, ph in enumerate(parts):
        a, _ = kokoro().create(ph, voice='af_heart', speed=float(rng.uniform(0.93, 0.98)), lang='en-us')
        nz = np.where(np.abs(a) > 0.01)[0]
        a = a[max(0, nz[0]-240): nz[-1]+1200]
        chunks += [a, np.zeros(int((0.42 if i < len(parts)-1 else 0.05)*SR))]
    v = np.concatenate(chunks)
    v = sosfilt(butter(2, 85, 'hp', fs=SR, output='sos'), v)
    v = v + 0.25*sosfilt(butter(2, 350, 'lp', fs=SR, output='sos'), v)
    v = sosfilt(butter(2, 7500, 'lp', fs=SR, output='sos'), v)
    v = v/np.abs(v).max()
    env = np.sqrt(np.convolve(v**2, np.ones(240)/240, 'same'))+1e-6
    v = v*np.where(env > 0.25, (0.25+(env-0.25)/3)/env, 1.0)
    n = int(0.35*SR); t = np.arange(n)/SR; ir = rng.standard_normal(n)*np.exp(-t*22); ir[0] = 1
    wet = fftconvolve(v, ir)[:len(v)]
    v = 0.9*v+0.12*wet/np.abs(wet).max(); v /= np.abs(v).max()
    sf.write(path, v, SR)
    return len(v)/SR

def build(rid):
    sp = SPECS[rid]
    lines = [sp['hookVo']]+[s['vo'] for s in sp['scenes']]
    vd = []
    for i, l in enumerate(lines):
        p = f'vo/{rid}_{i}.wav'
        vd.append(voice(l, p, int(rid)*10+i))
    outro_len = sf.info('vo_outro.wav').duration
    nwords = len(sp['hook'].replace('*', '').split())
    durs = [max(3.8, vd[0]+1.0, 0.3+nwords*0.22+1.6)]+[max(5.2, d+1.1) for d in vd[1:]]+[6.0]
    durs = [round(d, 2) for d in durs]
    json.dump({'durs': durs, 'vo': vd}, open(f'{OUT}/{rid}_timing.json', 'w'))
    subprocess.run(['node', 'render_reel.js', rid, json.dumps(durs)], check=True)
    mix(rid, sp, durs, outro_len)
    final = f'{OUT}/MQ_{rid}.mp4'
    subprocess.run(['ffmpeg', '-y', '-loglevel', 'error', '-i', f'{OUT}/{rid}_video.mp4', '-i', f'{OUT}/{rid}_mix.wav', '-map', '0:v', '-map', '1:a',
                    '-c:v', 'copy', '-c:a', 'aac', '-b:a', '192k', '-af', 'loudnorm=I=-14:TP=-1.5:LRA=11', '-shortest', final], check=True)
    cov = min(durs[0]-0.4, 0.3+nwords*0.22+1.4)
    subprocess.run(['ffmpeg', '-y', '-loglevel', 'error', '-ss', str(cov), '-i', final, '-frames:v', '1', '-q:v', '3', f'{OUT}/MQ_{rid}_cover.jpg'], check=True)
    for i in range(len(durs)):
        try: os.remove(f'{OUT}/{rid}_sc{i}.mp4')
        except FileNotFoundError: pass
    return final

# ---------------- sound ----------------
MSR = 44100
def mix(rid, sp, durs, outro_len):
    rng = np.random.default_rng(int(rid))
    D = sum(durs); N = int(MSR*D); starts = list(np.cumsum([0]+durs[:-1]))
    tt = lambda d: np.arange(int(d*MSR))/MSR
    def place(buf, sig, t, g=1.0):
        s = max(0, int(t*MSR)); e = min(len(buf), s+len(sig))
        if s < len(buf): buf[s:e] += sig[:e-s]*g
    bp = lambda x, lo, hi: sosfilt(butter(2, [lo, hi], 'bp', fs=MSR, output='sos'), x)
    lpf = lambda x, f: sosfilt(butter(2, f, 'lp', fs=MSR, output='sos'), x)
    def reverb(x, sec=2.2, m=0.3):
        n = int(sec*MSR); t = np.arange(n)/MSR; ir = lpf(rng.standard_normal(n), 6000)*np.exp(-t*3.2/sec*2)
        ir /= np.sqrt((ir**2).sum()); w = fftconvolve(x, ir)[:len(x)]
        return x+m*w*np.abs(x).max()/max(np.abs(w).max(), 1e-9)
    # music: felt piano + pad, key varies per reel
    mus = np.zeros(N); shift = [0, 2, -3, 5, -2, 3][int(rid) % 6]
    def piano(f, t, dur=3.0, amp=0.1):
        x = tt(dur); env = np.exp(-x*1.6)*(1-np.exp(-x*120))
        s = sum(np.sin(2*np.pi*f*h*(1+0.0004*h*h)*x)*np.exp(-x*(1+h*0.9))/h**1.3 for h in range(1, 7))
        place(mus, lpf(s*env, 2200)*amp, t)
    hz = lambda m: 440*2**((m+shift-69)/12)
    progs = [[[57,60,64,69],[53,57,60,65],[48,52,55,60],[55,59,62,67]],
             [[50,53,57,62],[46,50,53,58],[48,52,55,60],[45,48,52,57]],
             [[52,55,59,64],[48,52,55,60],[43,47,50,55],[50,54,57,62]]]
    prog = progs[int(rid) % 3]
    c = 0
    while c*3.2 < D-3.6:
        t0 = c*3.2; ch = prog[c % 4]
        for j, m in enumerate([ch[0]+12, ch[2]+12, ch[1]+12, ch[3]+12]):
            piano(hz(m), t0+j*0.8+rng.uniform(0, 0.03), amp=0.08*rng.uniform(0.8, 1.0))
        x = tt(3.4); pad = sum(np.sin(2*np.pi*hz(m)*(1+d)*x) for m in ch[:3] for d in (-0.003, 0.003))
        pad *= np.minimum(1, x/0.8)*np.minimum(1, (3.4-x)/0.8); place(mus, lpf(pad, 900)*0.025, t0); c += 1
    for m in [prog[0][0]-12, prog[0][0], prog[0][2], prog[0][3]]: piano(hz(m), D-3.6, 3.6, 0.07)
    mus = reverb(mus, 2.8, 0.45); mus /= np.abs(mus).max()
    # voice
    vo = np.zeros(N); act = np.zeros(N)
    files = [f'vo/{rid}_{i}.wav' for i in range(len(durs)-1)]+['vo_outro.wav']
    for i, f in enumerate(files):
        a, r = sf.read(f); a = np.interp(np.arange(int(len(a)*MSR/r))*r/MSR, np.arange(len(a)), a)
        st = starts[i]+(0.15 if i < len(files)-1 else 0.3); place(vo, a, st); s = int(st*MSR); act[s:s+len(a)] = 1
    vo /= np.abs(vo).max()
    duck = np.convolve(act, np.ones(int(0.5*MSR))/int(0.5*MSR), 'same'); mus *= 1-0.6*duck
    # effects
    fx = np.zeros(N)
    def whoosh(t, d=0.9, g=0.22):
        x = tt(d); n = rng.standard_normal(len(x)); env = np.sin(np.pi*x/d)**3
        place(fx, (bp(n, 300, 1500)*(1-x/d)+bp(n, 800, 3500)*(x/d))*env*g, t-d*0.55)
    def thump(t, g=0.5):
        x = tt(0.5); place(fx, (lpf(rng.standard_normal(len(x)), 180)*np.exp(-x*9)*6+np.sin(2*np.pi*52*x)*np.exp(-x*7)*0.6)*g, t)
    for s0 in starts[1:]: whoosh(s0)
    x = tt(2.0); place(fx, lpf(rng.standard_normal(len(x)), 90)*np.exp(-x*1.8)*np.minimum(1, x/0.05)*5, 0.0, 0.35)
    words = sp['hook'].split(); hi = next((i for i, w in enumerate(words) if '*' in w), len(words)-1)
    thump(0.3+hi*0.22+0.12, 0.45)
    for i, sc in enumerate(sp['scenes']):
        s0 = starts[i+1]; L = durs[i+1]; k = sc['panel']['k']; o = sc['panel']
        if sc['t'] == 'num': thump(s0+1.6, 0.25)
        if k == 'sea':
            x = tt(L); amb = lpf(rng.standard_normal(len(x)), 220)*(0.7+0.3*np.sin(2*np.pi*0.3*x))*np.minimum(1, np.minimum(x, L-x)/0.8)*3
            place(fx, amb, s0, 0.22)
        elif k in ('planet', 'sun', 'stars', 'neutron'):
            x = tt(L); f0 = 55*2**(shift/12); dr = (np.sin(2*np.pi*f0*x)+0.5*np.sin(2*np.pi*f0*1.5*x)+0.3*np.sin(2*np.pi*f0*2.01*x))*np.minimum(1, np.minimum(x, L-x)/1.0)
            place(fx, lpf(dr, 400)*0.12, s0)
            x = tt(L); sh = bp(rng.standard_normal(len(x)), 4000, 9000)*(0.5+0.5*np.sin(2*np.pi*0.2*x))*np.minimum(1, np.minimum(x, L-x)/1.0); place(fx, sh, s0, 0.015)
        elif k == 'land':
            x = tt(L)
            if o.get('s') == 'storm':
                rain = bp(rng.standard_normal(len(x)), 800, 8000)*np.minimum(1, np.minimum(x, L-x)/0.6); place(fx, rain, s0, 0.08)
                for b in np.arange(0, L, 2.2):
                    y = tt(2.0); crack = bp(rng.standard_normal(len(y)), 200, 4000)*np.exp(-y*25)*1.5+lpf(rng.standard_normal(len(y)), 120)*np.exp(-y*2.2)*8
                    place(fx, crack, s0+b, 0.35)
            else:
                wind = bp(rng.standard_normal(len(x)), 150, 900)*(0.5+0.5*np.sin(2*np.pi*0.15*x+1))**2*np.minimum(1, np.minimum(x, L-x)/1.0)
                place(fx, wind, s0, 0.12 if o.get('s') == 'ice' else 0.07)
        elif k == 'body' and o.get('o') == 'heart':
            for b in np.arange(0, L, 0.86):
                place(fx, lpf(rng.standard_normal(int(0.2*MSR)), 90)*np.exp(-tt(0.2)*25)*10, s0+b, 0.35)
                place(fx, lpf(rng.standard_normal(int(0.2*MSR)), 110)*np.exp(-tt(0.2)*30)*8, s0+b+0.2, 0.25)
        elif k == 'obj' and o.get('o') == 'clock':
            for b in np.arange(0, L, 0.5):
                y = tt(0.03); place(fx, bp(rng.standard_normal(len(y)), 2000, 6000)*np.exp(-y*200), s0+b, 0.25)
        elif k == 'obj' and o.get('o') == 'cubes':
            for j in range(7): thump(s0+j*0.25+0.5, 0.18)
        elif k == 'obj' and o.get('o') == 'phone':
            for b in np.arange(0, L, 2.0):
                y = tt(0.9); bell = (np.sin(2*np.pi*1200*y)+np.sin(2*np.pi*1500*y))*(np.sin(2*np.pi*25*y) > 0)*np.exp(-y*1.5)
                place(fx, bell, s0+b, 0.03)
        if sc['t'] == 'big':
            x = tt(0.4); place(fx, bp(rng.standard_normal(len(x)), 1500, 6000)*np.exp(-x*12), s0+0.35, 0.05)
    so = starts[-1]; TAP = so+2.45
    x = tt(3.0); bell = sum(np.sin(2*np.pi*f*x)*np.exp(-x*d)*a for f, a, d in [(784, 1, 1.6), (1568, 0.35, 2.4), (2350, 0.15, 3.5)])
    place(fx, bell*np.minimum(1, x/0.005), so+0.15, 0.10)
    x = tt(0.06); place(fx, bp(rng.standard_normal(len(x)), 1500, 6000)*np.exp(-x*120), TAP-0.02, 0.5)
    for f, dt in [(1318.5, 0.0), (1760, 0.11)]:
        x = tt(1.4); place(fx, (np.sin(2*np.pi*f*x)+0.3*np.sin(4*np.pi*f*x)*np.exp(-x*6))*np.exp(-x*3.2)*np.minimum(1, x/0.004), TAP+0.05+dt, 0.09)
    fx = reverb(fx, 1.6, 0.35)
    m = 1.0*vo+0.18*mus+0.36*fx/max(np.abs(fx).max(), 1e-9)
    f = int(1.4*MSR); m[-f:] *= np.linspace(1, 0, f); m /= np.abs(m).max()*1.1
    sf.write(f'{OUT}/{rid}_mix.wav', np.stack([m, m], 1), MSR, subtype='PCM_16')

if __name__ == '__main__':
    for rid in sys.argv[1:]:
        if os.path.exists(f'{OUT}/MQ_{rid}.mp4'): print('skip', rid); continue
        print('built', build(rid), flush=True)
