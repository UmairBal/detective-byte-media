import numpy as np, soundfile as sf
from scipy.signal import butter, sosfilt, fftconvolve
sr=44100; D=37.4; N=int(sr*D); rng=np.random.default_rng(5)
starts=[0,4.4,11.2,17.9,24.8,31.4]; TAP=31.4+2.45
tt=lambda d:np.arange(int(d*sr))/sr
def place(buf,sig,t,g=1.0):
    s=max(0,int(t*sr)); e=min(len(buf),s+len(sig))
    if s<len(buf): buf[s:e]+=sig[:e-s]*g
bp=lambda x,lo,hi:sosfilt(butter(2,[lo,hi],'bp',fs=sr,output='sos'),x)
lpf=lambda x,f:sosfilt(butter(2,f,'lp',fs=sr,output='sos'),x)
def reverb(x,sec=2.2,mix=0.3):
    n=int(sec*sr); t=np.arange(n)/sr; ir=lpf(rng.standard_normal(n),6000)*np.exp(-t*3.2/sec*2)
    ir/=np.sqrt((ir**2).sum()); w=fftconvolve(x,ir)[:len(x)]; return x+mix*w*np.abs(x).max()/max(np.abs(w).max(),1e-9)
mus=np.zeros(N)
def piano(f,t,dur=3.0,amp=0.1):
    x=tt(dur); env=np.exp(-x*1.6)*(1-np.exp(-x*120))
    s=sum(np.sin(2*np.pi*f*h*(1+0.0004*h*h)*x)*np.exp(-x*(1+h*0.9))/h**1.3 for h in range(1,7))
    place(mus,lpf(s*env,2200)*amp,t)
hz=lambda m:440*2**((m-69)/12)
prog=[[57,60,64,69],[53,57,60,65],[48,52,55,60],[55,59,62,67]]
for c in range(int(D//3.2)+1):
    t0=c*3.2; ch=prog[c%4]
    if t0>D-3.6: break
    for j,m in enumerate([ch[0]+12,ch[2]+12,ch[1]+12,ch[3]+12]):
        piano(hz(m),t0+j*0.8+rng.uniform(0,0.03),amp=0.08*rng.uniform(0.8,1.0))
    x=tt(3.4); pad=sum(np.sin(2*np.pi*hz(m)*(1+d)*x) for m in ch[:3] for d in (-0.003,0.003))
    pad*=np.minimum(1,x/0.8)*np.minimum(1,(3.4-x)/0.8); place(mus,lpf(pad,900)*0.025,t0)
for m in [45,57,64,69]: piano(hz(m),D-3.6,3.6,0.07)
mus=reverb(mus,2.8,0.45); mus/=np.abs(mus).max()
vo=np.zeros(N); act=np.zeros(N)
for i,s0 in enumerate(starts):
    a,r=sf.read(f'vo{i}.wav'); a=np.interp(np.arange(int(len(a)*sr/r))*r/sr,np.arange(len(a)),a)
    place(vo,a,s0+0.3); st=int((s0+0.3)*sr); act[st:st+len(a)]=1
vo/=np.abs(vo).max()
duck=np.convolve(act,np.ones(int(0.5*sr))/int(0.5*sr),'same'); mus*=1-0.6*duck
fx=np.zeros(N)
def whoosh(t,d=0.9,g=0.22):
    x=tt(d); n=rng.standard_normal(len(x)); env=np.sin(np.pi*x/d)**3
    s=bp(n,300,1500)*(1-x/d)+bp(n,800,3500)*(x/d); place(fx,s*env*g,t-d*0.55)
def thump(t,g=0.5):
    x=tt(0.5); s=lpf(rng.standard_normal(len(x)),180)*np.exp(-x*9)*6+np.sin(2*np.pi*52*x)*np.exp(-x*7)*0.6; place(fx,s*g,t)
def stamp(t,g=0.45):
    x=tt(0.25); s=bp(rng.standard_normal(len(x)),200,1800)*np.exp(-x*35)*1.2+lpf(rng.standard_normal(len(x)),150)*np.exp(-x*20)*4; place(fx,s*g,t)
for s0 in starts[1:]: whoosh(s0)
x=tt(2.0); place(fx,lpf(rng.standard_normal(len(x)),90)*np.exp(-x*1.8)*np.minimum(1,x/0.05)*5,0.0,0.35)
thump(0.35+4*0.28+0.08,0.45)
x=tt(6.8); amb=lpf(rng.standard_normal(len(x)),220)*(0.7+0.3*np.sin(2*np.pi*0.3*x))*np.minimum(1,np.minimum(x,6.8-x)/0.8)*3; place(fx,amb,starts[1],0.22)
x=tt(2.2); strokes=np.zeros(len(x))
for st in np.arange(0,2.0,0.22):
    L=int(rng.uniform(0.12,0.2)*sr); s=int(st*sr); strokes[s:s+L]+=np.hanning(L)[:len(strokes[s:s+L])]
place(fx,bp(rng.standard_normal(len(x)),2500,6000)*strokes,starts[2]+0.3,0.09)
x=tt(6.9); wv=bp(rng.standard_normal(len(x)),200,2000)*(0.4+0.6*np.sin(2*np.pi*0.22*x)**2)*np.minimum(1,np.minimum(x,6.9-x)/1.0); place(fx,wv,starts[3],0.12)
for i in range(5): stamp(starts[4]+1.0+i*0.75+0.03)
x=tt(3.0); bell=sum(np.sin(2*np.pi*f*x)*np.exp(-x*d)*a for f,a,d in [(784,1,1.6),(1568,0.35,2.4),(2350,0.15,3.5),(1976,0.1,3)])
place(fx,bell*np.minimum(1,x/0.005),starts[5]+0.15,0.10)
# finger tap: soft click
x=tt(0.06); click=bp(rng.standard_normal(len(x)),1500,6000)*np.exp(-x*120); place(fx,click,TAP-0.02,0.5)
x=tt(0.12); place(fx,lpf(rng.standard_normal(len(x)),400)*np.exp(-x*60)*3,TAP-0.02,0.35)
# followed: two-note sparkle
for k,(f,dt) in enumerate([(1318.5,0.0),(1760,0.11)]):
    x=tt(1.4); s=(np.sin(2*np.pi*f*x)+0.3*np.sin(2*np.pi*2*f*x)*np.exp(-x*6))*np.exp(-x*3.2)*np.minimum(1,x/0.004); place(fx,s,TAP+0.05+dt,0.09)
x=tt(0.7); sh=bp(rng.standard_normal(len(x)),5000,11000)*np.exp(-x*5)*np.minimum(1,x/0.02); place(fx,sh,TAP+0.05,0.05)
fx=reverb(fx,1.6,0.35)
mix=1.0*vo+0.18*mus+0.36*fx/np.abs(fx).max()
f=int(1.4*sr); mix[-f:]*=np.linspace(1,0,f)
mix/=np.abs(mix).max()*1.1
sf.write('mix.wav',np.stack([mix,mix],1),sr,subtype='PCM_16')
