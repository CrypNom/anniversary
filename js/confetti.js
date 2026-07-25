/* ==========================================================================
   confetti.js — canvas confetti + fireworks for the Closing page.
   Two effects combined:
     - confettiBurst(): colorful rectangles fall & rotate (classic confetti)
     - fireworkBurst(): a particle ring expands + fades (firework pop)
   Runs on #celebration-canvas, auto-sized to the viewport.
   ========================================================================== */

(function () {
  const canvas = document.getElementById('celebration-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let W, H;
  function resize() {
    W = canvas.width = window.innerWidth * devicePixelRatio;
    H = canvas.height = window.innerHeight * devicePixelRatio;
    canvas.style.width = window.innerWidth + 'px';
    canvas.style.height = window.innerHeight + 'px';
    ctx.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0);
  }
  window.addEventListener('resize', resize);
  resize();

  const COLORS = ['#ff6fa5', '#b285ff', '#5fe1d6', '#ffe7d1', '#ffd9e8', '#fff'];
  let confetti = [];
  let fireworks = [];

  function makeConfetti(n) {
    for (let i = 0; i < n; i++) {
      confetti.push({
        x: Math.random() * window.innerWidth,
        y: -20 - Math.random() * 200,
        w: 6 + Math.random() * 6,
        h: 10 + Math.random() * 8,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        rot: Math.random() * 360,
        vRot: (Math.random() - 0.5) * 8,
        vy: 1.5 + Math.random() * 2.5,
        vx: (Math.random() - 0.5) * 1.6,
        shape: Math.random() > 0.5 ? 'rect' : 'heart',
      });
    }
  }

  function makeFirework(x, y) {
    const count = 32;
    const color = COLORS[Math.floor(Math.random() * COLORS.length)];
    for (let i = 0; i < count; i++) {
      const angle = (Math.PI * 2 * i) / count;
      const speed = 2 + Math.random() * 3;
      fireworks.push({
        x, y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        life: 1,
        color,
      });
    }
  }

  function drawHeart(x, y, size, color, rotDeg) {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate((rotDeg * Math.PI) / 180);
    ctx.fillStyle = color;
    ctx.beginPath();
    const s = size / 20;
    ctx.moveTo(0, 4 * s);
    ctx.bezierCurveTo(-10 * s, -6 * s, -4 * s, -14 * s, 0, -6 * s);
    ctx.bezierCurveTo(4 * s, -14 * s, 10 * s, -6 * s, 0, 4 * s);
    ctx.fill();
    ctx.restore();
  }

  function loop() {
    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

    confetti.forEach((c) => {
      c.x += c.vx; c.y += c.vy; c.rot += c.vRot;
      if (c.shape === 'rect') {
        ctx.save();
        ctx.translate(c.x, c.y);
        ctx.rotate((c.rot * Math.PI) / 180);
        ctx.fillStyle = c.color;
        ctx.fillRect(-c.w / 2, -c.h / 2, c.w, c.h);
        ctx.restore();
      } else {
        drawHeart(c.x, c.y, c.w * 2, c.color, c.rot);
      }
    });
    confetti = confetti.filter(c => c.y < window.innerHeight + 30);

    fireworks.forEach(f => {
      f.x += f.vx; f.y += f.vy; f.vy += 0.03; f.life -= 0.018;
      ctx.globalAlpha = Math.max(f.life, 0);
      ctx.fillStyle = f.color;
      ctx.beginPath();
      ctx.arc(f.x, f.y, 2.4, 0, Math.PI * 2);
      ctx.fill();
      ctx.globalAlpha = 1;
    });
    fireworks = fireworks.filter(f => f.life > 0);

    requestAnimationFrame(loop);
  }
  loop();

  // Initial celebration sequence
  function celebrate() {
    makeConfetti(140);
    let bursts = 0;
    const fwInterval = setInterval(() => {
      makeFirework(
        window.innerWidth * (0.2 + Math.random() * 0.6),
        window.innerHeight * (0.2 + Math.random() * 0.35)
      );
      bursts++;
      if (bursts >= 6) clearInterval(fwInterval);
    }, 500);
  }

  // expose for the "replay" button
  window.replayCelebration = celebrate;

  if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    celebrate();
  }
})();
