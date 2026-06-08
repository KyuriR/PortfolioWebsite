var timelineItems = document.querySelectorAll('.timeline-item');
for (var i = 0; i < timelineItems.length; i++) {
    timelineItems[i].addEventListener('click', function () {
        var isAlreadyOpen = this.classList.contains('active');
        for (var j = 0; j < timelineItems.length; j++) {
            timelineItems[j].classList.remove('active');
        }
        if (!isAlreadyOpen) {
            this.classList.add('active');
        }
    });
}