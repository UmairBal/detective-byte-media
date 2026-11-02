const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:1080,height:1920}});
await p.goto('file://'+process.cwd()+'/reel.html');await p.evaluate(()=>document.fonts.ready);
for(const t of [3.8,9,16.5,21,28.5,32.5]){await p.evaluate(t=>render(t),t);await p.screenshot({path:`f_${t}.jpg`,type:'jpeg',quality:80});}
await b.close();})();
