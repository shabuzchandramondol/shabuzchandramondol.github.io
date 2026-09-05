const menuToggle=document.querySelector(".menu-toggle");
const nav=document.querySelector(".nav");
menuToggle?.addEventListener("click",()=>{
  const open=nav.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded",open);
  menuToggle.textContent=open?"×":"☰";
});
document.querySelectorAll(".nav a").forEach(a=>a.addEventListener("click",()=>nav.classList.remove("open")));

const observer=new IntersectionObserver(entries=>{
  entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add("visible");observer.unobserve(entry.target)}})
},{threshold:.12});
document.querySelectorAll(".reveal").forEach(el=>observer.observe(el));

const progress=document.querySelector(".progress");
window.addEventListener("scroll",()=>{
  const max=document.documentElement.scrollHeight-window.innerHeight;
  progress.style.width=(window.scrollY/max*100)+"%";
},{passive:true});

document.getElementById("year").textContent=new Date().getFullYear();

/* === Added: persistent Day / Night mode === */
const themeToggle = document.getElementById("themeToggle");
if (localStorage.getItem("scm-theme") === "night") {
  document.body.classList.add("night");
}
function updateThemeIcon(){
  if(themeToggle){
    themeToggle.textContent = document.body.classList.contains("night") ? "☀" : "☾";
  }
}
updateThemeIcon();
themeToggle?.addEventListener("click",()=>{
  document.body.classList.toggle("night");
  localStorage.setItem("scm-theme", document.body.classList.contains("night") ? "night" : "day");
  updateThemeIcon();
});
