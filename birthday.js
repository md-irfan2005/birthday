/* ===== EDIT THIS PART ===== */
const NAME = "Shameela🫂";           // friend's name
const PHOTO = "10.jpeg";                 // photo shown on the greetings page
const WISH = "Happy Birthday my sweetheart 😘 may allah bless you abundantly ma ❤️ love you more dear 💖!";
// 3 real gifts: put your own image path in img (empty = placeholder)
const REAL = [
  {title:"Photo Frame 📸", img:"1.jpeg", msg:"Memories together!"},
  {title:"Photo Frame 📸", img:"2.jpeg", msg:"Memories together!"},
  {title:"Photo Frame 📸", img:"3.jpeg", msg:"Memories together!"}
];
const FAKE = [
  {e:"🧦", t:"A single old sock!", m:"Gotcha! Not this one."},
  {e:"🦆", t:"A rubber duck", m:"Quack! Try another box."},
  {e:"🥔", t:"One potato", m:"Happy Birthday… potato!"},
  {e:"🪨", t:"A very nice rock", m:"Rock solid prank."}
];
const PRANKS = ["PRANK! The box is empty! 😂 Go find the real gifts on the next page!"];
/* ========================== */

const ph = (c,e)=>'data:image/svg+xml;utf8,'+encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200"><rect width="200" height="200" fill="${c}"/><text x="100" y="120" font-size="80" text-anchor="middle">${e}</text></svg>`);
const $=s=>document.querySelector(s);
document.querySelectorAll('.nm').forEach(e=>e.textContent=NAME);
$('#nm1').textContent=NAME; $('#wishText').textContent=WISH;
const PH_PHOTO = ph('#ff9ac6','📸');
$('#photo').onerror=()=>{$('#photo').onerror=null;$('#photo').src=PH_PHOTO;};
if(PHOTO) $('#photo').src = PHOTO;

function go(n){document.querySelectorAll('.page').forEach(p=>p.classList.remove('on'));$('#p'+n).classList.add('on');}
document.querySelectorAll('[data-go]').forEach(b=>b.onclick=()=>go(b.dataset.go));
$('#n1').onclick=()=>go(2);

/* ---- background: mouse-reactive particles ---- */
const bg=$('#bg'),bx=bg.getContext('2d');let W,H,mx=innerWidth/2,my=innerHeight/2,P=[];
function size(){W=bg.width=innerWidth;H=bg.height=innerHeight;}
addEventListener('resize',size);size();
const cols=['#ff5fa2','#ffd23f','#5cf2c8','#9b7bff'];
for(let i=0;i<90;i++)P.push({x:Math.random()*W,y:Math.random()*H,r:2+Math.random()*7,vx:(Math.random()-.5)*.4,vy:-.2-Math.random()*.6,c:cols[i%4],s:Math.random()*6});
function mv(e){const t=e.touches?e.touches[0]:e;mx=t.clientX;my=t.clientY;const g=$('#glow');g.style.left=mx+'px';g.style.top=my+'px';}
addEventListener('mousemove',mv);addEventListener('touchmove',mv,{passive:true});
(function loop(t){bx.clearRect(0,0,W,H);
 for(const p of P){const dx=p.x-mx,dy=p.y-my,d=Math.hypot(dx,dy);
  if(d<150){p.x+=dx/d*(150-d)*.08;p.y+=dy/d*(150-d)*.08;}
  p.x+=p.vx+Math.sin(t/900+p.s)*.4;p.y+=p.vy;
  if(p.y<-20){p.y=H+20;p.x=Math.random()*W;} if(p.x<-20)p.x=W+20; if(p.x>W+20)p.x=-20;
  bx.globalAlpha=.55;bx.fillStyle=p.c;bx.beginPath();
  if(p.s>3){bx.arc(p.x,p.y,p.r,0,7);}else{bx.moveTo(p.x,p.y-p.r*1.4);bx.lineTo(p.x+p.r*1.2,p.y+p.r);bx.lineTo(p.x-p.r*1.2,p.y+p.r);}
  bx.fill();}
 requestAnimationFrame(loop);})(0);

/* ---- confetti ---- */
const fx=$('#fx'),fc=fx.getContext('2d');let C=[];
function fs(){fx.width=innerWidth;fx.height=innerHeight;}addEventListener('resize',fs);fs();
function burst(x,y,n=120,spread=1){for(let i=0;i<n;i++){const a=Math.random()*Math.PI*2,v=4+Math.random()*10*spread;
 C.push({x,y,vx:Math.cos(a)*v,vy:Math.sin(a)*v-6,w:6+Math.random()*8,h:4+Math.random()*6,r:Math.random()*6,vr:(Math.random()-.5)*.4,c:cols[i%4],l:140+Math.random()*80});}}
