var slides = document.querySelectorAll('.fan-slide');
var dots = document.querySelectorAll('.fan-dot');
var prevBtn = document.getElementById('fan-prev');
var nextBtn = document.getElementById('fan-next');

var totalSlides = slides.length;
var currentIndex = 0;

function updateCarousel() {
    for (var i = 0; i < slides.length; i++) {
        slides[i].classList.remove('fan-active', 'fan-left', 'fan-right', 'fan-hidden');

        var offset = i - currentIndex;

        if (offset > totalSlides / 2) {
            offset = offset - totalSlides;
        }
        if (offset < -totalSlides / 2) {
            offset = offset + totalSlides;
        }

        if (offset === 0) {
            slides[i].classList.add('fan-active');
        } else if (offset === -1 || offset === -(totalSlides - 1)) {
            slides[i].classList.add('fan-left');
        } else if (offset === 1 || offset === totalSlides - 1) {
            slides[i].classList.add('fan-right');
        } else {
            slides[i].classList.add('fan-hidden');
        }
    }
    for (var j = 0; j < dots.length; j++) {
        dots[j].classList.remove('active');
    }
    if (dots[currentIndex]) {
        dots[currentIndex].classList.add('active');
    }
}

function goTo(index) {
    currentIndex = ((index % totalSlides) + totalSlides) % totalSlides;
    updateCarousel();
}

prevBtn.addEventListener('click', function () {
    goTo(currentIndex - 1);
});
nextBtn.addEventListener('click', function () {
    goTo(currentIndex + 1);
});

for (var d = 0; d < dots.length; d++) {
    dots[d].addEventListener('click', function () {
        var dotIndex = parseInt(this.getAttribute('data-dot'));
        goTo(dotIndex);
    });
}

// Clicking a side slide brings it to the centre
for (var s = 0; s < slides.length; s++) {
    slides[s].addEventListener('click', function () {
        if (!this.classList.contains('fan-active')) {
            var slideIndex = parseInt(this.getAttribute('data-index'));
            goTo(slideIndex);
        }
    });
}

// Keyboard navigation 
document.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowLeft') {
        goTo(currentIndex - 1);
    }
    if (e.key === 'ArrowRight') {
        goTo(currentIndex + 1);
    }
});

updateCarousel();