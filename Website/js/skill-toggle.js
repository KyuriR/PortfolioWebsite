/* ============================================================
   skill-toggle.js — Skill card flip interaction
   Flips a card to reveal extra info when "More Info" is clicked
   Unflips when "Back" is clicked
   ============================================================ */

(function () {
  function initSkillToggle() {
    document.querySelectorAll('.skill-card-wrap').forEach(wrap => {
      const moreBtn  = wrap.querySelector('.skill-more-btn');
      const backBtn  = wrap.querySelector('.skill-back-close');

      if (moreBtn) {
        moreBtn.addEventListener('click', e => {
          e.stopPropagation();
          wrap.classList.add('flipped');
        });
      }

      if (backBtn) {
        backBtn.addEventListener('click', e => {
          e.stopPropagation();
          wrap.classList.remove('flipped');
        });
      }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initSkillToggle);
  } else {
    initSkillToggle();
  }
})();
