const clamp=(x,a=0,b=1)=>Math.max(a,Math.min(b,x));
const ease=x=>{x=clamp(x);return 1-Math.pow(1-x,3)};
const inOut=x=>{x=clamp(x);return x<.5?4*x*x*x:1-Math.pow(-2*x+2,3)/2};
const $=id=>document.getElementById(id);
const SP=window.SPEC.spec, DURS=window.SPEC.durs;
function hl(s){return s.replace(/\*([^*]+)\*/g,'<span style="color:#7A1F1F">$1</span>');}
function words(s){ // split into word spans, keep highlight
  const out=[];let red=false;s.split(/(\*)/).forEach(part=>{if(part==='*'){red=!red;return;}part.split(/\s+/).filter(Boolean).forEach(w=>out.push(`<span class="w"${red?' style="color:#7A1F1F"':''}>${w}</span>`));});return out.join(' ');}
$('factno').textContent=SP.id;
// hook
const hlen=SP.hook.replace(/\*/g,'').length;
const hsize=hlen<=26?150:hlen<=42?126:hlen<=62?108:94;
$('ht').style.fontSize=hsize+'px';$('ht').innerHTML=words(SP.hook);$('hsub').textContent=SP.hookSub;
// timeline
const T=[];let acc=0;DURS.forEach(d=>{T.push([acc,acc+d]);acc+=d;});window.DURATION=acc;window.TIMES=T;
// content scenes
const SC=[];const host=$('scenes');
SP.scenes.forEach((s,i)=>{const id='c'+i;const pfx='p'+i+'_';const P=PANELS[s.panel.k](pfx,s.panel);
  let html='';
  if(s.t==='num'){
    const maxStr=fmt(s,s.num);const fs=Math.min(230,Math.floor(880/(maxStr.length*0.6)));
    html=`<div id="${id}" class="abs center" style="top:370px">
      <div class="cap" id="${id}cap">${s.cap}</div>
      <div class="big" style="font-size:${fs}px;line-height:1;margin-top:10px;height:${Math.max(fs,150)}px;display:flex;align-items:center;justify-content:center"><span id="${id}n">0</span></div>
      <div class="cap" id="${id}u" style="color:#1E1B16;letter-spacing:10px;font-size:38px;margin-top:22px">${s.unit}</div>
      <svg id="${id}svg" class="abs" style="left:90px;top:${Math.max(fs,150)+150}px" width="900" height="560" viewBox="0 0 900 560" aria-hidden="true">${P.svg}</svg>
      <div class="ital abs center" id="${id}sub" style="top:${Math.max(fs,150)+735}px;font-size:48px;padding:0 110px">${s.sub}</div></div>`;
  } else {
    const L=s.big.replace(/\*/g,'').length;const bs=L<=24?112:L<=40?98:84;
    html=`<div id="${id}" class="abs center" style="top:370px;padding:0 80px">
      <div class="big" id="${id}b" style="font-size:${bs}px">${hl(s.big)}</div>
      <div class="ital" id="${id}i" style="font-size:50px;margin-top:22px">${s.ital}</div></div>
      <svg id="${id}svg" class="abs" style="left:90px;top:880px;opacity:0" width="900" height="560" viewBox="0 0 900 560" aria-hidden="true">${P.svg}</svg>`;
  }
  host.insertAdjacentHTML('beforeend',html);SC.push({s,id,P});
});
function fmt(s,v){if(s.year)return String(Math.round(v));const d=s.dec||0;let str=d?v.toFixed(d):Math.round(v).toLocaleString('en-US');return (s.prefix||'')+str+(s.suffix||'');}
function alpha(i,t,last){const[a,b]=T[i];if(t<a||t>b)return 0;return Math.min(ease((t-a)/0.45),last?1:ease((b-t)/0.45));}
function rise(el,p,dy=40){el.style.opacity=ease(p);el.style.transform=`translateY(${(1-ease(p))*dy}px)`;}
$('burst').innerHTML=Array.from({length:8},()=>'<svg class="bs abs" width="28" height="28" viewBox="0 0 28 28" style="left:0;top:0" aria-hidden="true"><polygon points="14,0 17.5,10.5 28,14 17.5,17.5 14,28 10.5,17.5 0,14 10.5,10.5" fill="#B8893A"/></svg>').join('');

