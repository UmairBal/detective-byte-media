// ===== sea + land panels =====
const BODY="M120 100 C 200 80, 260 62, 340 60 C 430 58, 510 70, 560 92 C 580 100, 592 106, 594 112 C 590 120, 572 126, 540 134 C 480 150, 400 162, 330 158 C 260 154, 200 140, 150 124 C 136 120, 126 118, 120 116 Z";
function sharkSVG(p,dark){const B=dark?'url(#gBodyDark)':'url(#gBody)';return `
<g id="${p}">
 <clipPath id="${p}c"><path d="${BODY}"/></clipPath>
 <g id="${p}T"><path d="M 132 99 C 100 80, 62 46, 20 16 C 38 50, 58 84, 82 106 C 62 128, 50 150, 44 178 C 74 152, 104 130, 134 118 Z" fill="url(#gFin)" stroke="#232D31" stroke-width="1.6" stroke-linejoin="round"/></g>
 <path d="M 168 96 C 172 88, 176 82, 180 78 C 182 86, 186 92, 194 96 Z" fill="url(#gFin)" stroke="#232D31" stroke-width="1.4"/>
 <path d="M 178 130 C 172 138, 166 146, 162 152 C 172 148, 182 142, 196 136 Z" fill="url(#gFin)" stroke="#232D31" stroke-width="1.4"/>
 <path d="M 236 146 C 226 156, 216 166, 208 172 C 224 168, 240 160, 258 152 Z" fill="url(#gFin)" stroke="#232D31" stroke-width="1.4"/>
 <path d="${BODY}" fill="${B}"/>
 <g clip-path="url(#${p}c)">
  <path d="M 600 114 C 570 116, 548 113, 520 118 C 492 123, 470 118, 440 124 C 410 130, 380 124, 350 130 C 310 137, 280 128, 245 133 C 210 137, 180 126, 150 123 C 138 122, 128 120, 110 118 L 110 200 L 600 200 Z" fill="${dark?'#7B8486':'url(#gBelly)'}"/>
  <path d="M 140 98 C 220 76, 300 64, 380 64 C 450 64, 520 74, 570 98" fill="none" stroke="#FFFFFF" stroke-width="5" opacity=".14"/>
 </g>
 <path d="${BODY}" fill="none" stroke="#232D31" stroke-width="1.8" stroke-linejoin="round"/>
 <path d="M 296 64 C 316 38, 330 16, 344 4 C 344 26, 352 46, 388 61 C 360 58, 326 59, 296 64 Z" fill="url(#gFin)" stroke="#232D31" stroke-width="1.6" stroke-linejoin="round"/>
 <g fill="none" stroke="#2F3B40" stroke-width="2" stroke-linecap="round"><path d="M 452 90 q 7 18 2 38"/><path d="M 464 89 q 7 18 2 38"/><path d="M 476 88 q 7 18 2 37"/><path d="M 488 88 q 6 17 2 35"/><path d="M 499 88 q 6 16 2 32"/></g>
 <path d="M 446 132 C 420 160, 392 186, 356 210 C 384 200, 420 178, 468 140 Z" fill="url(#gPec)" stroke="#232D31" stroke-width="1.6" stroke-linejoin="round"/>
 <path d="M 520 132 C 545 128, 566 124, 584 118" fill="none" stroke="#2B2B2B" stroke-width="2.2" stroke-linecap="round"/>
 ${dark?'':'<g stroke="#FFFFFF" stroke-width="1.6" opacity=".8"><path d="M 532 131 l 2 4"/><path d="M 544 129 l 2 4"/><path d="M 556 127 l 2 4"/><path d="M 568 124 l 2 4"/></g>'}
 <circle cx="534" cy="99" r="6" fill="#0E1214"/><circle cx="536" cy="97" r="1.8" fill="#FFFFFF" opacity=".9"/>
</g>`;}
function seaBase(p,r,deep){
  let s=`<rect width="${PW}" height="${PH}" fill="url(#${deep?'gDeep':'gWater'})"/>`;
  if(!deep){s+=`<g id="${p}rays">`;for(let i=0;i<5;i++){const x=80+i*185;s+=`<polygon data-x="${x}" points="${x-20},0 ${x+20},0 ${x+90},560 ${x-60},560" fill="url(#gRay)"/>`;}s+=`</g><g id="${p}caus" fill="none" stroke="#FFFFFF" stroke-width="2" opacity=".16"></g>`;}
  return s;
}
function seaFloor(p,r,weeds=9){let s=`<path d="M0 470 C 120 450, 220 486, 340 468 C 470 448, 560 482, 700 462 C 790 450, 850 470, 900 462 L 900 560 L 0 560 Z" fill="url(#gSand)"/>
 <g fill="#3F3D30" stroke="#2A291F" stroke-width="2"><path d="M80 500 C 90 470, 140 466, 160 490 C 150 510, 100 512, 80 500 Z"/><path d="M640 492 C 660 462, 720 460, 740 486 C 730 504, 670 508, 640 492 Z"/></g>`;
 for(let i=0;i<weeds;i++){const x=30+r()*840,h=60+r()*90;s+=`<path class="wd" data-x="${x}" data-b="500" data-h="${h}" data-p="${r()*6}" fill="none" stroke="${r()<.5?'#3C5A36':'#4E6E3E'}" stroke-width="${6+r()*5}" stroke-linecap="round"/>`;}return s;}
