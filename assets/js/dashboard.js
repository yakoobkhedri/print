let size = Array.from(document.getElementsByClassName('size'));

size.forEach((item)=>{
    item.addEventListener('click', function () {
        size.forEach((items)=>{items.classList.remove('active')});
        item.classList.add('active');
    })
})