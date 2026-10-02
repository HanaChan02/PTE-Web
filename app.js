const views = ["dashboard","practice","mock","progress"];
const labels = {dashboard:"Dashboard",practice:"Practice",mock:"Mock tests",progress:"My progress"};
const sidebar = document.getElementById("sidebar");
const crumb = document.getElementById("crumb");
function showView(id){
  if(!views.includes(id)) return;
  document.querySelectorAll(".view").forEach(v=>v.classList.toggle("active",v.id===id));
  document.querySelectorAll(".nav-item").forEach(b=>b.classList.toggle("active",b.dataset.view===id));
  crumb.textContent=labels[id];
  sidebar.classList.remove("open");
  window.scrollTo({top:0,behavior:"smooth"});
}
document.querySelectorAll("[data-view]").forEach(b=>b.addEventListener("click",()=>showView(b.dataset.view)));
document.querySelectorAll("[data-go]").forEach(b=>b.addEventListener("click",()=>showView(b.dataset.go)));
document.querySelectorAll(".skill-row").forEach(b=>b.addEventListener("click",()=>{
  showView("practice"); setFilter(b.dataset.skill);
}));
const filters=document.querySelectorAll(".filter");
function setFilter(category){
  filters.forEach(f=>f.classList.toggle("active",f.dataset.filter===category));
  document.querySelectorAll(".practice-card").forEach(card=>{
    card.style.display=(category==="All"||card.dataset.category===category)?"flex":"none";
  });
}
filters.forEach(f=>f.addEventListener("click",()=>setFilter(f.dataset.filter)));
const modal=document.getElementById("modal");
const modalTitle=document.getElementById("modalTitle");
const modalText=document.getElementById("modalText");
function openModal(title,description){
  modalTitle.textContent=title;
  modalText.textContent=description;
  modal.classList.add("show");modal.setAttribute("aria-hidden","false");
}
function closeModal(){modal.classList.remove("show");modal.setAttribute("aria-hidden","true")}
document.getElementById("modalClose").addEventListener("click",closeModal);
document.getElementById("modalOkay").addEventListener("click",closeModal);
modal.addEventListener("click",e=>{if(e.target===modal)closeModal()});
document.querySelectorAll(".start-task").forEach(b=>b.addEventListener("click",()=>openModal(b.dataset.task,"This practice activity is ready for its questions, answer input and feedback to be added. Your selection is saved only for this preview.")));
document.querySelectorAll(".mock-start").forEach(b=>b.addEventListener("click",()=>openModal(b.dataset.mock,"Test setup is the next step. The frontend is ready to connect to timed questions, navigation and a results screen.")));
document.getElementById("planBtn").addEventListener("click",()=>openModal("A simple study plan","Try setting a small daily goal: spend 15 minutes on one skill, review what you found difficult, and return tomorrow. Personal study plans can be added later."));
document.getElementById("menuBtn").addEventListener("click",()=>sidebar.classList.toggle("open"));
const today=document.getElementById("today");
today.textContent=new Intl.DateTimeFormat(undefined,{weekday:"short",month:"short",day:"numeric"}).format(new Date());
document.addEventListener("keydown",e=>{if(e.key==="Escape")closeModal()});
