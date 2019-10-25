console.log("TESTING")

document.querySelector("#mob-nav-burger").addEventListener("click", () => toggleNavView("block"));
document.querySelector("#sidebar-close").addEventListener("click", () => toggleNavView("none"));

const toggleNavView = state => {
    document.querySelector(".sidebar").style.display = state;
    document.querySelector(".sidebar__right").style.display = state;
}

const dropdown_manager = (drp_dwn_btn, drp_dwn_con) => {
    const dropdown_container = document.querySelector(drp_dwn_con);

    dropdown_container.style.display =
        dropdown_container.style.display == "block" ? "none" : "block";
}

for (let i = 1; i <= 2; i++) {
    Array.from(document.getElementById(`dropdown-container-${i}`).children).forEach(elem => {
        elem.addEventListener('click', () => {
            document.querySelector(`#dropdown-button-${i} span:nth-child(1)`).textContent = elem.textContent;
            document.querySelector(`#dropdown-container-${i}`).style.display = "none";
        })
    });
}

if (document.documentElement.clientWidth <= 900) {
    document.querySelector(".testimonials__container").classList.add("siema")
}

new Siema({
    multipleDrag: false,
    loop: true,
    selector: '.siema',
    onChange: function() {
        console.log(this.currentSlide);
    }
});