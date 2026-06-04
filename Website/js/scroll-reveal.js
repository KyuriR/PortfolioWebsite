// scroll-reveal.js
// Watches elements with the class 'reveal' and adds the class 'visible'
// when they scroll into view. CSS handles the actual fade-in animation.

// Get all elements that should animate in on scroll
var revealElements = document.querySelectorAll('.reveal');

// Create an IntersectionObserver to watch when elements enter the viewport
// threshold: 0.12 means the animation triggers when 12% of the element is visible
var observer = new IntersectionObserver(function (entries) {
    for (var i = 0; i < entries.length; i++) {
        var entry = entries[i];

        // If the element is visible on screen, add the visible class
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');

            // Stop watching this element once it has been revealed
            observer.unobserve(entry.target);
        }
    }
}, { threshold: 0.12 });

// Tell the observer to watch each reveal element
for (var i = 0; i < revealElements.length; i++) {
    observer.observe(revealElements[i]);
}