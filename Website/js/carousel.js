/* ============================================================
   carousel.js — Project preview carousel
   Controls: prev/next buttons, dot indicators, auto-advance
   Auto-advance pauses on hover
   ============================================================ */

(function () {
  function initCarousel() {
    const track    = document.getElementById('carousel-track');
    const slides   = document.querySelectorAll('.carousel-slide');
    const dots     = document.querySelectorAll('.carousel-dot');
    const prevBtn  = document.getElementById('carousel-prev');
    const nextBtn  = document.getElementById('carousel-next');
    const container = document.getElementById('carousel');

    if (!track || !slides.length) return;

    let current  = 0;
    let autoplay = null;

    function goTo(n) {
      slides[current].classList.remove('active');
      dots[current]?.classList.remove('active');

      current = (n + slides.length) % slides.length;

      track.style.transform = `translateX(-${current * 100}%)`;
      slides[current].classList.add('active');
      dots[current]?.classList.add('active');
    }

    function startAutoplay() {
      autoplay = setInterval(() => goTo(current + 1), 5000);
    }

    function stopAutoplay() {
      clearInterval(autoplay);
    }

    prevBtn?.addEventListener('click', () => goTo(current - 1));
    nextBtn?.addEventListener('click', () => goTo(current + 1));

    dots.forEach(dot => {
      dot.addEventListener('click', () => goTo(Number(dot.dataset.dot)));
    });

    container?.addEventListener('mouseenter', stopAutoplay);
    container?.addEventListener('mouseleave', startAutoplay);

    startAutoplay();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initCarousel);
  } else {
    initCarousel();
  }
})();
