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
            + '<p>Neighbourhood Nightmare is a 2-player competitive arcade game adapted from a first-year roll-and-write board game. Two paranormal investigator teens race through a haunted neighbourhood map, visiting houses that trigger randomised ghost-themed minigames. The goal is to collect the most ghosts across five minigames — Ghost Shooter, Flappy Ghost, Ghost Breaker, Ghost Snake, and Pac Ghost — and ultimately reach and beat the final Ghost Kong level to win.</p>'
            + '<h4>Design &amp; Development</h4>'
            + '<p>Built in Unity with C#, the game features a fully explorable 2D pixel art map with three unlockable sections separated by bollards that increase in cost. Points scale per section — 1x, 1.5x, and 2x — rewarding players who push further into the neighbourhood. Each minigame was built independently by a team member and integrated into the main game using a persistent player management system with DontDestroyOnLoad to maintain scores across scene changes. Player movement uses WASD, with left click or K to interact.</p>'
            + '<h4>Challenges</h4>'
            + '<p>The biggest technical challenge was maintaining consistent score data across scene changes between the main map and each minigame. The team evaluated multiple approaches including JSON files, persistent GameObjects, and PlayerPrefs before settling on a DontDestroyOnLoad player manager. Individually, each minigame presented its own bugs — Ghost Shooter took multiple iterations before becoming stable, Ghost Snake had a collision issue where the snake could pass through the bottom border, and Flappy Ghost required tuning to reduce difficulty after playtest feedback flagged it as too punishing.</p>',
        tech: ['Unity', 'C#', 'Pixel Art'],
        github: 'https://github.com/R0GA/Tim-4-Game-Design-Exam-Project'
    },
    {
        num: 'Project 03',
        title: 'Patient Zero',
        screenshots: ['../assets/pictures/PatientZero.png','../assets/pictures/PatientZero2.png'],
        description: '<h4>Overview</h4>'
            + '<p>Patient Zero is a first-person horror game set in an abandoned research hospital. You wake up with fragmented memories as a former test subject of Project Patient Zero, a dark experiment designed to push the limits of the human mind. Something went horribly wrong. The experiment shattered your memory and left you exposed to a contagious disease that consumes the mind and body. The others fled. You were left behind. Now you must uncover the truth and escape before the infection takes hold and Patient Zero finds you.</p>'
            + '<h4>Design &amp; Development</h4>'
            + '<p>Built in Unity with C#, the game is a first-person survival horror experience with an emphasis on atmosphere and tension. The hospital environment was designed to feel claustrophobic and disorienting, reinforcing the narrative of a mind unravelling. Core mechanics include exploration, environmental storytelling through documents and terminals, and evading the infected Patient Zero enemy that hunts the player through the facility.</p>'
            + '<h4>Challenges</h4>'
            + '<p>The biggest challenge was creating a genuinely tense atmosphere within the constraints of a student project. Getting the enemy AI to feel threatening without being unfair required significant tuning of patrol behaviour and detection ranges. Building the first-person perspective and ensuring smooth player movement and interaction systems in Unity also required learning several new engine features outside of prior coursework.</p>',
        tech: ['C#', 'Unity'],
        github: 'https://github.com/KyuriR/CtrlAltDefeat'
    },
    {
        num: 'Project 04',
        title: 'Morabaraba',
        screenshots: ['../assets/pictures/Morabaraba.png','../assets/pictures/Morabaraba2.png'],
        description: '<h4>Overview</h4>'
            + '<p>Morabaraba is a digital implementation of the traditional South African strategy board game, also known as Umlabalaba. Built in Unity with C#, the game supports full online multiplayer via Photon PUN 2, where one player hosts a room and generates a room code for the second player to join, or both players use a quick join matchmaking system. The game enforces all official Morabaraba rules across four phases — placement, movement, flying, and mill removal — with automatic win condition detection.</p>'
            + '<h4>Design &amp; Development</h4>'
            + '<p>The system architecture separates the UI layer, game logic, and networking components. The GameManager script handles turn management, phase transitions, mill detection, and win conditions. Individual cow behaviour including drag-and-drop movement and phase-specific rules is managed through a dedicated Cow script. The project also features customizable board and piece themes, a move hint system that updates every 10 seconds during gameplay, an AI opponent with three difficulty levels, and a persistent leaderboard powered by LootLocker that tracks the top five players by win count.</p>'
            + '<h4>Challenges</h4>'
            + '<p>The biggest technical challenge was implementing online multiplayer. The project initially attempted Unity Netcode for GameObjects but encountered significant compatibility issues because the game logic had already been developed as a local single-player system before networking was added. The project then transitioned to Photon PUN 2 and briefly explored Mirror Networking before settling on Photon as the final solution. Key challenges included synchronising mill detection, cow removal, and phase transitions across clients using RPCs, and managing turn ownership to prevent simultaneous invalid actions. The AI system required implementing three distinct decision-making strategies — random selection for Easy, rule-based mill prioritisation for Medium, and Minimax with alpha-beta pruning for Hard.</p>',
        tech: ['C#', 'Unity', 'Minimax AI', 'Photon PUN 2', 'LootLocker'],
        github: 'https://github.com/KyuriR/ELEN3020Morabaraba'
    },
    {
        num: 'Project 05',
        title: 'Reverse 2048',
        screenshots: ['../assets/pictures/Reverse 2048.png','../assets/pictures/Reverse 2048 2.png'],
        description: '<h4>Overview</h4>'
            + '<p>Reverse 2048 is a strategic puzzle game and the inverse of the classic 2048 — instead of building tiles up to 2048, players must systematically reduce tiles down to the smallest possible value of 2. The project implemented and evaluated two competing AI algorithms designed to solve any valid board configuration across 3×3, 4×4, and 5×5 grids with initial tile values of 128, 256, or 512. The game ends when a tile reaches 2, the 1000-move limit is exceeded, or no valid merges remain.</p>'
            + '<h4>Design &amp; Development</h4>'
            + '<p>Built in C++ using CodeBlocks, the project implemented two distinct algorithmic strategies. Algorithm 1 uses a best-first search with depth-limited lookahead, evaluating moves based on maximum tile value, merge opportunities, and empty cell count. Algorithm 2 uses a heuristic greedy strategy that prioritises immediate merges and penalises high-value tiles for fast, lightweight decision-making. The architecture cleanly separates board logic from algorithmic decision-making, allowing either algorithm to operate on any valid configuration without modification.</p>'
            + '<h4>Challenges</h4>'
            + '<p>The core challenge was balancing strategic depth against computational efficiency under a strict 1000-move cap. Algorithm 1\'s lookahead was computationally heavy and occasionally redundant on smaller boards, sometimes overlooking immediate win opportunities. Algorithm 2 was fast and effective on 3×3 grids but lacked the long-term planning needed for complex 5×5 configurations. Debugging tile movement, merge logic, and the win and lose conditions required significant iteration. The project was completed over approximately 75 hours of combined development time.</p>',
        tech: ['C++', 'CodeBlocks', 'Best-First Search', 'Heuristic Algorithms'],
        github: 'https://github.com/KyuriR/Reverse2048'
    }
];

