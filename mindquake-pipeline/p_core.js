// ===== Mindquake illustration library: core + space =====
const PW=900, PH=560;
function rnd(seed){let s=seed%2147483647; if(s<=0)s+=2147483646; return()=>{s=(s*16807)%2147483647;return (s-1)/2147483646;};}
function frameSVG(){return `<rect x="2" y="2" width="${PW-4}" height="${PH-4}" rx="18" fill="none" stroke="#1E1B16" stroke-width="5"/><rect x="12" y="12" width="${PW-24}" height="${PH-24}" rx="12" fill="none" stroke="#B8893A" stroke-width="1.6" opacity=".9"/>`;}
function wrap(p,inner){return `<clipPath id="${p}c"><rect width="${PW}" height="${PH}" rx="18"/></clipPath><g clip-path="url(#${p}c)">${inner}</g>${frameSVG()}`;}
const q=(root,sel)=>[...root.querySelectorAll(sel)];
const ease3=x=>{x=Math.max(0,Math.min(1,x));return 1-Math.pow(1-x,3);};
const sm=x=>{x=Math.max(0,Math.min(1,x));return x*x*(3-2*x);};
function label(x,y,txt,col='#F1E7D0',size=24){return `<text x="${x}" y="${y}" text-anchor="middle" font-family="CG" font-weight="700" font-size="${size}" letter-spacing="6" fill="${col}">${txt}</text>`;}

// ---------- space background ----------
function spaceBg(p,r,n=110){
  let s=`<rect width="${PW}" height="${PH}" fill="url(#gSpace)"/>
  <ellipse cx="${200+r()*500}" cy="${120+r()*300}" rx="260" ry="120" fill="#4B3B5E" opacity=".35" filter="url(#fBlur)"/>
  <ellipse cx="${200+r()*500}" cy="${120+r()*300}" rx="220" ry="90" fill="#2F5563" opacity=".35" filter="url(#fBlur)"/>`;
  for(let i=0;i<n;i++){const x=r()*PW,y=r()*PH,rad=0.6+r()*1.6;s+=`<circle class="tw" data-ph="${r()*6}" cx="${x}" cy="${y}" r="${rad}" fill="#F4EEDC"/>`;}
  for(let i=0;i<5;i++){const x=40+r()*820,y=30+r()*500,k=4+r()*5;s+=`<path class="tw" data-ph="${r()*6}" d="M${x} ${y-k*2} L${x+k*0.3} ${y-k*0.3} L${x+k*2} ${y} L${x+k*0.3} ${y+k*0.3} L${x} ${y+k*2} L${x-k*0.3} ${y+k*0.3} L${x-k*2} ${y} L${x-k*0.3} ${y-k*0.3} Z" fill="#FFF6DA"/>`;}
  return s;
}
function twinkle(root,t){q(root,'.tw').forEach(e=>{e.style.opacity=0.45+0.55*Math.abs(Math.sin(t*1.3+ +e.dataset.ph));});}

