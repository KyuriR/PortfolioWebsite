(function () {
  const canvas = document.getElementById('piano-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');

  let W, H;

  const WHITE_W = 90;
  const WHITE_H = 540;

  const BLACK_W = 52;
  const BLACK_H = 320;

  const WAVE_AMPLITUDE = 20;
  const WAVE_SPEED = 0.0009;
  const COL_PHASE = 0.35;

  let whiteKeys = [];
  let blackKeys = [];

  function resize() {
    W = canvas.width = window.innerWidth;
    H = canvas.height = window.innerHeight;
    buildKeyboard();
  }

  function buildKeyboard() {
    whiteKeys = [];
    blackKeys = [];

    const baseY = H * 0.38;
    const cols = Math.ceil(W / WHITE_W) + 4;

    for (let i = -2; i < cols; i++) {
      const x = i * WHITE_W;

      whiteKeys.push({
        index: i,
        x,
        y: baseY,
      });

      const pos = ((i % 7) + 7) % 7;

      // Black keys appear after C, D, F, G, A
      // No black key after E or B
      if ([0, 1, 3, 4, 5].includes(pos)) {
        blackKeys.push({
          index: i,
          x: x + WHITE_W,
          y: baseY,
        });
      }
    }
  }

  function drawWhiteKey(x, y, brightness, offset) {
    const grad = ctx.createLinearGradient(x, y, x, y + WHITE_H);
    grad.addColorStop(0, 'rgb(255,255,255)');
    grad.addColorStop(0.45, 'rgb(235,235,235)');
    grad.addColorStop(1, 'rgb(205,205,205)');

    ctx.fillStyle = grad;
    ctx.fillRect(x, y, WHITE_W, WHITE_H);

    ctx.strokeStyle = 'rgba(0,0,0,0.75)';
    ctx.lineWidth = 2;
    ctx.strokeRect(x, y, WHITE_W, WHITE_H);

    ctx.fillStyle = `rgba(255,255,255,${0.08 + brightness * 0.1})`;
    ctx.fillRect(x + 5, y + 5, WHITE_W - 10, WHITE_H * 0.35);
  }

  function drawBlackKey(x, y, brightness) {
    const tx = x - BLACK_W / 2;

    ctx.shadowColor = 'rgba(0,0,0,0.75)';
    ctx.shadowBlur = 14;
    ctx.shadowOffsetY = 7;

    const grad = ctx.createLinearGradient(tx, y, tx, y + BLACK_H);
    grad.addColorStop(0, 'rgb(45,45,45)');
    grad.addColorStop(0.18, 'rgb(12,12,12)');
    grad.addColorStop(1, 'rgb(0,0,0)');

    ctx.fillStyle = grad;
    ctx.fillRect(tx, y, BLACK_W, BLACK_H);

    ctx.shadowBlur = 0;
    ctx.shadowOffsetY = 0;

    ctx.fillStyle = `rgba(255,255,255,${0.05 + brightness * 0.06})`;
    ctx.fillRect(tx + 4, y + 4, BLACK_W - 8, BLACK_H * 0.18);

    ctx.strokeStyle = 'rgba(255,255,255,0.14)';
    ctx.lineWidth = 1;
    ctx.strokeRect(tx, y, BLACK_W, BLACK_H);
  }

  function loop(ts) {
    ctx.clearRect(0, 0, W, H);

    whiteKeys.forEach(key => {
      const phase = ts * WAVE_SPEED + key.index * COL_PHASE;
      const offset = Math.sin(phase) * WAVE_AMPLITUDE;
      const brightness = (Math.sin(phase) + 1) / 2;

      drawWhiteKey(key.x, key.y + offset, brightness);
    });

    blackKeys.forEach(key => {
      const phase = ts * WAVE_SPEED + key.index * COL_PHASE;
      const offset = Math.sin(phase) * WAVE_AMPLITUDE;
      const brightness = (Math.sin(phase) + 1) / 2;

      drawBlackKey(key.x, key.y + offset, brightness);
    });

    requestAnimationFrame(loop);
  }

  resize();
  window.addEventListener('resize', resize, { passive: true });
  requestAnimationFrame(loop);
})();