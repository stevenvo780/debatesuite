import puppeteer from 'puppeteer-core';
const urls = process.argv.slice(2);
const SCAN = () => {
  const toRGBA=c=>{const m=(c||'').match(/[\d.]+/g);if(!m)return null;return[+m[0],+m[1],+m[2],m[3]!==undefined?+m[3]:1];};
  const blend=(fg,bg)=>{const a=fg[3]??1;return[fg[0]*a+bg[0]*(1-a),fg[1]*a+bg[1]*(1-a),fg[2]*a+bg[2]*(1-a)];};
  const lum=a=>{const x=a.map(v=>{v/=255;return v<=0.03928?v/12.92:Math.pow((v+0.055)/1.055,2.4);});return 0.2126*x[0]+0.7152*x[1]+0.0722*x[2];};
  const ratio=(f,b)=>{const L1=lum(f),L2=lum(b),hi=Math.max(L1,L2),lo=Math.min(L1,L2);return (hi+0.05)/(lo+0.05);};
  const bgOf=el=>{
    let e=el;
    let composite=[255,255,255];
    const stack=[];
    while(e&&e!==document.documentElement){stack.unshift(e);e=e.parentElement;}
    for(const node of stack){
      const c=getComputedStyle(node).backgroundColor;
      const r=toRGBA(c);
      if(!r)continue;
      const alpha=r[3]??1;
      if(alpha===0)continue;
      composite=blend(r,composite);
    }
    return composite;
  };
  const els=[...document.querySelectorAll('body *')].filter(el=>{
    const t=[...el.childNodes].some(n=>n.nodeType===3&&n.textContent.trim());
    const s=getComputedStyle(el);
    return t&&s.visibility!=='hidden'&&s.display!=='none';
  });
  let low=[];
  for(const el of els){
    const s=getComputedStyle(el);
    const fgRaw=toRGBA(s.color);
    if(!fgRaw)continue;
    const bg=bgOf(el);
    // Blend fg alpha over bg too
    const fg=fgRaw[3]<1?blend(fgRaw,bg):fgRaw.slice(0,3);
    const r=ratio(fg,bg);
    const fs=parseFloat(s.fontSize);
    const big=fs>=24||(fs>=18.66&&parseInt(s.fontWeight)>=700);
    if(r<(big?3:4.5))low.push({t:el.textContent.trim().slice(0,30),fg:s.color,bg:'rgb('+bg.map(v=>Math.round(v)).join(', ')+')',r:+r.toFixed(2)});
  }
  return {low:low.length,worst:low.sort((a,b)=>a.r-b.r).slice(0,8)};
};
let fail=0;
const b=await puppeteer.launch({executablePath:'/usr/bin/google-chrome',headless:'new',args:['--no-sandbox','--disable-gpu']});
for(const u of urls){const p=await b.newPage();await p.setViewport({width:1280,height:800});try{await p.goto(u,{waitUntil:'networkidle2',timeout:60000});}catch(e){}; const r=await p.evaluate(SCAN); console.log(u, JSON.stringify(r)); if(r.low>0)fail++; await p.close();}
await b.close();
process.exit(fail>0?1:0);
