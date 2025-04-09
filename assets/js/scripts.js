// menu

let openmenu = document.getElementById('openmenu');
let openmenu2 = document.getElementById('openmenu2');

openmenu.addEventListener('click',function () {
  document.querySelector('.menu').classList.add('active');
  document.getElementById('overlay').classList.add('active');
})
openmenu2.addEventListener('click',function () {
  document.querySelector('.menu2').classList.add('active');
  document.getElementById('overlay2').classList.add('active');
})
document.getElementById('overlay').addEventListener('click',function () {
  document.querySelector('.menu').classList.remove('active');
  document.getElementById('overlay').classList.remove('active');
})
document.getElementById('overlay2').addEventListener('click',function () {
  document.querySelector('.menu2').classList.remove('active');
  document.getElementById('overlay2').classList.remove('active');
})
// swiper
var customer = new Swiper(".customer", {
  slidesPerView: 2,
  spaceBetween: 15,
  autoplay: true,
  breakpoints: {
    576: {
      slidesPerView: 3,
    },
  },
});
var blog = new Swiper(".blog", {
  slidesPerView: 1,
  spaceBetween: 30,
  autoplay: true,
  breakpoints: {
    576: {
      slidesPerView: 2,
    },
    992: {
      slidesPerView: 3,
    },
  },
});
var portfolio = new Swiper(".portfolio", {
  slidesPerView: 1,
  spaceBetween: 30,
  autoplay: true,
    breakpoints: {
      576: {
        slidesPerView: 2,
      },
      992: {
        slidesPerView: 3,
      },
      1200: {
        slidesPerView: 4,
      },
  },
});
// accordion

let accordionBtn = Array.from(document.getElementsByClassName('accordionBtn'));

accordionBtn.forEach(item => {
  item.addEventListener('click' , function () {
    item.classList.toggle('active');
    item.nextElementSibling.classList.toggle('active');
  })
});

// box

let box = Array.from(document.getElementsByClassName('box'));

box.forEach((item)=>{
  item.addEventListener('click', function () {
    box.forEach((items)=>{items.classList.remove('active')});
    item.classList.add('active');
  })
})