function popper(){burst(0,innerHeight,110);burst(innerWidth,innerHeight,110);burst(innerWidth/2,innerHeight*.4,80);}
(function fl(){fc.clearRect(0,0,fx.width,fx.height);
 C=C.filter(p=>p.l-->0);
 for(const p of C){p.vy+=.28;p.vx*=.99;p.x+=p.vx;p.y+=p.vy;p.r+=p.vr;fc.save();fc.translate(p.x,p.y);fc.rotate(p.r);fc.fillStyle=p.c;fc.globalAlpha=Math.min(1,p.l/40);fc.fillRect(-p.w/2,-p.h/2,p.w,p.h);fc.restore();}
 requestAnimationFrame(fl);})();

/* ---- page 1: blow candle, 5s timer, popper ---- */
let blown=false;
function blow(){
 if(blown)return;blown=true;
 $('#cakeWrap').classList.add('out');$('#blow').classList.add('hide');$('#tip').textContent='Wish made! 🌟';
 startCount();
}
function startCount(){
 const c=$('#count');c.classList.remove('hide');let n=5;
 const show=()=>{c.innerHTML='<span>'+n+'</span>';};show();
 const iv=setInterval(()=>{n--;if(n>0){show();return;}
  clearInterval(iv);c.classList.add('hide');$('#cakeWrap').classList.add('hide');$('#tip').classList.add('hide');
  $('#hb').classList.remove('hide');$('#n1').classList.remove('hide');
  popper();setTimeout(popper,700);setTimeout(popper,1500);},1000);
}
$('#blow').onclick=blow;$('#candle').onclick=blow;
$('#candle').onkeydown=e=>{if(e.key==='Enter'||e.key===' ')blow();};

/* ---- page 3: prank gift ---- */
$('#bigGift').onclick=function(){
 const g=this;g.classList.add('shake');$('#h3').textContent='Opening…';
 setTimeout(()=>{g.classList.remove('shake');g.classList.add('open');g.disabled=true;
  $('#h3').classList.add('hide');$('#t3').textContent='SURPRISE!';
  $('#prankTxt').textContent=PRANKS[Math.floor(Math.random()*PRANKS.length)];
  $('#prank').classList.remove('hide');$('#n3').classList.remove('hide');burst(innerWidth/2,innerHeight/2,100);},1200);
};
$('#n3').onclick=()=>{go(4);setupGifts();};

/* ---- page 4: 6 mystery gifts, 3 random real ---- */
const colors=['#ff5fa2','#5c8bff','#ff9a1f','#9b7bff','#26c28b','#ff5c5c'];
let foundN=0;
function shuffle(a){for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]];}return a;}
function popKiss(){
 const kiss=document.createElement('span');
 kiss.className='kiss-pop';kiss.setAttribute('aria-hidden','true');kiss.textContent='😘';
 document.body.appendChild(kiss);
 setTimeout(()=>kiss.remove(),1500);
}
function setupGifts(){
 foundN=0;$('#found').textContent=0;$('#again').classList.add('hide');
 const items=shuffle([...REAL.map((r,i)=>({real:1,r,i})),...shuffle([...FAKE]).slice(0,3).map(f=>({real:0,f}))]);
 const grid=$('#grid');grid.innerHTML='';
 items.forEach((it,k)=>{
  const b=document.createElement('button');b.className='gift';b.setAttribute('aria-label','Mystery gift '+(k+1));
  b.style.setProperty('--c',colors[k]);
  b.innerHTML='<span class="box"><i class="body"></i><i class="lid"></i><i class="bow"></i></span><span class="tag">Gift '+(k+1)+'</span>';
  b.onclick=()=>{if(b.classList.contains('open'))return;
   b.classList.add('open');if(it.real)popKiss();const r=b.getBoundingClientRect();burst(r.left+r.width/2,r.top+r.height/2,it.real?90:30,.6);
   const card=document.createElement('div');card.className='card';
   card.innerHTML=it.real?`<img src="${it.r.img||ph('#ffd23f','🎁')}" alt="${it.r.title}"><b>${it.r.title}</b>`:`<em>${it.f.e}</em><b>${it.f.t}</b>`;
   b.appendChild(card);
   if(it.real){foundN++;$('#found').textContent=foundN;
    setTimeout(()=>showModal(it.r.img||ph('#ffd23f','🎁'),it.r.title,it.r.msg,true),500);}
   else setTimeout(()=>showModal(null,it.f.t,it.f.m,false,it.f.e),500);
   if(foundN===3)setTimeout(()=>{$('#again').classList.remove('hide');popper();},1800);
  };
  grid.appendChild(b);
 });
}
function showModal(img,t,m,real,e){
 $('#mbox').innerHTML=(real?`<img src="${img}" alt="">`:`<em>${e}</em>`)+`<h3>${real?'🎉 Real gift! '+t:t}</h3><p>${m}</p><br><button class="btn" id="mc">${real?'Yay!':'Try again'}</button>`;
 $('#modal').classList.add('on');if(real)popper();
 $('#mc').onclick=()=>$('#modal').classList.remove('on');
}
$('#again').onclick=setupGifts;
