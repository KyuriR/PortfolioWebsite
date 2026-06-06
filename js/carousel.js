// carousel.js
// Controls the fan-style project carousel on the projects page
// Three slides are visible at once — the centre one is large, the two side ones are smaller
// Clicking a side slide brings it to the centre

// Get all slides and dot indicators
var slides = document.querySelectorAll('.fan-slide');
var dots = document.querySelectorAll('.fan-dot');
var prevBtn = document.getElementById('fan-prev');
var nextBtn = document.getElementById('fan-next');

// If there are no slides on this page, stop here
if (slides.length === 0) {
    // Do nothing - this script is not needed on this page
} else {
    var totalSlides = slides.length;
    var currentIndex = 0;

    // updateCarousel: positions all slides based on the current active index
    function updateCarousel() {
        for (var i = 0; i < slides.length; i++) {
            // Remove all position classes first
            slides[i].classList.remove('fan-active', 'fan-left', 'fan-right', 'fan-hidden');

            // Calculate how far this slide is from the active one
            var offset = i - currentIndex;

            // Wrap the offset so the carousel loops around
            if (offset > totalSlides / 2) {
                offset = offset - totalSlides;
            }
            if (offset < -totalSlides / 2) {
                offset = offset + totalSlides;
            }

            // Assign the correct class based on position
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

        // Update dot indicators to match the current slide
        for (var j = 0; j < dots.length; j++) {
            dots[j].classList.remove('active');
        }
        if (dots[currentIndex]) {
            dots[currentIndex].classList.add('active');
        }
    }

    // goTo: moves the carousel to a specific slide index
    function goTo(index) {
        // Use modulo to wrap around if index goes out of bounds
        currentIndex = ((index % totalSlides) + totalSlides) % totalSlides;
        updateCarousel();
    }

    // Previous button moves one slide to the left
    if (prevBtn) {
        prevBtn.addEventListener('click', function () {
            goTo(currentIndex - 1);
        });
    }

    // Next button moves one slide to the right
    if (nextBtn) {
        nextBtn.addEventListener('click', function () {
            goTo(currentIndex + 1);
        });
    }

    // Clicking a dot jumps directly to that slide
    for (var d = 0; d < dots.length; d++) {
        dots[d].addEventListener('click', function () {
            var dotIndex = parseInt(this.getAttribute('data-dot'));
            goTo(dotIndex);
        });
    }

    // Clicking a side slide brings it to the centre
    for (var s = 0; s < slides.length; s++) {
        slides[s].addEventListener('click', function () {
            // Only respond to clicks on slides that are not already active
            if (!this.classList.contains('fan-active')) {
                var slideIndex = parseInt(this.getAttribute('data-index'));
                goTo(slideIndex);
            }
        });
    }

    // Keyboard navigation - left and right arrow keys
    document.addEventListener('keydown', function (e) {
        if (e.key === 'ArrowLeft') {
            goTo(currentIndex - 1);
        }
        if (e.key === 'ArrowRight') {
            goTo(currentIndex + 1);
        }
    });

    // Run once on load to set the initial positions
    updateCarousel();
}