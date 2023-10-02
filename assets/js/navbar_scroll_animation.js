colorChange = () => {
    let element = document.querySelector('nav')

    let elementVisible = 450
    let scrollY = window.scrollY

    if (scrollY >= elementVisible) {
      element.classList.add("color_change")
    } else {
      element.classList.remove("color_change")
    }
}

window.addEventListener("scroll", colorChange)
colorChange()