const {chromium}=require('playwright');const {spawn,execFileSync}=require('child_process');const fs=require('fs');
const rid=process.argv[2];const durs=JSON.parse(process.argv[3]);
const spec=JSON.parse(fs.readFileSync('specs.json')).find(s=>s.id===rid);
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:1080,height:1920}});
p.on('pageerror',e=>{console.error('PAGEERR',e.message);process.exit(2);});
await p.addInitScript(s=>{window.SPEC=s;},{spec,durs});
await p.goto('file://'+process.cwd()+'/engine.html');await p.evaluate(()=>document.fonts.ready);
let a=0;const list=[];
for(let i=0;i<durs.length;i++){const e=a+durs[i];const n=Math.round((e-a)*30);const tmp=`out/${rid}_sc${i}.tmp.mp4`,fin=`out/${rid}_sc${i}.mp4`;
 const ff=spawn('ffmpeg',['-y','-loglevel','error','-f','image2pipe','-framerate','30','-c:v','mjpeg','-i','-','-c:v','libx264','-preset','veryfast','-crf','19','-pix_fmt','yuv420p','-r','30',tmp]);
 for(let f=0;f<n;f++){await p.evaluate(t=>render(t),a+(f+0.5)/30);const buf=await p.screenshot({type:'jpeg',quality:90});if(!ff.stdin.write(buf))await new Promise(r=>ff.stdin.once('drain',r));}
 ff.stdin.end();await new Promise((r,j)=>ff.on('close',c=>c===0?r():j(c)));fs.renameSync(tmp,fin);list.push(`file '${rid}_sc${i}.mp4'`);a=e;}
fs.writeFileSync(`out/${rid}_list.txt`,list.join('\n'));
execFileSync('ffmpeg',['-y','-loglevel','error','-f','concat','-safe','0','-i',`out/${rid}_list.txt`,'-c','copy',`out/${rid}_video.mp4`]);
await b.close();})();
