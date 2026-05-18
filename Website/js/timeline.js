/* ============================================================
   timeline.js — Interactive education timeline
   Clicking a timeline item expands it; clicking again collapses
   Only one item open at a time
   ============================================================ */

(function () {
  function initTimeline() {
    const items = document.querySelectorAll('.timeline-item');
    if (!items.length) return;

    items.forEach(item => {
      item.addEventListener('click', () => {
        const isActive = item.classList.contains('active');

        /* Close all */
        items.forEach(i => i.classList.remove('active'));

        /* Toggle clicked item */
        if (!isActive) item.classList.add('active');
      });
    });

    /* Open first item by default */
    items[0]?.classList.add('active');
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initTimeline);
  } else {
    initTimeline();
  }
})();
