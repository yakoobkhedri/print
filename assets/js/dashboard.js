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
// upload
// ابتدا PDF.js را تنظیم می‌کنیم
pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.10.377/pdf.worker.min.js';

document.getElementById('fileInput').addEventListener('change', function(event) {
    const files = event.target.files;
    let fileList = document.getElementById('fileList');
    const maxSize = 500 * 1024 * 1024;
    const allowedTypes = ['application/pdf', 'application/msword', 
                         'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 
                         'image/jpeg'];

    if (!fileList) {
        fileList = document.createElement('div');
        fileList.id = 'fileList';
        fileList.className = 'bg-white mt-3 p-sm-3 p-2';
        document.querySelector('form').appendChild(fileList);
    }

    if (files.length === 0) {
        // فقط اگر هیچ فایلی وجود ندارد، لیست را پاک کنید
        if (fileList.children.length === 0) {
            fileList.remove();
        }
        return;
    }

    // شمارنده را بر اساس تعداد فایل‌های موجود + 1 تنظیم می‌کنیم
    const existingFiles = fileList.querySelectorAll('.file-item');
    let fileNumber = existingFiles.length + 1;

    for (let i = 0; i < files.length; i++) {
        const file = files[i];
        
        if (!allowedTypes.includes(file.type)) {
            alert(`نوع فایل "${file.name}" مجاز نیست. فقط فایل‌های PDF، Word و JPG قابل آپلود هستند.`);
            continue;
        }

        if (file.size > maxSize) {
            alert(`حجم فایل "${file.name}" بیشتر از 500 مگابایت است. لطفاً فایل کوچک‌تری انتخاب کنید.`);
            continue;
        }

        const fileItem = document.createElement('div');
        fileItem.className = 'border border-dark rounded-5 px-3 py-2 mb-2';

        const fileInfo = document.createElement('div');
        fileInfo.className = 'd-flex align-items-center justify-content-between gap-2 flex-wrap fs-12 fw-bold';

        // نمایش نام فایل
        const fileName = document.createElement('p');
        fileName.className = 'filename mb-0 flex-grow-1';
        fileName.textContent = `${fileNumber}. ${truncateFileName(file.name, 3)}`;
        fileNumber++;

        // نمایش حجم فایل
        const fileSize = document.createElement('span');
        fileSize.className = 'file-size mx-2';
        fileSize.textContent = formatFileSize(file.size);

        // نمایش تعداد صفحات
        const pageCount = document.createElement('span');
        pageCount.className = 'page-count mx-2';
        pageCount.textContent = file.type === 'application/pdf' ? 'در حال محاسبه صفحات...' : '-';

        const percentNumber = document.createElement('p');
        percentNumber.className = 'mb-0 flex-shrink-0 percentnumber';
        percentNumber.textContent = '0%';

        fileInfo.appendChild(fileName);
        fileInfo.appendChild(fileSize);
        fileInfo.appendChild(pageCount);
        fileInfo.appendChild(percentNumber);

        // نوار پیشرفت
        const progressBarContainer = document.createElement('div');
        progressBarContainer.className = 'flex-grow-1 border rounded-5 h-12 w-100 overflow-hidden';

        const progressBar = document.createElement('div');
        progressBar.className = 'bg-danger h-100 percentbar';
        progressBar.style.width = '0%';

        progressBarContainer.appendChild(progressBar);

        // دکمه‌های کنترلی
        const cancelButton = createControlButton('bi-x-circle-fill', 'cancel');
        const deleteButton = createControlButton('bi-trash-fill', 'delete');
        deleteButton.style.display = 'none';

        let uploadInterval;

        // رویدادهای کنترلی
        cancelButton.addEventListener('click', () => cancelUpload(fileItem, uploadInterval, fileList));
        deleteButton.addEventListener('click', () => removeFile(fileItem, fileList));

        const progressContainer = document.createElement('div');
        progressContainer.className = 'd-flex align-items-center justify-content-between gap-2 fs-12 fw-bold mt-2';
        progressContainer.appendChild(progressBarContainer);
        progressContainer.appendChild(cancelButton);
        progressContainer.appendChild(deleteButton);

        fileItem.appendChild(fileInfo);
        fileItem.appendChild(progressContainer);

        fileList.appendChild(fileItem);

        // محاسبه تعداد صفحات برای PDF
        if (file.type === 'application/pdf') {
            getPdfPageCount(file)
                .then(count => {
                    pageCount.textContent = `${count} صفحه`;
                })
                .catch(error => {
                    console.error('خطا در خواندن PDF:', error);
                    pageCount.textContent = 'خطا در محاسبه';
                });
        }

        // شبیه‌سازی آپلود
        uploadInterval = simulateUpload(progressBar, percentNumber, cancelButton, deleteButton);
    }
});
// تابع کوتاه کردن نام فایل
function truncateFileName(name, maxWords = 3) {
    const words = name.split(/\s+/);
    return words.slice(0, maxWords).join(' ') + (words.length > maxWords ? '...' : '');
}

// در قسمت ایجاد نام فایل، این خط را تغییر دهید:
const fileName = document.createElement('p');
fileName.className = 'filename mb-0 flex-grow-1';
fileName.textContent = `${fileNumber}. ${truncateFileName(file.name)}`;
// تابع برای محاسبه تعداد صفحات PDF
function getPdfPageCount(file) {
    return new Promise((resolve, reject) => {
        const fileReader = new FileReader();
        
        fileReader.onload = function() {
            try {
                const typedarray = new Uint8Array(this.result);
                const loadingTask = pdfjsLib.getDocument(typedarray);
                
                loadingTask.promise.then(pdf => {
                    resolve(pdf.numPages);
                }).catch(reject);
            } catch (error) {
                reject(error);
            }
        };
        
        fileReader.onerror = reject;
        fileReader.readAsArrayBuffer(file);
    });
}

// توابع کمکی
function truncateFileName(name, maxWords = 3) {
    const words = name.split(/\s+/);
    return words.slice(0, maxWords).join(' ') + (words.length > maxWords ? '...' : '');
}

function formatFileSize(bytes) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

function createControlButton(iconClass, buttonClass) {
    const button = document.createElement('svg');
    button.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
    button.setAttribute('width', '18');
    button.setAttribute('height', '20');
    button.setAttribute('fill', 'currentColor');
    button.setAttribute('class', `${buttonClass} bi ${iconClass} cursor-pointer text-danger flex-shrink-0`);
    button.setAttribute('viewBox', '0 0 16 16');
    return button;
}

function cancelUpload(fileItem, interval, fileList) {
    clearInterval(interval);
    fileList.removeChild(fileItem);
    if (fileList.children.length === 0) fileList.remove();
}

function removeFile(fileItem, fileList) {
    fileList.removeChild(fileItem);
    if (fileList.children.length === 0) fileList.remove();
}

function simulateUpload(progressBar, percentNumber, cancelButton, deleteButton) {
    let width = 0;
    const interval = setInterval(() => {
        if (width >= 100) {
            clearInterval(interval);
            percentNumber.textContent = '100%';
            cancelButton.style.display = 'none';
            deleteButton.style.display = 'block';
        } else {
            width += 10;
            progressBar.style.width = width + '%';
            percentNumber.textContent = width + '%';
        }
    }, 500);
    return interval;
}
