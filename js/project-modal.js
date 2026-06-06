
var projects = [
    {
        num: 'Project 01',
        title: 'Taxi Runner',
        screenshots: ['../assets/pictures/TaxiRunner.png','../assets/pictures/TaxiRunner2.png'],
        description: '<h4>Overview</h4>'
            + '<p>Taxi Runner is a fast-paced endless runner game set in the streets of Johannesburg, drawing inspiration from South Africa\'s iconic minibus taxi culture. The player controls a taxi navigating busy urban roads, dodging obstacles and collecting passengers to rack up points.</p>'
            + '<h4>Design &amp; Development</h4>'
            + '<p>The game was built in Unity using C#. Level design focused on creating a sense of speed and urban chaos while keeping controls intuitive. The scoring system rewards risk-taking — weaving through tight gaps yields higher multipliers.</p>'
            + '<h4>Challenges</h4>'
            + '<p>The main challenge was balancing difficulty progression to keep the game engaging without becoming frustrating. I implemented a dynamic obstacle spawn system that increases density and speed over time, using Unity\'s coroutine system to manage timing cleanly.</p>',
        tech: ['Unity', 'C#', 'Game Design', 'Level Design'],
        github: 'https://github.com/KyuriR'
    },
    {
        num: 'Project 02',
        title: 'Neighbourhood Nightmare',
        screenshots: ['../assets/pictures/NN.png','../assets/pictures/NN2.png'],
        description: '<h4>Overview</h4>'
            + '<p>Neighbourhood Nightmare is a top-down survival horror game where the player must escape a cursed residential neighbourhood. The atmosphere is built through dynamic lighting, sound design, and enemy AI that reacts to the player\'s movement and noise level.</p>'
            + '<h4>Design &amp; Development</h4>'
            + '<p>Built in Unity with C#, the game uses a sight and sound detection system for enemies — they respond to both line-of-sight and audio cues, forcing the player to think carefully about movement. The lighting system uses Unity\'s Universal Render Pipeline to create a dark, tense environment where visibility is limited.</p>'
            + '<h4>Challenges</h4>'
            + '<p>Implementing the dual-detection AI was the most complex part of the project. I designed a state machine with four states — Idle, Patrol, Alert, and Chase — that transitions based on detection thresholds. Getting these transitions to feel natural required significant playtesting and tuning.</p>',
        tech: ['Unity', 'C#', 'AI State Machine', 'URP Lighting', 'Horror Design'],
        github: 'https://github.com/KyuriR'
    },
    {
        num: 'Project 03',
        title: 'Project Zero',
        screenshots: ['../assets/pictures/PatientZero.png','../assets/pictures/PatientZero2.png'],
        description: '<h4>Overview</h4>'
            + '<p>Project Zero is a stealth-action prototype set in a near-future dystopia where surveillance systems and armed guards patrol a corporate facility. The player must infiltrate the building, retrieve classified data, and escape without being detected.</p>'
            + '<h4>Design &amp; Development</h4>'
            + '<p>Built in C++ using SFML, the game features a line-of-sight detection system where guards have a visible cone of vision that the player must avoid. A cover mechanic allows the player to duck behind objects, temporarily hiding from detection.</p>'
            + '<h4>Challenges</h4>'
            + '<p>Implementing accurate line-of-sight raycasting in SFML without a built-in physics engine required building a custom collision and visibility system from scratch. This was a significant engineering challenge that deepened my understanding of computational geometry and 2D spatial logic.</p>',
        tech: ['C++', 'SFML', 'Raycasting', 'Stealth Mechanics', 'Game Design'],
        github: 'https://github.com/KyuriR'
    },
    {
        num: 'Project 04',
        title: 'Morabaraba',
        screenshots: ['../assets/pictures/Morabaraba.png','../assets/pictures/Morabaraba2.png'],
        description: '<h4>Overview</h4>'
            + '<p>Morabaraba is a digital implementation of the traditional South African strategy board game, also known as Umlabalaba. Players place and move pieces to form "mills" — lines of three — which allow them to remove an opponent\'s piece. The last player with two or more pieces wins.</p>'
            + '<h4>Design &amp; Development</h4>'
            + '<p>Built in C# with Unity, the game supports two-player local play and a single-player mode against an AI opponent. The AI uses a minimax algorithm with alpha-beta pruning to evaluate board states and select optimal moves.</p>'
            + '<h4>Challenges</h4>'
            + '<p>Implementing minimax with alpha-beta pruning required careful design of the board evaluation function — assigning scores to mill formations, mobility, and piece count. Balancing AI difficulty so it was challenging but not unbeatable required multiple iterations of the heuristic weights.</p>',
        tech: ['C#', 'Unity', 'Minimax AI', 'Alpha-Beta Pruning', 'Board Game Design'],
        github: 'https://github.com/KyuriR/ELEN3020Morabaraba'
    }
];

