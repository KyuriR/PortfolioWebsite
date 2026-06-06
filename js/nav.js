// nav.js
// Injects the navigation bar and footer into every page using JavaScript
// This means the nav HTML is never duplicated across pages

// Work out which page we are currently on
var path = window.location.pathname;
var currentPage = path.split('/').pop();

// If the path ends with '/', we are on the homepage (index.html)
if (currentPage === '') {
    currentPage = 'index.html';
}

// Check if we are at the root level or inside the pages folder
var isRoot = path.indexOf('/pages/') === -1;

// Define all navigation links
// href is the link destination, label is the text shown, id is used to mark the active page
var links = [
    { href: 'index.html',          rootHref: '../index.html',          label: 'Home',     id: 'index.html'    },
    { href: 'pages/about.html',    rootHref: '../pages/about.html',    label: 'About',    id: 'about.html'    },
    { href: 'pages/skills.html',   rootHref: '../pages/skills.html',   label: 'Skills',   id: 'skills.html'   },
    { href: 'pages/projects.html', rootHref: '../pages/projects.html', label: 'Projects', id: 'projects.html' },
    { href: 'pages/contact.html',  rootHref: '../pages/contact.html',  label: 'Contact',  id: 'contact.html'  }
];

// Build the list of nav link items as an HTML string
var navItems = '';

for (var i = 0; i < links.length; i++) {
    var link = links[i];

    // Pick the correct href depending on whether we are at root or in pages folder
    var href = isRoot ? link.href : link.rootHref;

    // Add the 'active' class to the link that matches the current page
    var activeClass = '';
    if (currentPage === link.id) {
        activeClass = 'active';
    }

    navItems += '<li><a href="' + href + '" class="' + activeClass + '">' + link.label + '</a></li>';
}

// Work out the correct logo link depending on where we are
var logoHref = isRoot ? 'index.html' : '../index.html';

// Build the full nav HTML
var navHTML = '<nav role="navigation" aria-label="Main navigation">'
    + '<a class="nav-logo" href="' + logoHref + '">Kyuri <span>Reddy</span></a>'
    + '<ul class="nav-links" id="nav-links-list">' + navItems + '</ul>'
    + '<button class="nav-hamburger" id="nav-hamburger" aria-label="Toggle menu" aria-expanded="false">'
    + '<span></span><span></span><span></span>'
    + '</button>'
    + '</nav>';

// Inject the nav into the page
var navContainer = document.getElementById('nav-container');
if (navContainer) {
    navContainer.innerHTML = navHTML;
}

// Hamburger menu toggle for mobile
var hamburger = document.getElementById('nav-hamburger');
var navList = document.getElementById('nav-links-list');

if (hamburger && navList) {
    hamburger.addEventListener('click', function () {
        // Toggle the open class to show or hide the menu
        navList.classList.toggle('open');

        // Update the aria-expanded attribute for accessibility
        var isOpen = navList.classList.contains('open');
        hamburger.setAttribute('aria-expanded', isOpen);
    });

    // Close the mobile menu when any nav link is clicked
    var navLinks = navList.querySelectorAll('a');
    for (var j = 0; j < navLinks.length; j++) {
        navLinks[j].addEventListener('click', function () {
            navList.classList.remove('open');
            hamburger.setAttribute('aria-expanded', false);
        });
    }
}

// Build footer links depending on location
var footerLinks = [
    { href: 'index.html',          rootHref: '../index.html',          label: 'Home'     },
    { href: 'pages/about.html',    rootHref: 'about.html',             label: 'About'    },
    { href: 'pages/skills.html',   rootHref: 'skills.html',            label: 'Skills'   },
    { href: 'pages/projects.html', rootHref: 'projects.html',          label: 'Projects' },
    { href: 'pages/contact.html',  rootHref: 'contact.html',           label: 'Contact'  }
];

var footerItems = '';
for (var k = 0; k < footerLinks.length; k++) {
    var fLink = footerLinks[k];
    var fHref = isRoot ? fLink.href : fLink.rootHref;
    footerItems += '<li><a href="' + fHref + '">' + fLink.label + '</a></li>';
}

// Inject footer content
var footerEl = document.querySelector('footer');
if (footerEl) {
    footerEl.innerHTML = '<ul class="footer-links">' + footerItems + '</ul>'
        + '<p>&copy; 2026 Kyuri Reddy</p>';
}