function particles(r,n,top=0,col='#E8F2EE'){let s='';for(let i=0;i<n;i++)s+=`<circle class="pt" data-x="${r()*PW}" data-y="${top+r()*(PH-top)}" data-s="${0.3+r()*0.9}" r="${1+r()*2.4}" fill="${col}" opacity="${0.2+r()*0.4}"/>`;return s;}
function seaAnim(root,p,t,top=0){
  q(root,'.pt').forEach(c=>{const s=+c.dataset.s;const span=PH-top;let yy=+c.dataset.y-t*14*s;yy=top+((yy-top)%span+span)%span;c.setAttribute('cx',+c.dataset.x+Math.sin(t*0.8*s+ +c.dataset.x)*6);c.setAttribute('cy',yy);});
  const rays=root.querySelector(`#${p}rays`);if(rays)[...rays.children].forEach((e,i)=>{e.setAttribute('transform',`rotate(${Math.sin(t*0.5+i*1.3)*3} ${e.dataset.x} 0)`);e.style.opacity=0.6+0.4*Math.sin(t*0.9+i*2);});
  const ca=root.querySelector(`#${p}caus`);if(ca){let c='';for(let k=0;k<4;k++){let d=`M0 ${30+k*26}`;for(let x=0;x<=900;x+=30)d+=` L${x} ${30+k*26+Math.sin(x*0.02+t*1.5+k)*6}`;c+=`<path d="${d}"/>`;}ca.innerHTML=c;}
  q(root,'.wd').forEach(e=>{const x=+e.dataset.x,b=+e.dataset.b,h=+e.dataset.h,sw=Math.sin(t*1.6+ +e.dataset.p)*14;e.setAttribute('d',`M${x} ${b} Q ${x+14+sw*0.4} ${b-h*0.25} ${x+sw*0.7} ${b-h*0.5} T ${x+sw*1.6} ${b-h}`);});
  q(root,'.fs').forEach(e=>{const x=((+e.dataset.x+t*(+e.dataset.v))%1000)-50;e.setAttribute('transform',`translate(${x} ${+e.dataset.y+Math.sin(t*2+x*0.02)*3}) scale(${e.dataset.k||1.2})`);});
}
function fishes(r,n,col='#17303A',op=.35,y0=110,yr=200,k=1.2){let s='';for(let i=0;i<n;i++)s+=`<path class="fs" data-k="${k}" data-x="${r()*900}" data-y="${y0+r()*yr}" data-v="${18+r()*14}" d="M0 0 C 8 -6, 18 -6, 24 0 C 18 6, 8 6, 0 0 Z M0 0 L -8 -6 L -8 6 Z" fill="${col}" opacity="${op}"/>`;return s;}

