document.querySelector("#mob-nav-burger").addEventListener("click",()=>toggleNavView("block")),document.querySelector("#sidebar-close").addEventListener("click",()=>toggleNavView("none"));const toggleNavView=e=>{document.querySelector(".sidebar").style.display=e,document.querySelector(".sidebar__right").style.display=e},dropdown_manager=(e,t)=>{const o=document.querySelector(t);o.style.display="block"==o.style.display?"none":"block"};for(let e=1;e<=2;e++)Array.from(document.getElementById(`dropdown-container-${e}`).children).forEach(t=>{t.addEventListener("click",()=>{document.querySelector(`#dropdown-button-${e} span:nth-child(1)`).textContent=t.textContent,document.querySelector(`#dropdown-container-${e}`).style.display="none"})});document.documentElement.clientWidth<=900&&document.querySelector(".testimonials__container").classList.add("siema"),new Siema({multipleDrag:!1,loop:!0,selector:".siema",onChange:function(){const e=document.getElementsByClassName("testimonials__indicator");e[this.currentSlide].style.backgroundColor="#E94F37";for(let t=0;t<e.length;t++)t!=this.currentSlide&&(e[t].style.backgroundColor="#fff")}});