// ---------- planets ----------
const PL={
 venus:{base:['#F3DDA6','#D9B36A','#8C6A33'],bands:['#F7E7BE','#E2C487','#C9A35E'],atm:'#F7DFA0'},
 jupiter:{base:['#EAD7B5','#C9A57A','#7A5A3A'],bands:['#B98A5E','#E8D4B0','#9C6E48','#D8BC92','#8A5E3C'],spot:1},
 saturn:{base:['#EEDFB8','#D3B783','#8A7048'],bands:['#E2CC9A','#C9AE78','#F0E2BD'],rings:1},
 mars:{base:['#E08A5A','#B5532E','#5E2614'],patch:'#8E3E22',cap:1},
 mercury:{base:['#C9C2B6','#948C80','#4A443C'],crater:1},
 moon:{base:['#E6E1D5','#B3AC9E','#5C564C'],crater:1,maria:1},
 earth:{base:['#6FA7C8','#2E6A92','#123247'],land:1,atm:'#9FD0EA'}
};
function planetSVG(p,kind,cx,cy,R,r){
  const c=PL[kind]; let tex='';
  const per=2*R*1.6; // pattern period
  for(let copy=0;copy<1;copy++){const ox=copy*per;
    if(c.bands){let y=cy-R;let i=0;while(y<cy+R){const h=R*(0.08+r()*0.16);tex+=`<rect x="${cx-R+ox-per}" y="${y}" width="${per}" height="${h}" fill="${c.bands[i%c.bands.length]}" opacity="${(kind==='venus'?0.25:0.55)+r()*0.3}"/>`;
      tex+=`<path d="M${cx-R+ox-per} ${y+h} q ${per/8} ${h*0.4} ${per/4} 0 t ${per/4} 0 t ${per/4} 0 t ${per/4} 0" fill="none" stroke="${c.bands[(i+1)%c.bands.length]}" stroke-width="${2+r()*3}" opacity=".5"/>`;y+=h;i++;}}
    if(c.spot){tex+=`<ellipse cx="${cx-R+ox-per+per*0.3}" cy="${cy+R*0.28}" rx="${R*0.22}" ry="${R*0.12}" fill="#B5502E" stroke="#8A3A20" stroke-width="2"/><ellipse cx="${cx-R+ox-per+per*0.3}" cy="${cy+R*0.28}" rx="${R*0.13}" ry="${R*0.06}" fill="#CF6A44" opacity=".8"/>`;}
    if(c.patch){const rr=rnd(77);for(let i=0;i<9;i++){tex+=`<ellipse cx="${cx-R+ox-per+rr()*per}" cy="${cy-R*0.6+rr()*R*1.2}" rx="${R*(0.1+rr()*0.25)}" ry="${R*(0.05+rr()*0.12)}" fill="${c.patch}" opacity=".55"/>`;}}
    if(c.crater){const rr=rnd(55);if(c.maria){for(let i=0;i<5;i++)tex+=`<ellipse cx="${cx-R+ox-per+rr()*per}" cy="${cy-R*0.5+rr()*R}" rx="${R*(0.15+rr()*0.2)}" ry="${R*(0.1+rr()*0.15)}" fill="#8F897D" opacity=".45"/>`;}
      for(let i=0;i<26;i++){const x=cx-R+ox-per+rr()*per,y=cy-R+rr()*2*R,k=R*(0.02+rr()*0.07);tex+=`<circle cx="${x}" cy="${y}" r="${k}" fill="#7D776C" opacity=".55"/><circle cx="${x-k*0.25}" cy="${y-k*0.25}" r="${k*0.8}" fill="none" stroke="#F2EEE4" stroke-width="${Math.max(1,k*0.18)}" opacity=".45"/>`;}}
    if(c.land){const rr=rnd(91);for(let i=0;i<5;i++){const x=cx-R+ox-per+rr()*per,y=cy-R*0.6+rr()*R*1.2,w=R*(0.25+rr()*0.35);
      tex+=`<path d="M${x} ${y} c ${w*0.3} ${-w*0.4} ${w*0.9} ${-w*0.3} ${w} ${w*0.1} c ${w*0.1} ${w*0.5} ${-w*0.3} ${w*0.7} ${-w*0.6} ${w*0.5} c ${-w*0.3} ${-w*0.1} ${-w*0.5} ${-w*0.3} ${-w*0.4} ${-w*0.6} Z" fill="#6E8B4A" stroke="#4E6634" stroke-width="2"/>`;}
      for(let i=0;i<7;i++){const x=cx-R+ox-per+rr()*per,y=cy-R*0.8+rr()*R*1.6;tex+=`<ellipse cx="${x}" cy="${y}" rx="${R*(0.15+rr()*0.2)}" ry="${R*0.04}" fill="#FFFFFF" opacity=".55"/>`;}}
  }
  const cap=c.cap?`<ellipse cx="${cx}" cy="${cy-R*0.93}" rx="${R*0.35}" ry="${R*0.12}" fill="#F4EFE6" opacity=".9"/>`:'';
  const atm=c.atm?`<circle cx="${cx}" cy="${cy}" r="${R*1.08}" fill="none" stroke="${c.atm}" stroke-width="${R*0.08}" opacity=".35" filter="url(#fBlur2)"/>`:'';
  const ringBack=c.rings?`<ellipse cx="${cx}" cy="${cy}" rx="${R*2.1}" ry="${R*0.48}" fill="none" stroke="#D8C394" stroke-width="${R*0.22}" opacity=".8" transform="rotate(-14 ${cx} ${cy})"/><ellipse cx="${cx}" cy="${cy}" rx="${R*1.72}" ry="${R*0.38}" fill="none" stroke="#A88F60" stroke-width="${R*0.08}" opacity=".9" transform="rotate(-14 ${cx} ${cy})"/>`:'';
  const ringFront=c.rings?`<clipPath id="${p}rf"><rect x="${cx-R*3}" y="${cy}" width="${R*6}" height="${R*2}" transform="rotate(-14 ${cx} ${cy})"/></clipPath><g clip-path="url(#${p}rf)">${ringBack}</g>`:'';
  return `<g id="${p}planet">${atm}${ringBack}
   <clipPath id="${p}pc"><circle cx="${cx}" cy="${cy}" r="${R}"/></clipPath>
   <circle cx="${cx}" cy="${cy}" r="${R}" fill="${c.base[1]}"/>
   <g clip-path="url(#${p}pc)"><g id="${p}tex" data-per="${per}">${tex}<g transform="translate(${per} 0)">${tex}</g></g>${cap}
     <circle cx="${cx}" cy="${cy}" r="${R}" fill="url(#gShade)"/></g>
   <circle cx="${cx}" cy="${cy}" r="${R}" fill="none" stroke="#0E141A" stroke-width="2" opacity=".6"/>${ringFront}</g>`;
}
function P_planet(p,o){
  const r=rnd(p.length*97+(o.p||'x').length*13);
  let inner=spaceBg(p,r);
  if(o.orbit){
    inner+=`<ellipse cx="450" cy="290" rx="330" ry="120" fill="none" stroke="#E8DCC0" stroke-width="1.5" stroke-dasharray="6 8" opacity=".5"/>
    <circle cx="450" cy="290" r="70" fill="url(#gSunR)" filter="url(#fGlow)"/><circle cx="450" cy="290" r="54" fill="#F8D27A"/>
    <g id="${p}orb">${planetSVG(p,o.p,0,0,34,r)}</g>`;
  } else if(o.float){
    inner+=`<rect x="0" y="330" width="900" height="230" fill="#4E7F8E" opacity=".85"/><path id="${p}wv" fill="#6E9FAE" opacity=".9"/>`+`<g id="${p}fl">${planetSVG(p,o.p,450,300,120,r)}</g>`+`<rect x="0" y="360" width="900" height="200" fill="#2F5D6C" opacity=".45"/>`;
  } else {
    const big=o.compare?200:210, cx=o.compare?380:450;
    inner+=planetSVG(p,o.p,cx,290,big,r);
    if(o.compare){const k=o.compare,sz={earth:o.p==='jupiter'?20:52,moon:40}[k]||24;
      inner+=`<g id="${p}cmp">${planetSVG(p+'b',k,760,300,sz,rnd(5))}</g>${label(760,300+sz+46,k.toUpperCase())}`;}
  }
  return {svg:wrap(p,inner),update:(root,t)=>{
    twinkle(root,t);
    const tx=root.querySelector(`#${p}tex`); if(tx){const per=+tx.dataset.per;tx.setAttribute('transform',`translate(${(t*14)%per} 0)`);}
    const tb=root.querySelector(`#${p}btex`); if(tb){const per=+tb.dataset.per;tb.setAttribute('transform',`translate(${(t*10)%per} 0)`);}
    const ob=root.querySelector(`#${p}orb`); if(ob){const a=t*0.9+0.5;ob.setAttribute('transform',`translate(${450+Math.cos(a)*330} ${290+Math.sin(a)*120})`);}
    const fl=root.querySelector(`#${p}fl`); if(fl){fl.setAttribute('transform',`translate(0 ${Math.sin(t*1.4)*10}) rotate(${Math.sin(t*0.9)*2} 450 300)`);}
    const wv=root.querySelector(`#${p}wv`); if(wv){let d='M0 330';for(let x=0;x<=900;x+=20)d+=` L${x} ${330+Math.sin(x*0.02+t*2)*6}`;wv.setAttribute('d',d+' L900 360 L0 360 Z');}
  }};
}
// texture id helper for compare planet uses p+'b'
// ---------- sun ----------
function P_sun(p,o){
  const r=rnd(31);let inner=spaceBg(p,r,80);
  const cx=o.compare?330:450, cy=280, R=o.compare?190:180;
  let gran='';for(let i=0;i<160;i++){const a=r()*Math.PI*2,d=Math.sqrt(r())*R*0.95;gran+=`<circle cx="${cx+Math.cos(a)*d}" cy="${cy+Math.sin(a)*d}" r="${3+r()*7}" fill="${r()<.5?'#FFE08A':'#F2A541'}" opacity=".35"/>`;}
  let rays='';for(let i=0;i<24;i++){const a=i/24*Math.PI*2;rays+=`<polygon points="${cx+Math.cos(a-0.05)*R*1.02},${cy+Math.sin(a-0.05)*R*1.02} ${cx+Math.cos(a)*R*(1.35+0.15*(i%3))},${cy+Math.sin(a)*R*(1.35+0.15*(i%3))} ${cx+Math.cos(a+0.05)*R*1.02},${cy+Math.sin(a+0.05)*R*1.02}" fill="#FFD27A" opacity=".18"/>`;}
  inner+=`<circle cx="${cx}" cy="${cy}" r="${R*1.6}" fill="url(#gSunR)" opacity=".7"/>
   <g id="${p}rays">${rays}</g>
   <circle cx="${cx}" cy="${cy}" r="${R}" fill="url(#gSunBody)"/>
   <clipPath id="${p}sc"><circle cx="${cx}" cy="${cy}" r="${R}"/></clipPath><g clip-path="url(#${p}sc)" id="${p}gran">${gran}</g>
   <circle cx="${cx}" cy="${cy}" r="${R}" fill="none" stroke="#F7B44C" stroke-width="3" opacity=".6"/>`;
  if(o.flare) inner+=`<path id="${p}flare" fill="none" stroke="#FF9A3C" stroke-width="10" stroke-linecap="round" opacity=".85"/>`;
  if(o.compare){inner+=`<g id="${p}cmp">${planetSVG(p+'e','earth',700,300,7,rnd(3))}</g><line x1="700" y1="290" x2="760" y2="200" stroke="#E8DCC0" stroke-width="1.5"/>${label(780,190,'EARTH')}`;
    if(o.beam) inner+=`<line id="${p}beam" x1="${cx+R}" y1="${cy+8}" x2="692" y2="300" stroke="#FFE7A3" stroke-width="4" stroke-dasharray="14 18" opacity=".9"/>`;}
  return {svg:wrap(p,inner),update:(root,t)=>{twinkle(root,t);
    root.querySelector(`#${p}rays`).setAttribute('transform',`rotate(${t*4} ${cx} ${cy})`);
    root.querySelector(`#${p}gran`).setAttribute('transform',`rotate(${t*2} ${cx} ${cy})`);
    const f=root.querySelector(`#${p}flare`);if(f){const h=60+40*Math.sin(t*1.2);f.setAttribute('d',`M${cx+R*0.55} ${cy-R*0.83} C ${cx+R*0.7} ${cy-R-h*1.6}, ${cx+R*1.2} ${cy-R-h*1.4}, ${cx+R*0.95} ${cy-R*0.35}`);}
    const b=root.querySelector(`#${p}beam`);if(b)b.style.strokeDashoffset=-t*80;
  }};
}
// ---------- stars / galaxy ----------
function P_stars(p,o){
  const r=rnd(o.galaxy?71:43);let inner=spaceBg(p,r,o.galaxy?60:160);
  if(o.galaxy){let g='';for(let arm=0;arm<2;arm++)for(let i=0;i<260;i++){const tt=i/260*3.2*Math.PI,rad=12+tt*34,a=tt+arm*Math.PI+(r()-0.5)*0.5;g+=`<circle cx="${Math.cos(a)*rad*(1+(r()-.5)*0.15)}" cy="${Math.sin(a)*rad*0.42*(1+(r()-.5)*0.2)}" r="${0.8+r()*2}" fill="${r()<.2?'#F7C9A0':'#EFF2F6'}" opacity="${0.4+r()*0.6}"/>`;}
    inner+=`<g transform="translate(450 280) rotate(-18)"><ellipse rx="70" ry="30" fill="#FFF1C8" opacity=".55" filter="url(#fBlur2)"/><g id="${p}gal">${g}</g><ellipse rx="26" ry="12" fill="#FFF6DD"/></g>`;}
  if(o.big){inner+=`<circle cx="300" cy="300" r="250" fill="url(#gGiant)"/><circle cx="300" cy="300" r="250" fill="url(#gShade)" opacity=".5"/>${label(300,300,'RED GIANT','#3A1408',26)}
    <circle cx="720" cy="320" r="14" fill="#F8D27A" filter="url(#fGlow)"/>${label(720,372,'OUR SUN')}`;}
  if(!o.galaxy&&!o.big) inner+=`<line id="${p}shoot" x1="0" y1="0" x2="-120" y2="-40" stroke="#FFF6DA" stroke-width="3" stroke-linecap="round" opacity="0"/>`;
  return {svg:wrap(p,inner),update:(root,t)=>{twinkle(root,t);
    const g=root.querySelector(`#${p}gal`);if(g)g.setAttribute('transform',`rotate(${t*6})`);
    const s=root.querySelector(`#${p}shoot`);if(s){const k=(t%4)/1.2;s.style.opacity=k<1?Math.sin(k*Math.PI):0;s.setAttribute('transform',`translate(${250+k*500} ${80+k*170})`);}
  }};
}
// ---------- neutron star ----------
function P_neutron(p,o){
  const r=rnd(13);let inner=spaceBg(p,r,120);
  let field='';for(let i=1;i<=5;i++){field+=`<ellipse cx="450" cy="280" rx="${30+i*36}" ry="${80+i*30}" fill="none" stroke="#8FB7D9" stroke-width="1.4" opacity="${0.5-i*0.07}"/>`;}
  inner+=`<g id="${p}spin"><g>${field}</g><g transform="rotate(90 450 280)">${field}</g>
   <polygon points="450,280 420,-200 480,-200" fill="url(#gBeam)"/><polygon points="450,280 420,760 480,760" fill="url(#gBeam2)"/></g>
   <circle cx="450" cy="280" r="70" fill="url(#gNeut)"/><circle cx="450" cy="280" r="22" fill="#F4FAFF"/>`;
  return {svg:wrap(p,inner),update:(root,t)=>{twinkle(root,t);root.querySelector(`#${p}spin`).setAttribute('transform',`rotate(${(t*(o.fast?160:40))%360+30} 450 280)`);}};
}
const PANELS={planet:P_planet,sun:P_sun,stars:P_stars,neutron:P_neutron};
