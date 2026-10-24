(function(){'use strict';
var d=document,root=d.documentElement;root.classList.add('js');
var reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
var fine=matchMedia('(hover:hover) and (pointer:fine)').matches;
var wide=function(){return innerWidth>600};
/* menu */
var b=d.getElementById('burger'),m=d.getElementById('menu'),nav=d.getElementById('nav'),bar=d.getElementById('progress');
function setMenu(o){m.classList.toggle('open',o);b.setAttribute('aria-expanded',o);b.setAttribute('aria-label',o?'Close menu':'Open menu')}
b.addEventListener('click',function(){setMenu(!m.classList.contains('open'))});
m.addEventListener('click',function(e){if(e.target.tagName==='A')setMenu(false)});
d.addEventListener('keydown',function(e){if(e.key==='Escape'){setMenu(false);b.focus()}});
/* reveal with stagger */
var items=[].slice.call(d.querySelectorAll('[data-r]'));
if('IntersectionObserver' in window&&!reduce){
  var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}})},{threshold:.12});
  items.forEach(function(el){var sib=el.parentElement.querySelectorAll(':scope > [data-r]');var i=[].indexOf.call(sib,el);el.style.transitionDelay=(Math.max(i,0)%4)*90+'ms';io.observe(el)});
}else items.forEach(function(el){el.classList.add('in')});
/* hero pointer tilt + orb parallax */
var hv=d.getElementById('heroVisual'),ht=d.getElementById('heroTilt'),orbs=[].slice.call(d.querySelectorAll('.orb'));
if(hv&&fine&&!reduce){
  hv.addEventListener('mousemove',function(e){var r=hv.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;ht.style.transform='rotateY('+(-14+x*12)+'deg) rotateX('+(6-y*10)+'deg)'});
  hv.addEventListener('mouseleave',function(){ht.style.transform=''});
  d.addEventListener('mousemove',function(e){var x=e.clientX/innerWidth-.5,y=e.clientY/innerHeight-.5;orbs.forEach(function(o,i){var k=(i?-1:1)*30;o.style.transform='translate('+x*k+'px,'+y*k+'px)'})});
}
/* card tilt */
if(fine&&!reduce){
  [].slice.call(d.querySelectorAll('.card,.tcard,.ch')).forEach(function(c){
    c.addEventListener('mousemove',function(e){var r=c.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;c.style.transform='perspective(900px) rotateY('+(x*7)+'deg) rotateX('+(-y*7)+'deg) translateY(-4px)'});
    c.addEventListener('mouseleave',function(){c.style.transform=''});
  });
  /* spotlight on dark sections */
  [].slice.call(d.querySelectorAll('.spot')).forEach(function(s){
    s.addEventListener('mousemove',function(e){var r=s.getBoundingClientRect();s.style.setProperty('--mx',(e.clientX-r.left)+'px');s.style.setProperty('--my',(e.clientY-r.top)+'px')});
  });
}
/* scroll: progress + depth on screens */
var deps=[].slice.call(d.querySelectorAll('.depth')),tick=false;
function upd(){
  tick=false;nav.classList.toggle('stuck',scrollY>10);
  var max=root.scrollHeight-innerHeight;bar.style.transform='scaleX('+(max>0?scrollY/max:0)+')';
  if(reduce||!wide())return;
  var h=innerHeight;
  deps.forEach(function(el){
    var r=el.getBoundingClientRect(),p=Math.max(-1,Math.min(1,(r.top+r.height/2-h/2)/h)),s=el.closest('.rev')?1:-1;
    el.style.setProperty('--rx',(p*9).toFixed(2)+'deg');
    el.style.setProperty('--ry',(s*7*(1-Math.abs(p)*.6)).toFixed(2)+'deg');
  });
}
addEventListener('scroll',function(){if(!tick){tick=true;requestAnimationFrame(upd)}},{passive:true});
addEventListener('resize',upd);upd();

