var overlay = document.createElement('div');
overlay.id = 'lightbox-overlay';
overlay.innerHTML = '<button id="lightbox-close" aria-label="Close lightbox">&times;</button>'
    + '<img src="" alt="" id="lightbox-img">';
document.body.appendChild(overlay);

var lightboxImg = document.getElementById('lightbox-img');
var lightboxClose = document.getElementById('lightbox-close');

function openLightbox(src, alt) {
    lightboxImg.src = src;
    lightboxImg.alt = alt || '';
    overlay.classList.add('open');
    // Stop page from scrolling with box open
    document.body.style.overflow = 'hidden';
}

function closeLightbox() {
    overlay.classList.remove('open');
    document.body.style.overflow = '';
    setTimeout(function () {
        lightboxImg.src = '';
    }, 300);
}
lightboxClose.addEventListener('click', function () {
    closeLightbox();
});

overlay.addEventListener('click', function (e) {
    if (e.target === overlay) {
        closeLightbox();
    }
});
// use escape to close 
document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
        closeLightbox();
    }
});
window.openLightbox = openLightbox;