// timeline.js
// Makes the education timeline interactive
// Clicking a timeline item expands it to show more detail
// Clicking an already open item closes it
// Only one item can be open at a time

// Get all timeline items
var timelineItems = document.querySelectorAll('.timeline-item');

// Add a click event to each item
for (var i = 0; i < timelineItems.length; i++) {
    timelineItems[i].addEventListener('click', function () {
        // Check if this item is already open
        var isAlreadyOpen = this.classList.contains('active');

        // Close all timeline items first
        for (var j = 0; j < timelineItems.length; j++) {
            timelineItems[j].classList.remove('active');
        }

        // If the item was not already open, open it
        // If it was already open, it stays closed (toggled off)
        if (!isAlreadyOpen) {
            this.classList.add('active');
        }
    });
}