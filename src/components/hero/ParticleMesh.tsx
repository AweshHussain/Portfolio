import React, { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  baseRadius: number;
  isAccent: boolean;
  dispX: number;
  dispY: number;
  dispVx: number;
  dispVy: number;
}

interface ParticleMeshProps {
  className?: string;
}

export const ParticleMesh: React.FC<ParticleMeshProps> = ({ className = '' }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    // Check media queries
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isTouch = window.matchMedia('(pointer: coarse)').matches;

    let width = 0;
    let height = 0;
    let dpr = 1;
    let animationFrameId: number | null = null;
    let isVisible = true;

    // Mouse coordinates in local canvas space
    const mouse = {
      x: -9999,
      y: -9999,
      targetX: -9999,
      targetY: -9999,
      active: false,
    };

    // Theme detection
    let isDark =
      document.documentElement.classList.contains('dark') ||
      document.documentElement.getAttribute('data-theme') === 'dark';

    const observerTheme = new MutationObserver(() => {
      isDark =
        document.documentElement.classList.contains('dark') ||
        document.documentElement.getAttribute('data-theme') === 'dark';
      if (prefersReducedMotion) {
        drawStatic();
      }
    });

    observerTheme.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class', 'data-theme'],
    });

    let particles: Particle[] = [];

    const getParticleCount = (w: number, h: number): { count: number; maxDist: number } => {
      const area = w * h;
      if (w < 640) {
        // Mobile
        return { count: Math.min(32, Math.max(18, Math.floor(area / 18000))), maxDist: 85 };
      } else if (w < 1024) {
        // Tablet
        return { count: Math.min(50, Math.max(28, Math.floor(area / 20000))), maxDist: 105 };
      } else {
        // Desktop
        return { count: Math.min(75, Math.max(45, Math.floor(area / 22000))), maxDist: 125 };
      }
    };

    const initParticles = () => {
      const { count } = getParticleCount(width, height);
      particles = [];

      for (let i = 0; i < count; i++) {
        // Subtle drift speed (0.12 - 0.28 px/frame)
        const angle = Math.random() * Math.PI * 2;
        const speed = 0.12 + Math.random() * 0.18;

        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          baseRadius: 1.1 + Math.random() * 0.9,
          // ~14% of particles are terracotta accents
          isAccent: Math.random() < 0.14,
          dispX: 0,
          dispY: 0,
          dispVx: 0,
          dispVy: 0,
        });
      }
    };

    const resize = () => {
      const rect = container.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      dpr = Math.min(window.devicePixelRatio || 1, 2);

      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);

      initParticles();

      if (prefersReducedMotion) {
        drawStatic();
      }
    };

    const resizeObserver = new ResizeObserver(() => {
      resize();
    });
    resizeObserver.observe(container);

    // Pointer event handlers on the hero container
    const handlePointerMove = (e: PointerEvent) => {
      if (isTouch) return;
      const rect = container.getBoundingClientRect();
      mouse.targetX = e.clientX - rect.left;
      mouse.targetY = e.clientY - rect.top;
      mouse.active = true;
    };

    const handlePointerLeave = () => {
      mouse.targetX = -9999;
      mouse.targetY = -9999;
      mouse.active = false;
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    document.addEventListener('pointerleave', handlePointerLeave);

    // Intersection Observer to stop loop when scrolled out of view
    const intersectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          isVisible = entry.isIntersecting;
          if (isVisible && !animationFrameId && !prefersReducedMotion) {
            lastTime = performance.now();
            animationFrameId = requestAnimationFrame(animate);
          }
        });
      },
      { threshold: 0.05 }
    );
    intersectionObserver.observe(container);

    // Visibility change handler (tab switch)
    const handleVisibilityChange = () => {
      if (document.hidden) {
        isVisible = false;
      } else {
        isVisible = true;
        if (!animationFrameId && !prefersReducedMotion) {
          lastTime = performance.now();
          animationFrameId = requestAnimationFrame(animate);
        }
      }
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    // Render pass
    const render = () => {
      ctx.clearRect(0, 0, width, height);

      const { maxDist } = getParticleCount(width, height);
      const maxDistSq = maxDist * maxDist;

      // Color scheme tokens
      const nodeColorStandard = isDark ? 'rgba(234, 230, 223, 0.22)' : 'rgba(60, 56, 50, 0.18)';
      const nodeColorAccent = isDark ? 'rgba(201, 85, 50, 0.70)' : 'rgba(178, 67, 34, 0.65)';
      const nodeGlowAccent = isDark ? 'rgba(201, 85, 50, 0.22)' : 'rgba(178, 67, 34, 0.16)';

      const lineBaseStandard = isDark ? '234, 230, 223' : '60, 56, 50';
      const lineBaseAccent = isDark ? '201, 85, 50' : '178, 67, 34';
      const maxLineAlpha = isDark ? 0.14 : 0.11;

      const numParticles = particles.length;

      // 1. Draw connecting lines between nearby particles
      for (let i = 0; i < numParticles; i++) {
        const p1 = particles[i];
        const p1X = p1.x + p1.dispX;
        const p1Y = p1.y + p1.dispY;

        for (let j = i + 1; j < numParticles; j++) {
          const p2 = particles[j];
          const p2X = p2.x + p2.dispX;
          const p2Y = p2.y + p2.dispY;

          const dx = p2X - p1X;
          const dy = p2Y - p1Y;
          const distSq = dx * dx + dy * dy;

          if (distSq < maxDistSq) {
            const dist = Math.sqrt(distSq);
            const ratio = 1 - dist / maxDist;
            const alpha = ratio * ratio * maxLineAlpha;

            const isAccentLine = p1.isAccent || p2.isAccent;
            const base = isAccentLine ? lineBaseAccent : lineBaseStandard;

            ctx.beginPath();
            ctx.moveTo(p1X, p1Y);
            ctx.lineTo(p2X, p2Y);
            ctx.strokeStyle = `rgba(${base}, ${alpha.toFixed(3)})`;
            ctx.lineWidth = 0.75;
            ctx.stroke();
          }
        }
      }

      // 2. Draw nodes
      for (let i = 0; i < numParticles; i++) {
        const p = particles[i];
        const posX = p.x + p.dispX;
        const posY = p.y + p.dispY;

        if (p.isAccent) {
          // Subtle halo glow for accent terracotta nodes
          ctx.beginPath();
          ctx.arc(posX, posY, p.baseRadius * 2.2, 0, Math.PI * 2);
          ctx.fillStyle = nodeGlowAccent;
          ctx.fill();

          ctx.beginPath();
          ctx.arc(posX, posY, p.baseRadius, 0, Math.PI * 2);
          ctx.fillStyle = nodeColorAccent;
          ctx.fill();
        } else {
          ctx.beginPath();
          ctx.arc(posX, posY, p.baseRadius, 0, Math.PI * 2);
          ctx.fillStyle = nodeColorStandard;
          ctx.fill();
        }
      }
    };

    const drawStatic = () => {
      render();
    };

    // Animation loop
    let lastTime = performance.now();
    const animate = (currentTime: number) => {
      if (!isVisible) {
        animationFrameId = null;
        return;
      }

      const dt = Math.min((currentTime - lastTime) / 16.667, 2.5); // normalized frame delta
      lastTime = currentTime;

      // Smooth mouse interpolation for silk-smooth cursor ripple
      if (mouse.active) {
        mouse.x += (mouse.targetX - mouse.x) * 0.15;
        mouse.y += (mouse.targetY - mouse.y) * 0.15;
      } else {
        mouse.x = -9999;
        mouse.y = -9999;
      }

      const cursorRadius = 160;
      const cursorRadiusSq = cursorRadius * cursorRadius;

      // Update particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Ambient gentle drift
        p.x += p.vx * dt;
        p.y += p.vy * dt;

        // Soft screen wrap around boundaries
        if (p.x < -20) p.x = width + 20;
        else if (p.x > width + 20) p.x = -20;
        if (p.y < -20) p.y = height + 20;
        else if (p.y > height + 20) p.y = -20;

        // Cursor repulsion & spring displacement physics
        if (!isTouch && mouse.active) {
          const dx = p.x + p.dispX - mouse.x;
          const dy = p.y + p.dispY - mouse.y;
          const distSq = dx * dx + dy * dy;

          if (distSq < cursorRadiusSq && distSq > 1) {
            const dist = Math.sqrt(distSq);
            // Non-linear falloff for gentle, natural displacement
            const force = Math.pow(1 - dist / cursorRadius, 1.8) * 22;
            const targetDispX = (dx / dist) * force;
            const targetDispY = (dy / dist) * force;

            // Push displacement towards target
            p.dispVx += (targetDispX - p.dispX) * 0.18;
            p.dispVy += (targetDispY - p.dispY) * 0.18;
          }
        }

        // Elastic spring back to neutral position (damping & spring restitution)
        p.dispVx += -p.dispX * 0.055;
        p.dispVy += -p.dispY * 0.055;
        p.dispVx *= 0.82;
        p.dispVy *= 0.82;
        p.dispX += p.dispVx * dt;
        p.dispY += p.dispVy * dt;
      }

      render();
      animationFrameId = requestAnimationFrame(animate);
    };

    // Initial setup
    resize();
    if (!prefersReducedMotion) {
      lastTime = performance.now();
      animationFrameId = requestAnimationFrame(animate);
    }

    return () => {
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      observerTheme.disconnect();
      window.removeEventListener('pointermove', handlePointerMove);
      document.removeEventListener('pointerleave', handlePointerLeave);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={`absolute inset-0 pointer-events-none select-none overflow-hidden z-0 ${className}`}
      aria-hidden="true"
    >
      <canvas ref={canvasRef} className="block w-full h-full" />
    </div>
  );
};
