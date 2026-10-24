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
})();