// Get the modal element from the page
var modal = document.getElementById('project-modal');
var modalCloseBtn = document.getElementById('modal-close');

// Only set up the modal if it exists on this page
if (modal) {

    // openModal: fills the modal with project data and makes it visible
    function openModal(index) {
        var project = projects[index];
        if (!project) return;

        // Fill in the project number and title
        document.getElementById('modal-num').textContent = project.num;
        document.getElementById('modal-title').textContent = project.title;

        // Build the screenshots section
        // Each screenshot is clickable and opens the lightbox
        var screenshotsHTML = '';
        for (var i = 0; i < project.screenshots.length; i++) {
            var src = project.screenshots[i];
            screenshotsHTML += '<div class="modal-screenshot" style="cursor:zoom-in; overflow:hidden;"'
                + ' onclick="openLightbox(\'' + src + '\', \'' + project.title + ' screenshot ' + (i + 1) + '\')">'
                + '<img src="' + src + '" alt="' + project.title + ' screenshot ' + (i + 1) + '"'
                + ' style="width:100%; height:100%; object-fit:cover; display:block;">'
                + '</div>';
        }
        document.getElementById('modal-screenshots').innerHTML = screenshotsHTML;

        // Fill in the project description
        document.getElementById('modal-desc').innerHTML = project.description;

        // Build the tech tags
        var techHTML = '';
        for (var j = 0; j < project.tech.length; j++) {
            techHTML += '<span class="carousel-tag">' + project.tech[j] + '</span>';
        }
        document.getElementById('modal-tech').innerHTML = techHTML;

        // Build the action buttons
        var actionsHTML = '';
        if (project.github) {
            actionsHTML += '<a href="' + project.github + '" target="_blank" class="btn btn-primary">View on GitHub</a>';
        }
        actionsHTML += '<button class="btn btn-outline" id="modal-close-btn">Close</button>';
        document.getElementById('modal-actions').innerHTML = actionsHTML;

        // Attach click event to the close button inside the modal
        var innerCloseBtn = document.getElementById('modal-close-btn');
        if (innerCloseBtn) {
            innerCloseBtn.addEventListener('click', closeModal);
        }

        // Show the modal and prevent background scrolling
        modal.classList.add('open');
        document.body.style.overflow = 'hidden';
    }

    // closeModal: hides the modal and re-enables page scrolling
    function closeModal() {
        modal.classList.remove('open');
        document.body.style.overflow = '';
    }

    // Attach click events to all Details buttons in the fan carousel
    var detailButtons = document.querySelectorAll('.fan-details-btn');
    for (var b = 0; b < detailButtons.length; b++) {
        detailButtons[b].addEventListener('click', function (e) {
            // Stop the click from triggering the slide change in carousel.js
            e.stopPropagation();

            // Get the project index from the data-project attribute
            var projectIndex = parseInt(this.getAttribute('data-project'));
            openModal(projectIndex);
        });
    }

    // Close the modal when the X button is clicked
    if (modalCloseBtn) {
        modalCloseBtn.addEventListener('click', closeModal);
    }

    // Close the modal when the dark background area is clicked
    modal.addEventListener('click', function (e) {
        if (e.target === modal) {
            closeModal();
        }
    });

    // Close the modal when the Escape key is pressed
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && modal.classList.contains('open')) {
            closeModal();
        }
    });
}