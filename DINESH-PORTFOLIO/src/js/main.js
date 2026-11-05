
(() => {
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const hero = document.querySelector('.hero');
  if (hero && !reduce) {
    const canvas = document.createElement('canvas');
    canvas.id = 'cyber-network';
    hero.prepend(canvas);
    const ctx = canvas.getContext('2d');
    let w=0,h=0,points=[],raf=0;
    const resize=()=>{
      const r=hero.getBoundingClientRect(),d=Math.min(window.devicePixelRatio||1,1.5);
      w=r.width;h=r.height;canvas.width=w*d;canvas.height=h*d;ctx.setTransform(d,0,0,d,0,0);
      const count=Math.max(20,Math.min(42,Math.floor(w/30)));
      points=Array.from({length:count},()=>({x:Math.random()*w,y:Math.random()*h,vx:(Math.random()-.5)*.24,vy:(Math.random()-.5)*.24}));
    };
    const draw=()=>{
      ctx.clearRect(0,0,w,h);
      for(const p of points){p.x+=p.vx;p.y+=p.vy;if(p.x<0||p.x>w)p.vx*=-1;if(p.y<0||p.y>h)p.vy*=-1;}
      for(let i=0;i<points.length;i++)for(let j=i+1;j<points.length;j++){
        const a=points[i],b=points[j],dx=a.x-b.x,dy=a.y-b.y,dist=Math.hypot(dx,dy);
        if(dist<150){ctx.strokeStyle=`rgba(168,85,247,${(1-dist/150)*.19})`;ctx.lineWidth=.7;ctx.beginPath();ctx.moveTo(a.x,a.y);ctx.lineTo(b.x,b.y);ctx.stroke();}
      }
      for(const p of points){ctx.fillStyle='rgba(255,49,87,.62)';ctx.beginPath();ctx.arc(p.x,p.y,1.3,0,Math.PI*2);ctx.fill();}
      raf=requestAnimationFrame(draw);
    };
    resize();draw();window.addEventListener('resize',resize,{passive:true});
    document.addEventListener('visibilitychange',()=>{if(document.hidden)cancelAnimationFrame(raf);else if(!reduce)draw();});
  }
  // Accessible keyboard close for the existing project and document overlays.
  document.addEventListener('keydown',e=>{
    if(e.key==='Escape'){
      document.querySelectorAll('.show').forEach(el=>el.classList.remove('show'));
    }
  });
  // Add descriptive loading behavior to all portfolio imagery.
  document.querySelectorAll('img').forEach(img=>{img.loading='lazy';img.decoding='async';});
})();