function P_sea(p,o){
  const r=rnd(p.length*31+o.c.length*7);const deep=o.c==='deep';let inner=seaBase(p,r,deep);
  if(deep){inner+=particles(r,60,0,'#DDE8E4');for(let i=0;i<18;i++)inner+=`<circle class="bio" data-ph="${r()*6}" cx="${r()*900}" cy="${r()*560}" r="${2+r()*3}" fill="#9FF0E0" filter="url(#fGlow)"/>`;
    if(o.shark)inner+=`<g id="${p}sh">${sharkSVG(p+'s',true)}</g>`;
    else inner+=`<path d="M0 500 L120 430 L200 470 L300 400 L380 480 L520 440 L640 500 L760 420 L900 470 L900 560 L0 560 Z" fill="#081218"/><g id="${p}sub"><polygon points="0,0 380,-120 380,120" fill="url(#gSubBeam)"/><ellipse cx="-10" cy="0" rx="52" ry="30" fill="#D9A23A" stroke="#3A2A10" stroke-width="3"/><circle cx="18" cy="-4" r="13" fill="#9FD8E8" stroke="#3A2A10" stroke-width="3"/><rect x="-40" y="-44" width="30" height="18" rx="4" fill="#C98E2E" stroke="#3A2A10" stroke-width="2"/><line x1="-62" y1="0" x2="-78" y2="-10" stroke="#3A2A10" stroke-width="4"/><circle cx="40" cy="6" r="5" fill="#FFF6C8"/></g>`;
  } else if(o.c==='reef'){inner+=fishes(r,8)+`<path d="M0 430 C 150 410, 300 440, 450 420 C 600 400, 750 440, 900 420 L 900 560 L 0 560 Z" fill="url(#gSand)"/>`;
    const cols=['#C7674E','#D9925B','#B85C7A','#8E6BA8','#D8B25A','#5E9A8A'];
    for(let i=0;i<9;i++){const x=40+i*100+r()*30,y=470+r()*30,c=cols[i%cols.length];
      if(i%3===0){let b='';const br=(x0,y0,a,l,d)=>{if(d>3)return;const x1=x0+Math.sin(a)*l,y1=y0-Math.cos(a)*l;b+=`<path d="M${x0} ${y0} L${x1} ${y1}" stroke="${c}" stroke-width="${10-d*2}" stroke-linecap="round"/>`;br(x1,y1,a-0.45,l*0.75,d+1);br(x1,y1,a+0.4,l*0.7,d+1);};br(x,y,0,60,0);inner+=`<g class="sway" data-ph="${r()*6}" data-x="${x}" data-y="${y}">${b}</g>`;}
      else if(i%3===1){inner+=`<ellipse cx="${x}" cy="${y-20}" rx="46" ry="34" fill="${c}" stroke="#3A2A20" stroke-width="2"/>`;for(let k=0;k<5;k++)inner+=`<path d="M${x-36} ${y-36+k*8} q 12 -8 24 0 t 24 0 t 24 0" fill="none" stroke="#3A2A20" stroke-width="1.6" opacity=".5"/>`;}
      else{let f='';for(let k=0;k<11;k++){const a=-1.1+k*0.22;f+=`<line x1="${x}" y1="${y}" x2="${x+Math.sin(a)*90}" y2="${y-Math.cos(a)*90}" stroke="${c}" stroke-width="3"/>`;}inner+=`<g class="sway" data-ph="${r()*6}" data-x="${x}" data-y="${y}" opacity=".9">${f}<path d="M${x-80} ${y-40} Q ${x} ${y-120} ${x+80} ${y-40}" fill="none" stroke="${c}" stroke-width="4"/></g>`;}}
    for(let i=0;i<12;i++){const c=['#E3A23B','#D45F3C','#4E9AB8','#E8D25A'][i%4];inner+=`<path class="fs" data-k="1.6" data-x="${r()*900}" data-y="${180+r()*200}" data-v="${30+r()*20}" d="M0 0 C 8 -7, 18 -7, 24 0 C 18 7, 8 7, 0 0 Z M0 0 L -9 -7 L -9 7 Z" fill="${c}" stroke="#2A2A2A" stroke-width=".8"/>`;}
    inner+=particles(r,30);
  } else {
    inner+=fishes(r,o.c==='whale'?4:9)+seaFloor(p,r,o.c==='jelly'?4:9);
    if(o.c==='shark')inner+=`<g id="${p}sh">${sharkSVG(p+'s')}</g>`;
    if(o.c==='octopus')inner+=`<g id="${p}oc"><g id="${p}arms" stroke-linecap="round" fill="none"></g>
      <path d="M -70 -40 C -80 -130, 80 -130, 70 -40 C 64 0, 40 20, 0 22 C -40 20, -64 0, -70 -40 Z" fill="url(#gOcto)" stroke="#4A1E16" stroke-width="2.5"/>
      <g fill="#7A2E22" opacity=".55"><circle cx="-30" cy="-80" r="7"/><circle cx="18" cy="-96" r="5"/><circle cx="34" cy="-60" r="8"/><circle cx="-10" cy="-50" r="5"/></g>
      <path d="M -50 -88 C -40 -110, 20 -112, 40 -96" fill="none" stroke="#F2C2A8" stroke-width="5" opacity=".35"/>
      <ellipse cx="-30" cy="-14" rx="14" ry="11" fill="#F2E3C4" stroke="#4A1E16" stroke-width="2"/><rect x="-38" y="-16" width="16" height="5" rx="2" fill="#1A1210"/>
      <ellipse cx="30" cy="-14" rx="14" ry="11" fill="#F2E3C4" stroke="#4A1E16" stroke-width="2"/><rect x="22" y="-16" width="16" height="5" rx="2" fill="#1A1210"/></g>`;
    if(o.c==='whale')inner+=`<g id="${p}wh"><g id="${p}fluke"><path d="M 40 150 C 10 120, -30 100, -70 96 C -50 120, -40 140, -20 152 C -40 166, -50 186, -70 208 C -30 202, 10 184, 40 156 Z" fill="#4D6573" stroke="#22323A" stroke-width="2"/></g>
      <path d="M 30 150 C 120 110, 300 96, 520 104 C 640 108, 720 122, 760 146 C 740 168, 660 186, 520 190 C 320 196, 140 184, 30 158 Z" fill="url(#gWhale)" stroke="#22323A" stroke-width="2.4"/>
      <g stroke="#D6DEE0" stroke-width="1.6" opacity=".7" fill="none"><path d="M560 172 C 620 174, 690 168, 740 154"/><path d="M560 180 C 620 182, 680 176, 735 160"/><path d="M560 164 C 620 166, 690 160, 745 148"/></g>
      <path d="M 480 176 C 470 200, 430 230, 390 244 C 420 222, 444 200, 452 178 Z" fill="#5A7280" stroke="#22323A" stroke-width="2"/>
      <path d="M 300 104 C 306 94, 314 88, 324 86 C 322 96, 324 102, 330 106 Z" fill="#4D6573"/>
      <circle cx="680" cy="150" r="4" fill="#0E1416"/><g fill="#BCC8CC" opacity=".5"><circle cx="260" cy="130" r="5"/><circle cx="380" cy="122" r="4"/><circle cx="200" cy="146" r="4"/><circle cx="450" cy="128" r="6"/></g></g>`;
    if(o.c==='jelly'){for(let j=0;j<3;j++){const big=j===0;inner+=`<g class="jl" data-j="${j}" data-x="${big?450:(j===1?180:720)}" data-y="${big?220:(j===1?160:300)}" data-k="${big?1:0.45}" opacity="${big?1:0.6}"><g class="jt" fill="none" stroke="#E7C6D8" stroke-width="2.4" opacity=".75"></g>
      <path class="jb" d="M -90 0 C -90 -90, 90 -90, 90 0 C 70 10, 50 -2, 30 8 C 10 -2, -10 -2, -30 8 C -50 -2, -70 10, -90 0 Z" fill="url(#gJelly)" stroke="#C99BB8" stroke-width="2"/>
      <path d="M -40 -30 C -30 -60, 30 -60, 40 -30" fill="none" stroke="#F3D6E6" stroke-width="10" opacity=".6"/><ellipse cx="0" cy="-26" rx="26" ry="14" fill="#E3A4C4" opacity=".7"/></g>`;}}
    inner+=particles(r,36);
  }
  inner+=`<rect width="${PW}" height="${PH}" fill="url(#gVig)"/>`;
  return {svg:wrap(p,inner),update:(root,t)=>{seaAnim(root,p,t);
    q(root,'.bio').forEach(e=>e.style.opacity=0.2+0.8*Math.max(0,Math.sin(t*1.5+ +e.dataset.ph)));
    q(root,'.sway').forEach(e=>e.setAttribute('transform',`rotate(${Math.sin(t*1.2+ +e.dataset.ph)*4} ${e.dataset.x} ${e.dataset.y})`));
    const sb=root.querySelector(`#${p}sub`);if(sb)sb.setAttribute('transform',`translate(${150+t*40} ${250+Math.sin(t*1.1)*14}) rotate(${Math.sin(t*0.8)*6})`);
    const sh=root.querySelector(`#${p}sh`);if(sh){const slow=deep?0.6:1;sh.setAttribute('transform',`translate(${(deep?-380:-600)+((t*slow)/6.8)*1560} ${deep?230:200+Math.sin(t*1.3)*16}) scale(${deep?0.85:0.95})`);root.querySelector(`#${p}sT`).setAttribute('transform',`rotate(${Math.sin(t*(deep?3:6.5))*12} 132 108)`);}
    const oc=root.querySelector(`#${p}oc`);if(oc){const y=250+Math.sin(t*1.2)*18;oc.setAttribute('transform',`translate(450 ${y-40}) scale(${1.25+0.04*Math.sin(t*2.4)} ${1.25-0.04*Math.sin(t*2.4)})`);
      let a='';for(let i=0;i<8;i++){const base=(i-3.5)*16;let x=base,yy=10,ang=(i-3.5)*0.2;const pts=[[x,yy]];for(let s=1;s<=14;s++){ang+=Math.sin(t*2.2+s*0.45+i*0.9)*0.13*(s/14+0.3)+(i<4?-0.005:0.005)*s;x+=Math.sin(ang)*15;yy+=Math.cos(ang)*15;pts.push([x,yy]);}
        const d=(n)=>'M'+pts.slice(0,n).map(p=>p.join(' ')).join(' L');a+=`<path d="${d(15)}" stroke="#7E3426" stroke-width="10"/><path d="${d(15)}" stroke="#B5523D" stroke-width="7"/><path d="${d(9)}" stroke="#B5523D" stroke-width="15"/><path d="${d(5)}" stroke="#B5523D" stroke-width="22"/>`;
        for(let s=2;s<13;s+=2)a+=`<circle cx="${pts[s][0]+3}" cy="${pts[s][1]}" r="${3.4-s*0.18}" fill="#F0C9B0" stroke="none"/>`;}
      root.querySelector(`#${p}arms`).innerHTML=a;}
    const wh=root.querySelector(`#${p}wh`);if(wh){wh.setAttribute('transform',`translate(${-700+(t/6.8)*1300} ${150+Math.sin(t*0.8)*12}) scale(0.95)`);root.querySelector(`#${p}fluke`).setAttribute('transform',`rotate(${Math.sin(t*1.8)*10} 40 152)`);}
    q(root,'.jl').forEach(g=>{const j=+g.dataset.j,k=+g.dataset.k,ph=t*2.2+j;const pul=Math.sin(ph);const y=+g.dataset.y-((t*14*(1+j*0.3))%120)+Math.max(0,pul)*0;g.setAttribute('transform',`translate(${+g.dataset.x+Math.sin(t*0.6+j)*12} ${+g.dataset.y-t*10*(1-j*0.2)}) scale(${k})`);
      g.querySelector('.jb').setAttribute('transform',`scale(${1+0.08*pul} ${1-0.1*pul})`);
      let tt='';for(let i=0;i<9;i++){const x0=-75+i*19;let d=`M${x0} 4`;for(let s=1;s<=10;s++)d+=` L${x0+Math.sin(t*2+s*0.6+i)*10*(s/10)} ${4+s*(i%2?16:22)}`;tt+=`<path d="${d}"/>`;}g.querySelector('.jt').innerHTML=tt;});
  }};
}

