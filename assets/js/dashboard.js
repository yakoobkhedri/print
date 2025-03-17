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

// upload

document.getElementById('fileInput').addEventListener('change', function(event) {
    const files = event.target.files;
    let fileList = document.getElementById('fileList');
    const maxSize = 500 * 1024 * 1024; // 500 مگابایت به بایت
    const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'image/jpeg'];

    // اگر fileList وجود ندارد، آن را ایجاد کنید
    if (!fileList) {
        fileList = document.createElement('div');
        fileList.id = 'fileList';
        fileList.className = 'bg-white mt-3 p-sm-3 p-2';
        document.querySelector('form').appendChild(fileList);
    }

    // پاک کردن محتوای قبلی fileList
    fileList.innerHTML = '';

    // اگر فایلی انتخاب نشده باشد، fileList را حذف کنید
    if (files.length === 0) {
        fileList.remove();
        return;
    }

    for (let i = 0; i < files.length; i++) {
        const file = files[i];

        // بررسی نوع فایل
        if (!allowedTypes.includes(file.type)) {
            alert(`نوع فایل "${file.name}" مجاز نیست. فقط فایل‌های PDF، Word و JPG قابل آپلود هستند.`);
            continue; // از ادامه کار برای این فایل صرف‌نظر می‌کنیم
        }

        // بررسی حجم فایل
        if (file.size > maxSize) {
            alert(`حجم فایل "${file.name}" بیشتر از 500 مگابایت است. لطفاً فایل کوچک‌تری انتخاب کنید.`);
            continue; // از ادامه کار برای این فایل صرف‌نظر می‌کنیم
        }

        // ایجاد عناصر برای نمایش فایل و پیشرفت
        const fileItem = document.createElement('div');
        fileItem.className = 'border border-dark rounded-5 px-3 py-2 mb-2';

        // بخش نام فایل و درصد پیشرفت
        const fileInfo = document.createElement('div');
        fileInfo.className = 'd-flex align-items-center justify-content-between gap-2 flex-wrap fs-12 fw-bold';

        const fileName = document.createElement('p');
        fileName.className = 'filename mb-0 flex-grow-1';
        fileName.textContent = file.name;

        const percentNumber = document.createElement('p');
        percentNumber.className = 'mb-0 flex-shrink-0 percentnumber';
        percentNumber.textContent = '0%';

        fileInfo.appendChild(fileName);
        fileInfo.appendChild(percentNumber);

        // نوار پیشرفت
        const progressBarContainer = document.createElement('div');
        progressBarContainer.className = 'flex-grow-1 border rounded-5 h-12 w-100 overflow-hidden';

        const progressBar = document.createElement('div');
        progressBar.className = 'bg-danger h-100 percentbar';
        progressBar.style.width = '0%';

        progressBarContainer.appendChild(progressBar);

        // دکمه حذف
        const removeButton = document.createElement('svg');
        removeButton.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
        removeButton.setAttribute('width', '18');
        removeButton.setAttribute('height', '20');
        removeButton.setAttribute('fill', 'currentColor');
        removeButton.setAttribute('class', 'remove bi bi-x-circle-fill cursor-pointer text-danger flex-shrink-0');
        removeButton.setAttribute('viewBox', '0 0 16 16');
        removeButton.innerHTML = '<path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293z"/>';

        // اضافه کردن رویداد حذف به دکمه
        removeButton.addEventListener('click', function() {
            fileList.removeChild(fileItem); // حذف فایل از لیست

            // اگر فایلی در لیست باقی نماند، fileList را حذف کنید
            if (fileList.children.length === 0) {
                fileList.remove();
            }
        });

        const progressContainer = document.createElement('div');
        progressContainer.className = 'd-flex align-items-center justify-content-between gap-2 fs-12 fw-bold mt-2';
        progressContainer.appendChild(progressBarContainer);
        progressContainer.appendChild(removeButton);

        fileItem.appendChild(fileInfo);
        fileItem.appendChild(progressContainer);

        fileList.appendChild(fileItem);

        // شبیه‌سازی پیشرفت آپلود
        simulateUpload(progressBar, percentNumber);
    }
});

function simulateUpload(progressBar, percentNumber) {
    let width = 0;
    const interval = setInterval(() => {
        if (width >= 100) {
            clearInterval(interval);
            percentNumber.textContent = '100% - آپلود کامل شد!';
        } else {
            width += 10; // افزایش درصد پیشرفت
            progressBar.style.width = width + '%';
            percentNumber.textContent = width + '%';
        }
    }, 500); // هر 500 میلی‌ثانیه درصد پیشرفت افزایش می‌یابد
}

// tabs

let tabs = Array.from(document.querySelectorAll('.tabs'));
let tabContent = Array.from(document.querySelectorAll('.tabContent > div'));


tabs.forEach((item) => {
  item.addEventListener('click', function() {
    tabs.forEach((items) => {items.classList.remove('active')});
      item.classList.add('active');
      let tabId = item.dataset.id;
      tabContent.forEach((content) => {
          let contentId = content.dataset.id;
          if (tabId === contentId) {
              content.style.display = 'block';
          } else {
            content.style.display = 'none';
          }
      })
  })
})