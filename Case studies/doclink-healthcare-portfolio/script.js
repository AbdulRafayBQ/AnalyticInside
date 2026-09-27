
const observer=new IntersectionObserver(entries=>{
  entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add('visible')})
},{threshold:.12});
document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));

const lightbox=document.querySelector('.lightbox');
const img=lightbox.querySelector('img');
document.querySelectorAll('.showcase').forEach(card=>{
  card.addEventListener('click',()=>{
    img.src=card.dataset.src;
    lightbox.classList.add('open');
    lightbox.setAttribute('aria-hidden','false');
  });
});
function closeBox(){
  lightbox.classList.remove('open');
  lightbox.setAttribute('aria-hidden','true');
  img.src='';
}
lightbox.querySelector('button').addEventListener('click',closeBox);
lightbox.addEventListener('click',e=>{if(e.target===lightbox)closeBox()});
document.addEventListener('keydown',e=>{if(e.key==='Escape')closeBox()});
