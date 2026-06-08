var skillCards = document.querySelectorAll('.skill-card-wrap');

for (var i = 0; i < skillCards.length; i++) 
    {
    var card = skillCards[i];

    var moreBtn = card.querySelector('.skill-more-btn');
    var backBtn = card.querySelector('.skill-back-close');

    if (moreBtn) {
        moreBtn.addEventListener('click', function (e) 
        {
            e.stopPropagation();
            var parentCard = e.target.closest('.skill-card-wrap');
            parentCard.classList.add('flipped');
        });
    }

    if (backBtn) {
        backBtn.addEventListener('click', function (e)
         {
            e.stopPropagation();
            var parentCard = e.target.closest('.skill-card-wrap');
            parentCard.classList.remove('flipped');
        });
    }
}