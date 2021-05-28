// Dropdown Functionality
const dropdown_manager = (drp_dwn_btn, drp_dwn_con) => {
    const dropdown_container = document.querySelector(drp_dwn_con);

    dropdown_container.style.display = dropdown_container.style.display == "block" ? "none" : "block";
}

for (let i = 1; i <= 2; i++) {
    Array.from(document.getElementById(`dropdown-container-${i}`).children).forEach(elem => {
        elem.addEventListener('click', () => {
            document.querySelector(`#dropdown-button-${i} span:nth-child(1)`).textContent = elem.textContent;
            document.querySelector(`#dropdown-container-${i}`).style.display = "none";
        })
    });
}

// Siema Initialization and Parameter Setting
if (document.documentElement.clientWidth <= 900) {
    document.querySelector(".testimonials__container").classList.add("siema")
}

new Siema({
    multipleDrag: false,
    loop: true,
    selector: '.siema',
    onChange: function() {
        const indicators = document.getElementsByClassName("testimonials__indicator");

        indicators[this.currentSlide].style.backgroundColor = "#E94F37";

        for (let x = 0; x < indicators.length; x++) {
            if (x == this.currentSlide) continue;

            indicators[x].style.backgroundColor = "#fff";
        }
    }
});