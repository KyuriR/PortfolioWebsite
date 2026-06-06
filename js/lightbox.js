// lightbox.js
// Creates a lightbox overlay for viewing project images in full size
// Images can be opened by calling openLightbox(src, alt) from anywhere
// The lightbox can be closed by clicking the X button, clicking outside the image, or pressing Escape

// Create the overlay element and add it to the page
var overlay = document.createElement('div');
overlay.id = 'lightbox-overlay';
overlay.innerHTML = '<button id="lightbox-close" aria-label="Close lightbox">&times;</button>'
    + '<img src="" alt="" id="lightbox-img">';
document.body.appendChild(overlay);

// Get references to the image and close button inside the overlay
var lightboxImg = document.getElementById('lightbox-img');
var lightboxClose = document.getElementById('lightbox-close');

// openLightbox: shows the overlay with the given image
// This function is made global so it can be called from other scripts
function openLightbox(src, alt) {
    lightboxImg.src = src;
    lightboxImg.alt = alt || '';
    overlay.classList.add('open');
    // Prevent the page from scrolling while the lightbox is open
    document.body.style.overflow = 'hidden';
}

// closeLightbox: hides the overlay and clears the image
function closeLightbox() {
    overlay.classList.remove('open');
    document.body.style.overflow = '';

    // Clear the image source after the closing animation finishes
    setTimeout(function () {
        lightboxImg.src = '';
    }, 300);
}

// Close when the X button is clicked
lightboxClose.addEventListener('click', function () {
    closeLightbox();
});

// Close when the dark background area is clicked (but not the image itself)
overlay.addEventListener('click', function (e) {
    if (e.target === overlay) {
        closeLightbox();
    }
});

// Close when the Escape key is pressed
document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
        closeLightbox();
    }
});

// Make openLightbox available globally so project-modal.js can call it
window.openLightbox = openLightbox;