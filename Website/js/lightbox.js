/* ============================================================
   lightbox.js — Image lightbox overlay
   Usage: call openLightbox(src, alt) from anywhere
   Close: click overlay, click ×, or press Escape
   ============================================================ */

(function () {
  /* Build overlay once on load */
  const overlay = document.createElement('div');
  overlay.id = 'lightbox-overlay';
  overlay.innerHTML = `
    <button id="lightbox-close" aria-label="Close lightbox">&times;</button>
    <img src="" alt="" id="lightbox-img">
  `;
  document.body.appendChild(overlay);

  const img   = document.getElementById('lightbox-img');
  const close = document.getElementById('lightbox-close');

  function openLightbox(src, alt) {
    img.src = src;
    img.alt = alt || '';
    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    overlay.classList.remove('open');
    document.body.style.overflow = '';
    /* Clear src after transition so no flash on next open */
    setTimeout(() => { img.src = ''; }, 300);
  }

  close.addEventListener('click', closeLightbox);
  overlay.addEventListener('click', e => { if (e.target === overlay) closeLightbox(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeLightbox(); });

  /* Expose globally so other scripts can call it */
  window.openLightbox = openLightbox;
})();