// ---------- land ----------
function treeSVG(p,cx,base,scale,r,old){
  const CL=old?[[-70,-250,46],[60,-280,40],[-10,-320,36],[110,-220,34]]:[[-110,-270,62],[112,-304,66],[-68,-340,56],[70,-356,58],[-120,-196,56],[130,-214,58],[2,-396,72],[2,-316,66],[-50,-264,52],[56,-264,54],[2,-240,46]];
  let fol='';CL.forEach(([x,y,R])=>{let g=`<circle cx="${x+8}" cy="${y+10}" r="${R}" fill="${old?'#2F4A2E':'#344C25'}"/>`;
    for(let k=0;k<6;k++){const a=k/6*Math.PI*2+r();g+=`<circle cx="${x+Math.cos(a)*R*0.45}" cy="${y+Math.sin(a)*R*0.4}" r="${R*0.55}" fill="${old?'#46663F':'#557334'}"/>`;}
    for(let k=0;k<3;k++)g+=`<circle cx="${x-R*0.35+r()*R*0.4}" cy="${y-R*0.4+r()*R*0.3}" r="${R*(0.22+r()*0.12)}" fill="${old?'#6E8D58':'#7E9C46'}"/>`;
    for(let k=0;k<5;k++)g+=`<circle cx="${x-R*0.6+r()*R*0.9}" cy="${y-R*0.6+r()*R*0.8}" r="${2+r()*3}" fill="#A8C266" opacity=".8"/>`;
    fol+=`<g class="cl" style="transform-box:fill-box;transform-origin:center">${g}</g>`;});
  const trunk=old?`<path d="M -40 0 C -30 -40, -50 -90, -20 -140 C 0 -180, -40 -220, -10 -260 L 10 -258 C 0 -220, 30 -190, 20 -150 C 10 -100, 40 -50, 44 0 Z" fill="url(#gTrunk)" stroke="#22170D" stroke-width="2"/>
     <path d="M -14 -150 C -40 -190, -70 -210, -80 -250" stroke="#4A3320" stroke-width="12" fill="none" stroke-linecap="round"/><path d="M 14 -170 C 40 -200, 60 -230, 60 -270" stroke="#4A3320" stroke-width="10" fill="none" stroke-linecap="round"/>
     <path d="M 0 -120 C 40 -140, 90 -170, 110 -210" stroke="#7A6A55" stroke-width="7" fill="none" stroke-linecap="round"/><path d="M -20 -60 C -60 -70, -90 -100, -110 -130" stroke="#7A6A55" stroke-width="6" fill="none" stroke-linecap="round"/>
     <g fill="none" stroke="#24180E" stroke-width="1.6" opacity=".55"><path d="M-20 -10 C -10 -60, -30 -110, -5 -160"/><path d="M10 -10 C 20 -70, 0 -120, 10 -170"/></g>`
   :`<path d="M -46 2 C -26 -6, -16 -34, -14 -76 C -10 -148, -8 -208, -6 -308 L 8 -308 C 10 -208, 12 -148, 16 -76 C 18 -34, 28 -6, 50 2 Z" fill="url(#gTrunk)" stroke="#22170D" stroke-width="2"/>
     <g fill="none" stroke="#4A3320" stroke-linecap="round"><path d="M-4 -128 C -50 -148, -80 -163, -120 -190" stroke-width="10"/><path d="M6 -138 C 50 -158, 80 -170, 128 -212" stroke-width="10"/><path d="M-4 -178 C -40 -208, -70 -228, -108 -268" stroke-width="9"/><path d="M2 -208 C 40 -238, 70 -258, 110 -302" stroke-width="9"/><path d="M0 -298 C 0 -328, 2 -358, 0 -392" stroke-width="8"/></g>
     <g fill="none" stroke="#24180E" stroke-width="1.6" opacity=".55"><path d="M-6 -8 C -8 -68, -4 -128, -4 -208"/><path d="M4 -12 C 6 -78, 2 -138, 4 -218"/></g>`;
  return `<g transform="translate(${cx} ${base}) scale(${scale})"><ellipse cx="4" cy="0" rx="150" ry="12" fill="#2A2416" opacity=".25"/><g class="tgrow">${trunk}</g><g class="fol">${fol}</g></g>`;
}
function skyGround(p,r,kind){
  const sky={storm:'gStorm',ice:'gIceSky',mars:'gMarsSky',desert:'gSky',beach:'gSky'}[kind]||'gSky';
  let s=`<rect width="${PW}" height="${PH}" fill="url(#${sky})"/>`;
  if(kind!=='storm'&&kind!=='mars')s+=`<circle cx="730" cy="110" r="120" fill="url(#gSun2)"/><circle cx="730" cy="110" r="42" fill="#F6E8B6" opacity=".9"/>`;
  if(kind==='mars')s+=`<circle cx="720" cy="100" r="22" fill="#F2E2C8" opacity=".8"/>`;
  s+=`<g id="${p}cl">`;for(let i=0;i<4;i++){const x=r()*900,y=40+r()*110,w=80+r()*90;s+=`<g data-x="${x}" data-v="${6+r()*8}" opacity="${kind==='storm'?0.9:0.55}"><ellipse cx="0" cy="${y}" rx="${w}" ry="${w*0.22}" fill="${kind==='storm'?'#3A3F45':'#FBF6E8'}"/><ellipse cx="${w*0.3}" cy="${y-w*0.15}" rx="${w*0.5}" ry="${w*0.25}" fill="${kind==='storm'?'#454B52':'#FFFDF5'}"/></g>`;}s+=`</g>`;
  return s;
}
function hills(c1,c2){return `<path d="M0 400 C 120 340, 220 360, 320 330 C 430 300, 520 350, 640 320 C 740 296, 830 330, 900 316 L 900 560 L 0 560 Z" fill="${c1}" opacity=".85"/><path d="M0 440 C 140 400, 260 430, 380 410 C 520 386, 640 430, 780 404 C 840 394, 880 402, 900 400 L 900 560 L 0 560 Z" fill="${c2}"/>`;}
function tufts(r,n,y0=505,cols=['#55642E','#6F7D3A']){let s='';for(let i=0;i<n;i++){const x=20+r()*860,y=y0+r()*40,h=10+r()*14;s+=`<path d="M${x} ${y} l -4 ${-h} M${x} ${y} l 1 ${-h*1.2} M${x} ${y} l 5 ${-h*0.9}" stroke="${cols[i%2]}" stroke-width="2.2" stroke-linecap="round"/>`;}return s;}
function pyramid(x,base,w,h){return `<polygon points="${x-w/2},${base} ${x},${base-h} ${x+w*0.12},${base}" fill="#D9B97A" stroke="#6E5530" stroke-width="2"/><polygon points="${x},${base-h} ${x+w/2},${base} ${x+w*0.12},${base}" fill="#A88650" stroke="#6E5530" stroke-width="2"/>`+[...Array(6)].map((_,i)=>{const yy=base-h*(i+1)/7;const dx=w/2*(1-(i+1)/7);return `<line x1="${x-dx}" y1="${yy}" x2="${x+w*0.12*(1-(i+1)/7)}" y2="${yy+h*0.0}" stroke="#8C6C3C" stroke-width="1" opacity=".5"/>`;}).join('');}
function stepPyr(x,base){let s='';for(let i=0;i<5;i++){const w=300-i*52,h=34;s+=`<rect x="${x-w/2}" y="${base-(i+1)*h}" width="${w}" height="${h}" fill="${i%2?'#B9A27A':'#C9B28A'}" stroke="#5E4C30" stroke-width="2"/>`;}s+=`<rect x="${x-34}" y="${base-5*34-50}" width="68" height="50" fill="#9C8560" stroke="#5E4C30" stroke-width="2"/><polygon points="${x-24},${base} ${x+24},${base} ${x+10},${base-170} ${x-10},${base-170}" fill="#A8916A" stroke="#5E4C30" stroke-width="1.5"/>`;return s;}
function P_land(p,o){
  const r=rnd(p.length*17+o.s.length*29);const k=o.s;let inner=skyGround(p,r,k);let fg='';
  if(k==='tree'||k==='oldtree'){inner+=hills('#BDB28A','#A0956A')+`<path d="M0 492 C 200 480, 380 500, 560 488 C 700 480, 820 494, 900 488 L 900 560 L 0 560 Z" fill="url(#gGround)"/>`;
    if(k==='oldtree')inner+=`<g fill="#8C8270" stroke="#5A5246" stroke-width="2"><path d="M300 520 C 310 490, 360 486, 380 510 Z"/><path d="M560 515 C 575 495, 610 492, 620 516 Z"/></g>`;
    inner+=`<g id="${p}tree">${treeSVG(p,450,510,1,r,k==='oldtree')}</g>`;fg=tufts(r,30);}
  if(k==='forest'){inner+=hills('#B4AE88','#97906A');for(let row=0;row<3;row++)for(let i=0;i<9;i++){const sc=0.28+row*0.12+r()*0.05;inner+=`<g class="ft" data-d="${row*0.3+i*0.04}">${treeSVG(p,40+i*105+r()*30+row*20,420+row*50,sc,r,false)}</g>`;}
    inner+=`<path d="M0 520 L900 520 L900 560 L0 560 Z" fill="url(#gGround)"/>`;fg=tufts(r,26,520);}
  if(k==='bamboo'){inner+=hills('#B9B48E','#98946A')+`<path d="M0 500 L900 500 L900 560 L0 560 Z" fill="url(#gGround)"/>`;
    for(let i=0;i<9;i++){const x=120+i*80+r()*20,hmax=300+r()*160;inner+=`<g class="bb" data-x="${x}" data-h="${hmax}" data-d="${i*0.08}"></g>`;}
    inner+=`<g id="${p}ruler"><rect x="40" y="140" width="34" height="360" fill="#EFE3C2" stroke="#1E1B16" stroke-width="2"/>${[...Array(10)].map((_,i)=>`<line x1="40" y1="${500-i*36}" x2="${i%2?56:66}" y2="${500-i*36}" stroke="#1E1B16" stroke-width="2"/>`).join('')}</g>`;fg=tufts(r,24,505);}
  if(k==='mountain'||k==='mars'){
    if(k==='mountain'){inner+=`<path d="M0 420 L120 300 L200 360 L300 250 L380 330 L450 120 L520 250 L600 200 L720 320 L800 270 L900 360 L900 560 L0 560 Z" fill="#8C8A86"/>
      <path d="M450 120 L520 250 L560 230 L600 260 L660 330 L620 470 L470 470 L480 300 Z" fill="#6E6C69" opacity=".85"/><path d="M450 120 L400 230 L430 220 L455 245 L480 215 L520 250 Z" fill="#F5F3EE" stroke="#BFBAB2" stroke-width="1.5"/>
      <path d="M300 250 L270 290 L300 285 L330 300 Z" fill="#F5F3EE"/><path d="M600 200 L575 240 L605 232 L630 250 Z" fill="#F5F3EE"/>
      <path d="M0 470 C 200 450, 400 480, 600 460 C 750 448, 850 470, 900 466 L 900 560 L 0 560 Z" fill="#6F6A55"/>
      <g id="${p}flag"><line x1="450" y1="120" x2="450" y2="92" stroke="#1E1B16" stroke-width="2.5"/><path d="M450 92 L472 98 L450 104 Z" fill="#7A1F1F"/></g>`;}
    else{inner+=`<path d="M0 470 C 200 460, 700 470, 900 465 L 900 560 L 0 560 Z" fill="#9C4E2C"/>
      <path d="M40 470 C 160 420, 260 260, 420 240 C 580 260, 680 420, 820 470 Z" fill="#B8623A" stroke="#6E3018" stroke-width="2.5"/><ellipse cx="420" cy="246" rx="70" ry="12" fill="#8A3E20"/>
      <g stroke="#6E3018" stroke-width="1.4" opacity=".5" fill="none"><path d="M200 400 C 260 350, 320 300, 380 260"/><path d="M640 400 C 580 350, 520 300, 460 260"/></g>
      <path d="M760 470 L790 410 L820 470 Z" fill="#7C7A76" stroke="#3A3A38" stroke-width="1.5"/>${label(790,398,'EVEREST','#3A1408',16)}${label(420,215,'OLYMPUS MONS','#3A1408',22)}`;}
  }
  if(k==='ice'){inner+=`<path d="M0 380 L120 300 L190 340 L300 260 L420 330 L560 280 L700 340 L820 290 L900 330 L900 560 L0 560 Z" fill="#E4EEF2" stroke="#9FB6C2" stroke-width="2"/>
     <path d="M300 260 L330 330 L420 330 Z M560 280 L600 350 L700 340 Z" fill="#BCD1DB"/>
     <path d="M0 450 C 200 430, 400 460, 600 440 C 750 428, 850 448, 900 444 L 900 560 L 0 560 Z" fill="#F4F8FA" stroke="#B9CAD3" stroke-width="2"/>
     <path d="M80 470 L140 440 L200 470 Z M640 480 L700 450 L760 480 Z" fill="#CFE0E8" stroke="#9FB6C2" stroke-width="1.5"/>`;
    for(let i=0;i<70;i++)inner+=`<circle class="sn" data-x="${r()*900}" data-y="${r()*560}" data-s="${0.5+r()}" r="${1.5+r()*2}" fill="#FFFFFF" opacity=".85"/>`;}
  if(k==='desert'||k==='beach'){
    if(k==='beach'){inner+=`<rect x="0" y="300" width="900" height="80" fill="#6E9FAE"/><path id="${p}surf" fill="#F2EEE4" opacity=".7"/><path d="M0 360 C 200 350, 500 370, 900 352 L 900 560 L 0 560 Z" fill="#E3CC98"/>`;for(let i=0;i<260;i++)inner+=`<circle class="gr" data-ph="${r()*6}" cx="${r()*900}" cy="${380+r()*180}" r="${0.8+r()*1.6}" fill="${r()<.5?'#B99A5E':'#FFF6DA'}"/>`;}
    else{const green=o.green;inner+=`<path d="M0 360 C 150 330, 300 350, 450 330 C 600 312, 750 345, 900 330 L 900 560 L 0 560 Z" fill="${green?'#9CA866':'#E2C489'}"/>`;
      if(o.pyramids)inner+=pyramid(330,470,300,190)+pyramid(560,470,240,150)+pyramid(720,470,130,82);
      if(o.step)inner+=stepPyr(450,470);
      inner+=`<path d="M0 440 C 180 410, 360 450, 540 425 C 700 405, 820 440, 900 430 L 900 560 L 0 560 Z" fill="${green?'#7F9150':'#D2AE70'}"/><path d="M0 500 C 220 480, 480 510, 900 490 L 900 560 L 0 560 Z" fill="${green?'#6B7E40':'#C29C5E'}"/>`;
      if(green){inner+=`<ellipse cx="300" cy="470" rx="170" ry="26" fill="#6E9FAE" stroke="#4E7A86" stroke-width="2"/>`+treeSVG(p,640,460,0.32,r)+treeSVG(p,760,470,0.26,r)+treeSVG(p,140,470,0.24,r);
        inner+=`<g id="${p}hip"><ellipse cx="300" cy="462" rx="44" ry="16" fill="#6C5C5A" stroke="#3E3332" stroke-width="2"/><ellipse cx="342" cy="456" rx="16" ry="11" fill="#6C5C5A" stroke="#3E3332" stroke-width="2"/><circle cx="350" cy="450" r="2.4" fill="#111"/></g>`;fg=tufts(r,30,500,['#4E6230','#62783A']);}
      else{inner+=`<g id="${p}haze" opacity=".25">${[...Array(4)].map((_,i)=>`<path data-y="${380+i*30}" fill="none" stroke="#FFF6DA" stroke-width="2"/>`).join('')}</g>`;}}
  }
  if(k==='storm'){inner+=`<path d="M0 470 C 200 450, 400 480, 600 460 C 750 448, 850 470, 900 466 L 900 560 L 0 560 Z" fill="#3E3F36"/>${hills('#4A4C48','#3B3D38')}
    <g id="${p}rain" stroke="#C8D0D6" stroke-width="1.6" opacity=".45"></g><path id="${p}bolt" fill="#FFF7D6" stroke="#FFE38A" stroke-width="4" filter="url(#fGlow)"/><rect id="${p}flash" width="900" height="560" fill="#FFFFFF" opacity="0"/>`;}
  inner+=fg+`<rect width="${PW}" height="${PH}" fill="url(#gVig)" opacity=".55"/>`;
  return {svg:wrap(p,inner),update:(root,t)=>{
    q(root,`#${p}cl > g`).forEach(g=>{const x=((+g.dataset.x+t*+g.dataset.v)%1100)-100;g.setAttribute('transform',`translate(${x} 0)`);});
    const tr=root.querySelector(`#${p}tree`);if(tr){const gT=sm((t-0.2)/1.4);tr.querySelector('.tgrow').setAttribute('transform',`scale(${0.2+0.8*gT} ${gT})`);
      q(tr,'.cl').forEach((c,i)=>{const qq=Math.max(0,Math.min(1,(t-1.2-i*0.08)/0.45));const sc=qq<=0?0:ease3(qq)+Math.sin(qq*Math.PI)*0.12*(1-qq);c.style.transform=`scale(${sc})`;});
      tr.querySelector('.fol').setAttribute('transform',`rotate(${Math.sin(t*1.1)*0.9} 0 -150)`);}
    q(root,'.ft').forEach(g=>{const qq=sm((t-+g.dataset.d)/0.8);g.style.opacity=qq;g.setAttribute('transform',`translate(0 ${(1-qq)*30})`);q(g,'.cl').forEach(c=>c.style.transform='scale(1)');});
    q(root,'.bb').forEach(g=>{const x=+g.dataset.x,hm=+g.dataset.h,gg=sm((t-+g.dataset.d)/5.5)*0.85+0.15;const h=hm*gg;let s='';const seg=Math.max(1,Math.floor(h/46));
      s+=`<rect x="${x-9}" y="${500-h}" width="18" height="${h}" fill="url(#gBamboo)" stroke="#3E5A22" stroke-width="1.5"/>`;for(let i=1;i<=seg;i++)s+=`<rect x="${x-11}" y="${500-i*46}" width="22" height="5" rx="2" fill="#6C8A3A" stroke="#3E5A22" stroke-width="1"/>`;
      for(let i=1;i<seg;i+=2){const y=500-i*46,sd=i%4===1?1:-1;s+=`<path d="M${x} ${y} q ${sd*30} ${-14} ${sd*62} ${-4} q ${-sd*30} ${8} ${-sd*62} ${4} Z" fill="#7FA046" stroke="#3E5A22" stroke-width="1"/>`;}
      s+=`<path d="M${x} ${500-h} q 18 -24 40 -26 q -22 12 -40 26 Z M${x} ${500-h} q -16 -26 -36 -30 q 18 14 36 30 Z" fill="#8DB052" stroke="#3E5A22" stroke-width="1"/>`;g.innerHTML=s;});
    q(root,'.sn').forEach(c=>{const y=((+c.dataset.y+t*30*+c.dataset.s)%560);c.setAttribute('cy',y);c.setAttribute('cx',+c.dataset.x+Math.sin(t+ +c.dataset.y)*10);});
    q(root,'.gr').forEach(c=>c.style.opacity=0.5+0.5*Math.sin(t*2+ +c.dataset.ph));
    const su=root.querySelector(`#${p}surf`);if(su){let d='M0 360';for(let x=0;x<=900;x+=20)d+=` L${x} ${352+Math.sin(x*0.03+t*2)*6}`;su.setAttribute('d',d+' L900 372 L0 372 Z');}
    const hz=root.querySelector(`#${p}haze`);if(hz)[...hz.children].forEach((e,i)=>{let d=`M0 ${e.dataset.y}`;for(let x=0;x<=900;x+=30)d+=` L${x} ${+e.dataset.y+Math.sin(x*0.03+t*3+i)*4}`;e.setAttribute('d',d);});
    const hp=root.querySelector(`#${p}hip`);if(hp)hp.setAttribute('transform',`translate(${Math.sin(t*0.5)*20} ${Math.sin(t*1.5)*2})`);
    const rn=root.querySelector(`#${p}rain`);if(rn){let s='';const rr=rnd(9);for(let i=0;i<90;i++){const x=rr()*1000-50,y=((rr()*560+t*700)%600)-40;s+=`<line x1="${x}" y1="${y}" x2="${x-8}" y2="${y+26}"/>`;}rn.innerHTML=s;}
    const bo=root.querySelector(`#${p}bolt`);if(bo){const cyc=t%2.2,on=cyc<0.25;const rr=rnd(Math.floor(t/2.2)+3);let x=380+rr()*140,y=120;let d=`M${x} ${y}`;const pts=[[x,y]];while(y<470){x+=(rr()-0.5)*70;y+=40+rr()*30;pts.push([x,Math.min(y,470)]);}
      d=pts.map((p,i)=>(i?'L':'M')+p[0]+' '+p[1]).join(' ')+' '+pts.slice().reverse().map(p=>`L${p[0]+7} ${p[1]}`).join(' ')+' Z';bo.setAttribute('d',d);bo.style.opacity=on?(cyc<0.08||cyc>0.14?1:0.3):0;root.querySelector(`#${p}flash`).style.opacity=on?(0.35*(1-cyc/0.25)):0;}
    const fl=root.querySelector(`#${p}flag`);if(fl)fl.setAttribute('transform',`skewY(${Math.sin(t*6)*4})`);
  }};
}
Object.assign(PANELS,{sea:P_sea,land:P_land});
