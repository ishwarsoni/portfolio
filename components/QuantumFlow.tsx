"use client";

import { useEffect, useRef } from "react";

export default function QuantumFlow() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    // ...variables...
    const PARTICLE_COUNT = 700; 
    const TRAIL_OPACITY = 0.08; 
    const COLOR_CYAN = "rgba(6, 182, 212, 1)";
    const COLOR_VIOLET = "rgba(139, 92, 246, 1)";
    const mouse = { x: -1000, y: -1000, active: false };

    // ...Particle Class same as before...
    class Particle {
      x: number; y: number; vx: number; vy: number; color: string; speed: number;
      constructor(w: number, h: number) {
        this.x = Math.random() * w;
        this.y = Math.random() * h;
        this.vx = 0; this.vy = 0;
        this.color = Math.random() > 0.5 ? COLOR_CYAN : COLOR_VIOLET;
        this.speed = Math.random() * 0.5 + 0.5;
      }
      update(w: number, h: number) {
        const angle = (Math.cos(this.x * 0.005) + Math.sin(this.y * 0.005)) * Math.PI;
        this.vx = Math.cos(angle) * this.speed * 2;
        this.vy = Math.sin(angle) * this.speed * 2;
        
        if (mouse.active) {
          const dx = mouse.x - this.x;
          const dy = mouse.y - this.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 250) {
            const force = (250 - dist) / 250;
            const angleToMouse = Math.atan2(dy, dx);
            this.vx -= Math.cos(angleToMouse) * force * 5;
            this.vy -= Math.sin(angleToMouse) * force * 5;
          }
        }
        this.x += this.vx; this.y += this.vy;
        if (this.x > w) this.x = 0; if (this.x < 0) this.x = w;
        if (this.y > h) this.y = 0; if (this.y < 0) this.y = h;
      }
      draw() {
        if (!ctx) return;
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, 2, 2);
      }
    }

    let particles: Particle[] = [];
    const initParticles = (w: number, h: number) => {
      particles = [];
      for (let i = 0; i < PARTICLE_COUNT; i++) particles.push(new Particle(w, h));
    };

    const handleResize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      const dpr = window.devicePixelRatio || 1;
      
      // Force canvas logical size
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      
      // Force canvas visual size explicitly via style
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      
      ctx.scale(dpr, dpr);
      initParticles(w, h);
    };

    const animate = () => {
      ctx.fillStyle = `rgba(5, 5, 5, ${TRAIL_OPACITY})`;
      // Use logic dimensions, not canvas.width (which is scaled)
      ctx.fillRect(0, 0, window.innerWidth, window.innerHeight); 
      particles.forEach((p) => { p.update(window.innerWidth, window.innerHeight); p.draw(); });
      animationFrameId = requestAnimationFrame(animate);
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
      mouse.active = true;
    });
    window.addEventListener("mouseleave", () => { mouse.active = false; });

    handleResize();
    animate();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      id="quantum-flow-canvas"
      // Force inline styles to override EVERYTHING
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: -1, // Behind everything
        pointerEvents: 'none', // Allow clicks to pass through
        background: '#09090b' // Fallback color
      }}
    />
  );
}