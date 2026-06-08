var revealElements = document.querySelectorAll('.reveal');

window.addEventListener('scroll', function () {
    for (var i = 0; i < revealElements.length; i++) {
        var element = revealElements[i];
        var elementTop = element.getBoundingClientRect().top;

        if (elementTop < window.innerHeight - 80) {
            element.classList.add('visible');
        }
    }
});

for (var i = 0; i < revealElements.length; i++) {
    var elementTop = revealElements[i].getBoundingClientRect().top;
    if (elementTop < window.innerHeight - 80) {
        revealElements[i].classList.add('visible');
    }
}