var modal = document.getElementById('project-modal');
var modalCloseBtn = document.getElementById('modal-close');

function openModal(index) {
    var project = projects[index];

    document.getElementById('modal-num').textContent   = project.num;
    document.getElementById('modal-title').textContent = project.title;

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
    document.getElementById('modal-desc').innerHTML = project.description;

    var techHTML = '';
    for (var j = 0; j < project.tech.length; j++) {
        techHTML += '<span class="carousel-tag">' + project.tech[j] + '</span>';
    }
    document.getElementById('modal-tech').innerHTML = techHTML;

    var actionsHTML = '<a href="' + project.github + '" target="_blank" class="btn btn-primary">View on GitHub</a>';
    actionsHTML += '<button class="btn btn-outline" id="modal-close-btn">Close</button>';
    document.getElementById('modal-actions').innerHTML = actionsHTML;

    document.getElementById('modal-close-btn').addEventListener('click', closeModal);

    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    modal.classList.remove('open');
    document.body.style.overflow = '';
}

var detailButtons = document.querySelectorAll('.fan-details-btn');
for (var b = 0; b < detailButtons.length; b++) {
    detailButtons[b].addEventListener('click', function (e) {
        e.stopPropagation();
        var projectIndex = parseInt(this.getAttribute('data-project'));
        openModal(projectIndex);
    });
}

modalCloseBtn.addEventListener('click', closeModal);
modal.addEventListener('click', function (e) {
    if (e.target === modal) {
        closeModal();
    }
});
document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && modal.classList.contains('open')) {
        closeModal();
    }
});