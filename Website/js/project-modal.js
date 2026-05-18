/* ============================================================
   project-modal.js — Project detail modal
   Opens on card click or "Details" button
   Screenshots inside the modal trigger the lightbox
   ============================================================ */

(function () {
  /* ── Project data ── */
  const projects = [
    {
      num:   'Project 01',
      title: 'This Portfolio',
      screenshots: ['🌐', '🎨'],
      screenshotBg: [
        'linear-gradient(135deg,#0a2540,#001a35)',
        'linear-gradient(135deg,#0a3d6b,#0a2540)',
      ],
      desc: `
        <h4>Overview</h4>
        <p>This portfolio website was designed and built from scratch for the Interactive Media 3A final exam. It represents the production release of the Product Requirements Document submitted as Assignment 1.</p>
        <h4>Design Concept</h4>
        <p>The guiding concept is "The Methodical Creative" — a portfolio that reflects both technical precision and personal creative identity. The piano-inspired animations on the homepage reference my background as a pianist and differentiate the site from generic developer portfolios.</p>
        <h4>Technical Approach</h4>
        <p>The site uses vanilla HTML, CSS, and JavaScript only — no frameworks or libraries. Each JavaScript interaction lives in its own file, demonstrating clean separation of concerns. The piano tile animation on the homepage is rendered entirely on HTML Canvas using a custom snake algorithm.</p>`,
      tech:   ['HTML5', 'CSS3', 'JavaScript', 'Canvas API', 'Git', 'GitHub Pages'],
      github: 'https://github.com',
    },
    {
      num:   'Project 02',
      title: 'Climate Data Dashboard',
      screenshots: ['📊', '📈'],
      screenshotBg: [
        'linear-gradient(135deg,#1a0a30,#0d0520)',
        'linear-gradient(135deg,#2a1050,#1a0a30)',
      ],
      desc: `
        <h4>Overview</h4>
        <p>An interactive data visualisation dashboard built for a second-year project. The dashboard presents South African climate data trends — rainfall, temperature, and drought indices — from 1990 to 2024.</p>
        <h4>Technical Approach</h4>
        <p>D3.js was used to build the charts, with custom tooltips, animated transitions between data views, and a filter system allowing users to select region and date range. The Canvas API handles the background particle animation that reflects climate intensity.</p>
        <h4>Challenges</h4>
        <p>The most complex challenge was normalising inconsistent source data from multiple government datasets and making the charts update responsively when the user applies filters.</p>`,
      tech:   ['JavaScript', 'D3.js', 'Canvas API', 'Python', 'Pandas'],
      github: 'https://github.com',
    },
    {
      num:   'Project 03',
      title: 'Maze Runner',
      screenshots: ['🎮', '🗺️'],
      screenshotBg: [
        'linear-gradient(135deg,#0a2010,#051505)',
        'linear-gradient(135deg,#154025,#0a2010)',
      ],
      desc: `
        <h4>Overview</h4>
        <p>Maze Runner is a 2D top-down puzzle game built for a C++ module project. The game features procedurally generated mazes, a player character with smooth movement, collectible keys, and enemy AI that uses a basic BFS pathfinding algorithm.</p>
        <h4>Technical Approach</h4>
        <p>Built in C++ using the SFML library for graphics, audio, and input handling. Mazes are generated using Recursive Backtracker (DFS). Enemy pathfinding uses BFS from enemy position to player position, recalculated every 10 frames.</p>
        <h4>Challenges</h4>
        <p>Getting smooth movement, collision detection, and enemy AI to work together without lag was the key engineering challenge. I profiled the code and refactored the collision system to use grid-based cell checks instead of per-pixel tests.</p>`,
      tech:   ['C++', 'SFML', 'Algorithms', 'Game Design'],
      github: 'https://github.com',
    },
    {
      num:   'Project 04',
      title: 'Community Lending App',
      screenshots: ['📱', '🔍'],
      screenshotBg: [
        'linear-gradient(135deg,#1a1000,#100800)',
        'linear-gradient(135deg,#3a2800,#1a1000)',
      ],
      desc: `
        <h4>Overview</h4>
        <p>A UX design case study for a peer-to-peer community lending application targeting underserved communities in South Africa. The project covered the full UX process from initial research through to a high-fidelity Figma prototype.</p>
        <h4>Research Process</h4>
        <p>I conducted desk research on informal lending patterns in SA communities, created two detailed personas, mapped user flows for key lending and borrowing scenarios, and produced mid-fidelity wireframes before moving to visual design.</p>
        <h4>Design Outcome</h4>
        <p>The final prototype demonstrates a trust-centred interface with clear status indicators, community reputation systems, and a simplified loan request flow designed for users with limited smartphone experience.</p>`,
      tech:  ['Figma', 'UX Research', 'User Personas', 'Wireframing', 'Prototyping'],
      figma: 'https://figma.com',
    },
    {
      num:   'Project 05',
      title: 'Python Data Scraper',
      screenshots: ['🐍', '📋'],
      screenshotBg: [
        'linear-gradient(135deg,#001828,#000d18)',
        'linear-gradient(135deg,#002030,#001828)',
      ],
      desc: `
        <h4>Overview</h4>
        <p>A Python command-line tool that scrapes, cleans, and visualises publicly available data from tech trend aggregators. The tool produces charts showing technology popularity trends over time.</p>
        <h4>Technical Approach</h4>
        <p>BeautifulSoup handles HTML parsing, Pandas manages data cleaning and aggregation, and Matplotlib generates the output charts. The tool is configurable via a simple JSON config file.</p>
        <h4>Use Case</h4>
        <p>Built out of personal curiosity to understand how to programmatically track technology trends. It reinforced my understanding of Python, data pipelines, and reproducible data processing.</p>`,
      tech:   ['Python', 'BeautifulSoup', 'Pandas', 'Matplotlib', 'CLI'],
      github: 'https://github.com',
    },
  ];

  /* ── Modal elements ── */
  const modal      = document.getElementById('project-modal');
  const modalClose = document.getElementById('modal-close');

  if (!modal) return;

  function openModal(idx) {
    const p = projects[idx];

    document.getElementById('modal-num').textContent   = p.num;
    document.getElementById('modal-title').textContent = p.title;

    /* Screenshots — clicking opens lightbox */
    document.getElementById('modal-screenshots').innerHTML = p.screenshots.map((icon, i) => {
      const svgSrc = `data:image/svg+xml,${encodeURIComponent(
        `<svg xmlns="http://www.w3.org/2000/svg" width="800" height="500">
          <rect width="800" height="500" fill="%23091222"/>
          <text x="400" y="250" font-family="serif" font-size="100"
                fill="%234fc3f7" text-anchor="middle" dominant-baseline="middle">${icon}</text>
        </svg>`
      )}`;
      return `
        <div class="modal-screenshot"
             style="background:${p.screenshotBg[i]}; cursor:zoom-in;"
             onclick="window.openLightbox('${svgSrc}', '${p.title} screenshot ${i + 1}')">
          <span style="font-size:3rem;">${icon}</span>
        </div>`;
    }).join('');

    document.getElementById('modal-desc').innerHTML = p.desc;

    document.getElementById('modal-tech').innerHTML = p.tech
      .map(t => `<span class="carousel-tag">${t}</span>`)
      .join('');

    let actions = '';
    if (p.github) actions += `<a href="${p.github}" target="_blank" class="btn btn-primary">View on GitHub</a>`;
    if (p.figma)  actions += `<a href="${p.figma}"  target="_blank" class="btn btn-primary">View in Figma</a>`;
    actions += `<button class="btn btn-outline" id="modal-close-btn">Close</button>`;
    document.getElementById('modal-actions').innerHTML = actions;

    document.getElementById('modal-close-btn')?.addEventListener('click', closeModal);

    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    modal.classList.remove('open');
    document.body.style.overflow = '';
  }

  function initModal() {
    /* Bind project cards */
    document.querySelectorAll('.project-card').forEach((card, i) => {
      card.querySelector('.btn-primary')?.addEventListener('click', e => {
        e.stopPropagation();
        openModal(i);
      });
      card.addEventListener('click', () => openModal(i));
    });

    modalClose?.addEventListener('click', closeModal);

    modal.addEventListener('click', e => {
      if (e.target === modal) closeModal();
    });

    document.addEventListener('keydown', e => {
      if (e.key === 'Escape' && modal.classList.contains('open')) closeModal();
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initModal);
  } else {
    initModal();
  }
})();
