import confetti from 'canvas-confetti';

export function fireCelebrationConfetti() {
  const count = 200;
  const defaults = {
    origin: { y: 0.7 },
    zIndex: 9999
  };

  function fire(particleRatio: number, opts: confetti.Options) {
    confetti({
      ...defaults,
      ...opts,
      particleCount: Math.floor(count * particleRatio)
    });
  }

  // Multi-tiered realistic fireworks burst
  fire(0.25, {
    spread: 26,
    startVelocity: 55,
    colors: ['#f43f5e', '#fbbf24', '#38bdf8', '#a855f7']
  });

  fire(0.2, {
    spread: 60,
    colors: ['#ec4899', '#f59e0b', '#10b981', '#ffffff']
  });

  fire(0.35, {
    spread: 100,
    decay: 0.91,
    scalar: 0.8,
    colors: ['#ffd700', '#ff69b4', '#00ffff', '#ff1493']
  });

  fire(0.1, {
    spread: 120,
    startVelocity: 25,
    decay: 0.92,
    scalar: 1.2,
    shapes: ['star']
  });

  fire(0.1, {
    spread: 120,
    startVelocity: 45,
    colors: ['#ffeaa7', '#a29bfe', '#ff7675']
  });
}

export function fireStarlightSparkles() {
  const duration = 2.5 * 1000;
  const animationEnd = Date.now() + duration;

  const frame = () => {
    confetti({
      particleCount: 2,
      angle: 60,
      spread: 55,
      origin: { x: 0, y: 0.6 },
      colors: ['#fbbf24', '#e0e7ff', '#38bdf8', '#c084fc'],
      shapes: ['star', 'circle'],
      zIndex: 9999
    });
    confetti({
      particleCount: 2,
      angle: 120,
      spread: 55,
      origin: { x: 1, y: 0.6 },
      colors: ['#fbbf24', '#e0e7ff', '#38bdf8', '#c084fc'],
      shapes: ['star', 'circle'],
      zIndex: 9999
    });

    if (Date.now() < animationEnd) {
      requestAnimationFrame(frame);
    }
  };

  frame();
}

export function firePetalShower() {
  const end = Date.now() + 2 * 1000;
  const colors = ['#f43f5e', '#fb7185', '#fecdd3', '#fda4af', '#fff1f2'];

  (function frame() {
    confetti({
      particleCount: 3,
      angle: 90,
      spread: 45,
      origin: { x: Math.random(), y: -0.1 },
      colors: colors,
      shapes: ['circle'],
      scalar: 1.4,
      drift: (Math.random() - 0.5) * 1.5,
      gravity: 0.6,
      zIndex: 9999
    });

    if (Date.now() < end) {
      requestAnimationFrame(frame);
    }
  })();
}