/* brand tabs */
(function(){
  var mock=d.getElementById('brandMock');if(!mock)return;
  var tabs=[].slice.call(mock.querySelectorAll('[role=tab]')),panels=[].slice.call(mock.querySelectorAll('.bp'));
  function sel(i){tabs.forEach(function(t,k){t.setAttribute('aria-selected',k===i)});panels.forEach(function(pn,k){pn.hidden=k!==i;pn.classList.toggle('show',k===i)})}
  tabs.forEach(function(t,i){t.addEventListener('click',function(){sel(i)});t.addEventListener('keydown',function(e){var n=e.key==='ArrowRight'?1:e.key==='ArrowLeft'?-1:0;if(n){var j=(i+n+tabs.length)%tabs.length;sel(j);tabs[j].focus()}})});
})();


/* tilt-and-flip product card */
(function(){
  var scene=d.getElementById('flipScene');if(!scene)return;
  var B='https://www.realfoodblends.com/wp-content/uploads/',P=[{"n": "Select\u2122 Turkey, Pears & Pumpkin", "ing": ["Turkey", "Apple Juice", "Water", "Extra Virgin Olive Oil", "Gluten-free Rolled Oats", "Pears", "Pumpkin", "Squash"], "t": "2025/04/202464-Select-Turkey_Pears_and_Pumpkin_Front_Pouch_Photo.webp", "nu": "2025/04/Select-Turkey_nutritionfacts-HPturkey-2.webp", "u": "https://www.realfoodblends.com/shop/product/select-turkey-pears-pumpkin"}, {"n": "Select\u2122 Chicken, Zucchini & Potatoes", "ing": ["Chicken", "Apple Juice", "Water", "Zucchini", "Potatoes", "Extra Virgin Olive Oil", "Brown Rice", "Red Bell Peppers"], "t": "2025/04/202395-Select_Chicken_Zucchini__Potatoes_Front_Pouch.webp", "nu": "2025/04/CHICKEN-ZUCCHINI-POTATOES.webp", "u": "https://www.realfoodblends.com/shop/product/select-chicken-zucchini-potatoes"}, {"n": "Turkey, Sweet Potatoes & Peaches", "ing": ["Sweet Potatoes", "Peaches", "Turkey", "Water", "Olive Oil", "Green Beans"], "t": "2025/04/Turkey-Sweet-Potatoes-Peaches-Square-Tile.webp", "nu": "2025/04/Turkey-Sweet-Potatoes-Peaches-Nutrition-Facts.webp", "u": "https://www.realfoodblends.com/shop/product/turkey-sweet-potatoes-peaches"}, {"n": "Quinoa, Kale & Hemp", "ing": ["Water", "Dates", "Extra Virgin Olive Oil", "Apples", "Hemp Protein Powder", "Quinoa", "Kale"], "t": "2025/04/Quinoa-Kale-Hemp-Square-Tile.webp", "nu": "2025/04/Quinoa-Kale-Hemp-Nutrition-Facts.webp", "u": "https://www.realfoodblends.com/shop/product/quinoa-kale-hemp-12-meals"}, {"n": "Eggs, Apples & Oats", "ing": ["Apples", "Apple Juice", "Whole Eggs", "Zucchini", "Extra Virgin Olive Oil", "Gluten-Free Rolled Oats", "Water"], "t": "2025/04/Eggs-Apples-Oats-Square-Tile.webp", "nu": "2025/04/Eggs-Apples-Oats-Nutrition-Facts.webp", "u": "https://www.realfoodblends.com/shop/product/eggs-apples-oats"}, {"n": "Chicken, Carrots & Brown Rice", "ing": ["Orange Juice", "Chicken", "Carrots", "Water", "Brown Rice", "Extra Virgin Olive Oil", "Ginger"], "t": "2025/04/Chicken-Carrots-Brown-Rice-Square-Tile.webp", "nu": "2025/04/Chicken-Carrots-Brown-Rice-Nutrition-Facts.webp", "u": "https://www.realfoodblends.com/shop/product/orange-chicken-carrots-brown-rice"}, {"n": "Salmon, Oats & Squash", "ing": ["Apple Juice", "Squash", "Salmon", "Water", "Apples", "Gluten-Free Rolled Oats", "Extra Virgin Olive Oil", "Lemon Juice"], "t": "2025/04/Salmon-Oats-Squash-Square-Tile.webp", "nu": "2025/04/Salmon-Oats-Squash-Nutrition-Facts.webp", "u": "https://www.realfoodblends.com/shop/product/salmon-oats-squash"}, {"n": "Beef, Potatoes & Spinach", "ing": ["Pineapple Juice", "Beef", "Potatoes", "Water", "Carrots", "Extra Virgin Olive Oil", "Spinach"], "t": "2025/04/Beef-Potatoes-Spinach-Square-Tile.webp", "nu": "2025/04/Beef-Potatoes-Spinach-Nutrition-Facts.webp", "u": "https://www.realfoodblends.com/shop/product/beef-potatoes-spinach-12-meals"}, {"n": "Mini \u2013 Prunes, Pears & Pumpkin", "ing": ["Prune Puree", "Pear Puree", "Pumpkin Puree", "Water", "Flaxseed Oil"], "t": "2025/04/dsktp_mbl_product7.webp", "nu": "2025/04/dsktp_mbl_product7-nutritionfacts.webp", "u": "https://www.realfoodblends.com/shop/product/mini-prunes-pears-pumpkin-12-snacks"}];
  var flip=d.getElementById('flip'),fb=d.getElementById('shFlip'),thumbs=d.getElementById('shThumbs'),cur=0,on=false;
  function img(path,alt,eager){return '<div class="pack pack--tile"><span class="fb" aria-hidden="true"></span><img src="'+B+path+'" alt="'+alt+'" width="800" height="800" onload="this.parentNode.classList.add(\'ok\')" onerror="this.remove()"></div>'}
  function setFlip(v){on=v;flip.classList.toggle('flipped',v);fb.setAttribute('aria-pressed',v);fb.textContent=v?'Show pouch':'Show nutrition facts'}
  function show(i){
    cur=(i+P.length)%P.length;var p=P[cur];
    d.getElementById('shFront').innerHTML=img(p.t,p.n+' pouch (official image)');
    d.getElementById('shBack').innerHTML=p.nu?img(p.nu,p.n+' nutrition facts (official image)'):'';
    d.getElementById('shName').textContent=p.n;
    d.getElementById('shIng').innerHTML=p.ing.map(function(x){return '<li>'+x+'</li>'}).join('');
    d.getElementById('shLink').href=p.u;
    fb.disabled=!p.nu;setFlip(false);
    [].forEach.call(thumbs.children,function(t,k){t.setAttribute('aria-current',k===cur)});
  }
  P.forEach(function(p,i){var t=d.createElement('button');t.type='button';t.setAttribute('aria-label',p.n);t.innerHTML='<img src="'+B+p.t+'" alt="" width="52" height="52" loading="lazy" onerror="this.remove()">';t.addEventListener('click',function(){show(i)});thumbs.appendChild(t)});
  fb.addEventListener('click',function(){setFlip(!on)});
  d.getElementById('shPrev').addEventListener('click',function(){show(cur-1)});
  d.getElementById('shNext').addEventListener('click',function(){show(cur+1)});
  if(fine&&!reduce){
    scene.addEventListener('mousemove',function(e){var r=scene.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;flip.classList.add('live');flip.style.setProperty('--tx',(x*16)+'deg');flip.style.setProperty('--tyx',(-y*16)+'deg')});
    scene.addEventListener('mouseleave',function(){flip.style.setProperty('--tx','0deg');flip.style.setProperty('--tyx','0deg');setTimeout(function(){flip.classList.remove('live')},250)});
  }
  scene.addEventListener('keydown',function(){});
  show(0);
})();
})();
