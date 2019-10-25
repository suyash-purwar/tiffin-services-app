console.log("TESTING")

if (document.documentElement.clientWidth <= 900) {
    document.querySelector(".testimonials__container").classList.add("siema")
}

new Siema({
    multipleDrag: false,
    loop: true,
    selector: '.siema'
})