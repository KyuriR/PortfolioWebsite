// skill-toggle.js
// Handles the flip interaction on skill cards
// Clicking "More Info" flips the card to show extra detail
// Clicking "Back" flips it back to the front

// Get all skill card wrappers
var skillCards = document.querySelectorAll('.skill-card-wrap');

// Loop through each card and attach click events
for (var i = 0; i < skillCards.length; i++) {
    var card = skillCards[i];

    var moreBtn = card.querySelector('.skill-more-btn');
    var backBtn = card.querySelector('.skill-back-close');

    // When "More Info" is clicked, flip the card to show the back
    if (moreBtn) {
        moreBtn.addEventListener('click', function (e) {
            // Stop the click from bubbling up to any parent elements
            e.stopPropagation();

            // Find the parent card and add the flipped class
            var parentCard = e.target.closest('.skill-card-wrap');
            parentCard.classList.add('flipped');
        });
    }

    // When "Back" is clicked, flip the card back to the front
    if (backBtn) {
        backBtn.addEventListener('click', function (e) {
            e.stopPropagation();

            // Find the parent card and remove the flipped class
            var parentCard = e.target.closest('.skill-card-wrap');
            parentCard.classList.remove('flipped');
        });
    }
}