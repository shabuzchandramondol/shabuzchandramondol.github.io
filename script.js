const body=document.body;
const themeToggle=document.getElementById("themeToggle");
const menuToggle=document.getElementById("menuToggle");
const nav=document.getElementById("nav");
const backTop=document.getElementById("backTop");
const progress=document.getElementById("scrollProgress");

if(localStorage.getItem("scm-theme")==="night") body.classList.add("night");

function updateTheme(){
  if(themeToggle) themeToggle.textContent=body.classList.contains("night")?"☀":"☾";
}
updateTheme();

if(themeToggle){
  themeToggle.addEventListener("click",()=>{
    body.classList.toggle("night");
    localStorage.setItem("scm-theme",body.classList.contains("night")?"night":"day");
    updateTheme();
  });
}
if(menuToggle && nav){
  menuToggle.addEventListener("click",()=>{
    nav.classList.toggle("open");
    menuToggle.textContent=nav.classList.contains("open")?"×":"☰";
  });
  document.querySelectorAll(".nav a").forEach(a=>a.addEventListener("click",()=>{
    nav.classList.remove("open");
    menuToggle.textContent="☰";
  }));
}

if("IntersectionObserver" in window){
  const observer=new IntersectionObserver(entries=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting){
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  },{threshold:.08});
  document.querySelectorAll(".reveal").forEach(el=>observer.observe(el));
}else{
  document.querySelectorAll(".reveal").forEach(el=>el.classList.add("visible"));
}

function scrollUI(){
  const max=document.documentElement.scrollHeight-window.innerHeight;
  if(progress) progress.style.width=(max>0?(window.scrollY/max)*100:0)+"%";
  if(backTop) {
    if(window.scrollY>500) backTop.classList.add("show");
    else backTop.classList.remove("show");
  }
}
window.addEventListener("scroll",scrollUI,{passive:true});
if(backTop) backTop.addEventListener("click",()=>window.scrollTo({top:0,behavior:"smooth"}));
const year=document.getElementById("year");
if(year) year.textContent=new Date().getFullYear();
scrollUI();
