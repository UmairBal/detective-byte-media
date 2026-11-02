const {chromium}=require('playwright');const {spawn}=require('child_process');const fs=require('fs');
const all=[[0,4.4],[4.4,11.2],[11.2,17.9],[17.9,24.8],[24.8,31.4],[31.4,37.4]];const idx=process.argv.slice(2).map(Number);
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:1080,height:1920}});
await p.goto('file://'+process.cwd()+'/reel.html');await p.evaluate(()=>document.fonts.ready);
for(const i of idx){const [a,e]=all[i];const n=Math.round((e-a)*30);const tmp=`sc${i}.tmp.mp4`;
 const ff=spawn('ffmpeg',['-y','-loglevel','error','-f','image2pipe','-framerate','30','-c:v','mjpeg','-i','-','-c:v','libx264','-preset','veryfast','-crf','18','-pix_fmt','yuv420p','-r','30',tmp]);
 for(let f=0;f<n;f++){await p.evaluate(t=>render(t),a+(f+0.5)/30);const buf=await p.screenshot({type:'jpeg',quality:92});if(!ff.stdin.write(buf))await new Promise(r=>ff.stdin.once('drain',r));}
 ff.stdin.end();await new Promise((r,j)=>ff.on('close',c=>c===0?r():j(c)));fs.renameSync(tmp,`sc${i}.mp4`);}
await b.close();})();
