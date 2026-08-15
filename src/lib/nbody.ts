interface Body {
  x: number;
  y: number;
  vx: number;
  vy: number;
  mass: number;
  heavy: boolean;
}

export interface NBodyHandle {
  start: () => void;
  stop: () => void;
  destroy: () => void;
  renderStaticFrame: () => void;
}

const BODY_COUNT = 120;
const HEAVY_COUNT = 6;
const G = 220;
const SOFTENING = 24;
const MAX_SPEED = 60;
const DPR_CAP = 1.5;
const CURSOR_PULL = 900;
const CURSOR_RADIUS = 260;

function randomRange(min: number, max: number): number {
  return min + Math.random() * (max - min);
}

function createBodies(width: number, height: number): Body[] {
  const bodies: Body[] = [];
  for (let i = 0; i < BODY_COUNT; i++) {
    const heavy = i < HEAVY_COUNT;
    bodies.push({
      x: randomRange(0, width),
      y: randomRange(0, height),
      vx: randomRange(-6, 6),
      vy: randomRange(-6, 6),
      mass: heavy ? randomRange(14, 22) : randomRange(1, 3),
      heavy,
    });
  }
  return bodies;
}

export function createNBodyField(
  canvas: HTMLCanvasElement,
  options: { faintColor: string; accentColor: string },
): NBodyHandle {
  const ctx = canvas.getContext('2d');
  if (!ctx) {
    return {
      start: () => {},
      stop: () => {},
      destroy: () => {},
      renderStaticFrame: () => {},
    };
  }

  let width = 0;
  let height = 0;
  let dpr = 1;
  let bodies: Body[] = [];
  let rafId: number | null = null;
  let cursor: { x: number; y: number } | null = null;

  function resize() {
    const rect = canvas.getBoundingClientRect();
    dpr = Math.min(window.devicePixelRatio || 1, DPR_CAP);
    width = rect.width;
    height = rect.height;
    canvas.width = Math.round(width * dpr);
    canvas.height = Math.round(height * dpr);
    ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
    if (bodies.length === 0) {
      bodies = createBodies(width, height);
    }
  }

  function step() {
    for (let i = 0; i < bodies.length; i++) {
      const b = bodies[i];
      let fx = 0;
      let fy = 0;

      for (let j = 0; j < bodies.length; j++) {
        if (i === j) continue;
        const other = bodies[j];
        const dx = other.x - b.x;
        const dy = other.y - b.y;
        const distSq = dx * dx + dy * dy + SOFTENING * SOFTENING;
        const dist = Math.sqrt(distSq);
        const force = (G * other.mass) / distSq;
        fx += (force * dx) / dist;
        fy += (force * dy) / dist;
      }

      if (cursor) {
        const dx = cursor.x - b.x;
        const dy = cursor.y - b.y;
        const distSq = dx * dx + dy * dy + SOFTENING * SOFTENING;
        if (distSq < CURSOR_RADIUS * CURSOR_RADIUS) {
          const dist = Math.sqrt(distSq);
          const force = CURSOR_PULL / distSq;
          fx += (force * dx) / dist;
          fy += (force * dy) / dist;
        }
      }

      b.vx += fx * 0.016;
      b.vy += fy * 0.016;

      const speed = Math.sqrt(b.vx * b.vx + b.vy * b.vy);
      if (speed > MAX_SPEED) {
        b.vx = (b.vx / speed) * MAX_SPEED;
        b.vy = (b.vy / speed) * MAX_SPEED;
      }

      b.x += b.vx * 0.016;
      b.y += b.vy * 0.016;

      if (b.x < -20) b.x = width + 20;
      if (b.x > width + 20) b.x = -20;
      if (b.y < -20) b.y = height + 20;
      if (b.y > height + 20) b.y = -20;
    }
  }

  function draw() {
    ctx!.clearRect(0, 0, width, height);
    for (const b of bodies) {
      ctx!.beginPath();
      const radius = b.heavy ? 2.2 : 1.1;
      ctx!.fillStyle = b.heavy ? options.accentColor : options.faintColor;
      ctx!.arc(b.x, b.y, radius, 0, Math.PI * 2);
      ctx!.fill();

      if (b.heavy) {
        ctx!.beginPath();
        ctx!.fillStyle = options.accentColor;
        ctx!.globalAlpha = 0.12;
        ctx!.arc(b.x, b.y, radius * 5, 0, Math.PI * 2);
        ctx!.fill();
        ctx!.globalAlpha = 1;
      }
    }
  }

  function loop() {
    step();
    draw();
    rafId = requestAnimationFrame(loop);
  }

  function handlePointerMove(e: PointerEvent) {
    const rect = canvas.getBoundingClientRect();
    cursor = { x: e.clientX - rect.left, y: e.clientY - rect.top };
  }

  function handlePointerLeave() {
    cursor = null;
  }

  resize();
  window.addEventListener('resize', resize);
  window.addEventListener('pointermove', handlePointerMove);
  window.addEventListener('pointerleave', handlePointerLeave);

  return {
    start() {
      if (rafId === null) {
        rafId = requestAnimationFrame(loop);
      }
    },
    stop() {
      if (rafId !== null) {
        cancelAnimationFrame(rafId);
        rafId = null;
      }
    },
    destroy() {
      if (rafId !== null) cancelAnimationFrame(rafId);
      window.removeEventListener('resize', resize);
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerleave', handlePointerLeave);
    },
    renderStaticFrame() {
      step();
      draw();
    },
  };
}
