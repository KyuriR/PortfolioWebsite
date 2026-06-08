var canvas = document.getElementById('piano-canvas');

if (canvas) {

    var ctx = canvas.getContext('2d');

    var W;
    var H;

    var WHITE_W = 90;
    var WHITE_H = 450;
    var BLACK_W = 52;
    var BLACK_H = 260;

    var WAVE_AMPLITUDE = 19;
    var WAVE_SPEED= 0.0009;
    var COL_PHASE= 0.35;

    var whiteKeys = [];
    var blackKeys = [];

    function resize() {
        W = canvas.width  = window.innerWidth;
        H = canvas.height = window.innerHeight;
        buildKeyboard();
    }

    function buildKeyboard() {
        whiteKeys = [];
        blackKeys = [];

        var baseY = H * 0.22;
        var cols  = Math.ceil(W / WHITE_W) + 4;

        for (var i = -2; i < cols; i++) {
            var x = i * WHITE_W;

            whiteKeys.push({ index: i, x: x, y: baseY });
            var pos = ((i % 7) + 7) % 7;

            if (pos === 0 || pos === 1 || pos === 3 || pos === 4 || pos === 5) {
                blackKeys.push({ index: i, x: x + WHITE_W, y: baseY });
            }
        }
    }

    function drawWhiteKey(x, y, brightness) {
        var grad = ctx.createLinearGradient(x, y, x, y + WHITE_H);
        grad.addColorStop(0,    'rgb(255, 255, 255)');
        grad.addColorStop(0.45, 'rgb(235, 235, 235)');
        grad.addColorStop(1,    'rgb(205, 205, 205)');

        ctx.fillStyle = grad;
        ctx.fillRect(x, y, WHITE_W, WHITE_H);

        ctx.strokeStyle = 'rgba(0, 0, 0, 0.75)';
        ctx.lineWidth   = 2;
        ctx.strokeRect(x, y, WHITE_W, WHITE_H);

        var sheenOpacity = 0.08 + brightness * 0.1;
        ctx.fillStyle = 'rgba(255, 255, 255, ' + sheenOpacity + ')';
        ctx.fillRect(x + 5, y + 5, WHITE_W - 10, WHITE_H * 0.35);
    }

    function drawBlackKey(x, y, brightness) {
        var tx = x - BLACK_W / 2;
        ctx.shadowColor   = 'rgba(0, 0, 0, 0.75)';
        ctx.shadowBlur    = 14;
        ctx.shadowOffsetY = 7;

        var grad = ctx.createLinearGradient(tx, y, tx, y + BLACK_H);
        grad.addColorStop(0,    'rgb(45, 45, 45)');
        grad.addColorStop(0.18, 'rgb(12, 12, 12)');
        grad.addColorStop(1,    'rgb(0, 0, 0)');

        ctx.fillStyle = grad;
        ctx.fillRect(tx, y, BLACK_W, BLACK_H);

        ctx.shadowBlur    = 0;
        ctx.shadowOffsetY = 0;

        var highlightOpacity = 0.05 + brightness * 0.06;
        ctx.fillStyle = 'rgba(255, 255, 255, ' + highlightOpacity + ')';
        ctx.fillRect(tx + 4, y + 4, BLACK_W - 8, BLACK_H * 0.18);

        ctx.strokeStyle = 'rgba(255, 255, 255, 0.14)';
        ctx.lineWidth   = 1;
        ctx.strokeRect(tx, y, BLACK_W, BLACK_H);
    }

    function loop(ts) {
        ctx.clearRect(0, 0, W, H);

        for (var i = 0; i < whiteKeys.length; i++) {
            var wKey       = whiteKeys[i];
            var wPhase     = ts * WAVE_SPEED + wKey.index * COL_PHASE;
            var wOffset    = Math.sin(wPhase) * WAVE_AMPLITUDE;
            var wBrightness = (Math.sin(wPhase) + 1) / 2;

            drawWhiteKey(wKey.x, wKey.y + wOffset, wBrightness);
        }

        for (var j = 0; j < blackKeys.length; j++) {
            var bKey        = blackKeys[j];
            var bPhase      = ts * WAVE_SPEED + bKey.index * COL_PHASE;
            var bOffset     = Math.sin(bPhase) * WAVE_AMPLITUDE;
            var bBrightness = (Math.sin(bPhase) + 1) / 2;

            drawBlackKey(bKey.x, bKey.y + bOffset, bBrightness);
        }

        requestAnimationFrame(loop);
    }

    resize();
    window.addEventListener('resize', resize);
    requestAnimationFrame(loop);

    window.addEventListener('scroll', function () {
        var hero = document.getElementById('hero');
        if (!hero) return;

        var progress = window.scrollY / (hero.offsetHeight * 0.6);
        if (progress > 1) progress = 1;
        if (progress < 0) progress = 0;

        canvas.style.opacity = 1 - progress * 0.85;

        var heroContent = hero.querySelector('.hero-content');
        if (heroContent) {
            heroContent.style.opacity = 1 - progress * 1.4;
            heroContent.style.transform = 'translateY(' + (progress * 30) + 'px)';
        }
    });

}