function render(t){
  const nS=DURS.length;
  // hook
  let a=alpha(0,t);$('hook').style.opacity=a;$('hook').style.visibility=a>0?'visible':'hidden';
  const l0=t;rise($('hcap'),l0/0.5);
  [...document.querySelectorAll('#ht .w')].forEach((w,i)=>{const p=(l0-0.3-i*0.22)/0.4;w.style.opacity=ease(p);w.style.transform=`translateY(${(1-ease(p))*50}px) scale(${1+(1-ease(p))*0.15})`;});
  const nw=document.querySelectorAll('#ht .w').length;rise($('hsub'),(l0-0.5-nw*0.22)/0.6);
  // content
  SC.forEach((c,i)=>{const k=i+1;const el=$(c.id),svg=$(c.id+'svg');const al=alpha(k,t);
    el.style.opacity=al;el.style.visibility=al>0?'visible':'hidden';if(c.s.t!=='num'){svg.style.visibility=al>0?'visible':'hidden';}
    if(al<=0)return;const l=t-T[k][0];
    if(c.s.t==='num'){const s=c.s;const from=s.year?Math.max(0,s.num-120):0;const v=from+(s.num-from)*inOut(l/1.6);$(c.id+'n').textContent=fmt(s,v);rise($(c.id+'sub'),(l-1.4)/0.6);rise($(c.id+'u'),(l-0.2)/0.5,20);}
    else{rise($(c.id+'b'),l/0.6);rise($(c.id+'i'),(l-0.5)/0.6);svg.style.opacity=al*ease((l-0.3)/0.6);svg.style.transform=`translateY(${(1-ease((l-0.3)/0.6))*40}px)`;}
    c.P.update(svg,l);
  });
  // outro
  const oi=nS-1;a=alpha(oi,t,true);$('outro').style.opacity=a;$('outro').style.visibility=a>0?'visible':'hidden';
  const l6=t-T[oi][0];
  $('emb').style.transform=`scale(${0.8+0.2*ease(l6/0.8)}) rotate(${(1-ease(l6/0.8))*-12}deg)`;
  const fw=$('fwrap'); fw.style.opacity=ease((l6-0.9)/0.5); fw.style.transform=`translateY(${(1-ease((l6-0.9)/0.5))*40}px)`;
  const TAP=2.45, pin=ease((l6-1.5)/0.75), pout=ease((l6-3.4)/0.6);
  let hs=1; if(l6>TAP-0.15&&l6<TAP+0.2){hs=1-0.14*Math.sin(Math.PI*(l6-(TAP-0.15))/0.35);}
  const h=$('hand'); h.style.opacity=l6<1.5?0:1-pout;
  h.style.transform=`translate(${(1-pin)*420}px,${(1-pin)*520+pout*560}px) rotate(${(1-pin)*-18}deg) scale(${hs})`;
  const done=l6>=TAP, b=$('fbtn');
  b.style.background=done?'#F1E7D0':'#7A1F1F'; b.style.color=done?'#1E1B16':'#F1E7D0';
  $('ftext').textContent=done?'Following':'Follow'; $('fcheck').style.display=done?'block':'none';
  const bt=l6-TAP; b.style.transform=done?`scale(${1+0.09*Math.exp(-bt*6)*Math.sin(bt*18)})`:(l6>TAP-0.15?'scale(0.96)':'scale(1)');
  const rp=clamp((l6-TAP)/0.6); $('rip').setAttribute('r',rp*320); $('rip').style.opacity=rp>0&&rp<1?1-rp:0;
  [...document.querySelectorAll('#burst .bs')].forEach((e,i)=>{const an=i/8*Math.PI*2;const qq=clamp((l6-TAP)/0.7);const d=150+qq*170;e.style.opacity=qq>0&&qq<1?1-qq:0;e.style.transform=`translate(${Math.cos(an)*d*1.5-14}px,${Math.sin(an)*d*0.7-14}px) scale(${0.6+qq*0.6}) rotate(${qq*90}deg)`;});
}
window.render=render;render(0);
