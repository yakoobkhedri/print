let size = Array.from(document.getElementsByClassName('size'));
let roo = Array.from(document.getElementsByClassName('roo'));
let sahafi = Array.from(document.getElementsByClassName('sahafi'));
let sahafitype = Array.from(document.getElementsByClassName('sahafitype'));
let jeld = Array.from(document.getElementsByClassName('jeld'));

size.forEach((item)=>{
    item.addEventListener('click', function () {
        size.forEach((items)=>{items.classList.remove('active')});
        item.classList.add('active');
    })
})
roo.forEach((item)=>{
    item.addEventListener('click', function () {
        roo.forEach((items)=>{items.classList.remove('active')});
        item.classList.add('active');
    })
})
sahafi.forEach((item)=>{
    item.addEventListener('click', function () {
        sahafi.forEach((items)=>{items.classList.remove('active')});
        item.classList.add('active');
    })
})
sahafitype.forEach((item)=>{
    item.addEventListener('click', function () {
        sahafitype.forEach((items)=>{items.classList.remove('active')});
        item.classList.add('active');
    })
})
jeld.forEach((item)=>{
    item.addEventListener('click', function () {
        jeld.forEach((items)=>{items.classList.remove('active')});
        item.classList.add('active');
    })
})