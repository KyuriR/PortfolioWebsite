/* ============================================================
   nav.js — Reusable Navigation Injection (JS Interaction #1)
   Dynamically injects the nav so it's never duplicated in HTML
   ============================================================ */

(function () {
  /* Determine active page */
  const path = window.location.pathname;
  const page = path.split('/').pop() || 'index.html';

  const links = [
    { href: '../index.html',       label: 'Home',     id: 'index.html' },
    { href: '../pages/about.html', label: 'About',    id: 'about.html' },
    { href: '../pages/skills.html',label: 'Skills',   id: 'skills.html' },
    { href: '../pages/projects.html', label: 'Projects', id: 'projects.html' },
    { href: '../pages/contact.html', label: 'Contact', id: 'contact.html' },
  ];

  /* Fix hrefs when already at root */
  const isRoot = !path.includes('/pages/');
  const navLinks = links.map(l => ({
    ...l,
    href: isRoot ? l.href.replace('../', '') : l.href,
  }));

  const liItems = navLinks.map(l =>
    `<li><a href="${l.href}" class="${page === l.id ? 'active' : ''}">${l.label}</a></li>`
  ).join('');

  const navHTML = `
    <nav role="navigation" aria-label="Main navigation">
      <a class="nav-logo" href="${isRoot ? 'index.html' : '../index.html'}">
        Kyuri <span>Reddy</span>
      </a>
      <ul class="nav-links" id="nav-links-list">
        ${liItems}
      </ul>
      <button class="nav-hamburger" id="nav-hamburger" aria-label="Toggle menu" aria-expanded="false">
        <span></span><span></span><span></span>
      </button>
    </nav>
  `;

  const container = document.getElementById('nav-container');
  if (container) container.innerHTML = navHTML;

  /* Hamburger toggle */
  const hamburger = document.getElementById('nav-hamburger');
  const linksList = document.getElementById('nav-links-list');
  if (hamburger && linksList) {
    hamburger.addEventListener('click', () => {
      const open = linksList.classList.toggle('open');
      hamburger.setAttribute('aria-expanded', open);
    });
    /* Close on link click (mobile) */
    linksList.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        linksList.classList.remove('open');
        hamburger.setAttribute('aria-expanded', false);
      });
    });
  }

  /* Lightbox global setup */
  const overlay = document.createElement('div');
  overlay.id = 'lightbox-overlay';
  overlay.innerHTML = `<button id="lightbox-close" aria-label="Close lightbox">&times;</button><img src="" alt="Lightbox image" id="lightbox-img">`;
  document.body.appendChild(overlay);

  document.getElementById('lightbox-close').addEventListener('click', closeLightbox);
  overlay.addEventListener('click', e => { if (e.target === overlay) closeLightbox(); });

  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeLightbox(); });

  window.openLightbox = function (src, alt) {
    const img = document.getElementById('lightbox-img');
    img.src = src;
    img.alt = alt || '';
    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  };

  function closeLightbox() {
    overlay.classList.remove('open');
    document.body.style.overflow = '';
  }
})();
