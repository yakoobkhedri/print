
// text slider

const texts = document.querySelectorAll("#textSlider p");
let currentIndex = 0;

function showNextText() {
    texts[currentIndex].classList.remove("active");
    currentIndex = (currentIndex + 1) % texts.length;
    texts[currentIndex].classList.add("active");
}

// نمایش اولین متن
texts[currentIndex].classList.add("active");

// تغییر متن هر 2 ثانیه
setInterval(showNextText, 2000);
