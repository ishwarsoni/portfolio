"use client";

import { useEffect, useRef } from "react";

export default function WarpField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    const isMobile = width < 768;

    // Configuration - Reduced STAR_COUNT for mobile performance
    const STAR_COUNT = isMobile ? 300 : 1000;
    const BASE_SPEED = 3;
    const BOOST_SPEED = 8;
    const COLOR_CYAN = "#06b6d4";
    const COLOR_VIOLET = "#8b5cf6";

    let speed = BASE_SPEED;
    let mouseX = width / 2;
    let mouseY = height / 2;

    class Star {
      x: number;
      y: number;
      z: number; // Depth value
      px: number; // Previous X (for trail)
      py: number; // Previous Y (for trail)
      color: string;

      constructor() {
        // Random position across the screen center
        this.x = (Math.random() - 0.5) * width * 2;
        this.y = (Math.random() - 0.5) * height * 2;
        // Start far away in the distance
        this.z = Math.random() * width;
        this.px = 0;
        this.py = 0;
        this.color = Math.random() > 0.5 ? COLOR_CYAN : COLOR_VIOLET;
      }

      update() {
        // Move closer to the screen
        this.z -= speed;

        // Agar star screen ke peeche chala jaye, reset it to back
        if (this.z <= 0) {
          this.z = width;
          this.x = (Math.random() - 0.5) * width * 2;
          this.y = (Math.random() - 0.5) * height * 2;
          this.px = 0; // Reset trails
          this.py = 0;
        }
      }

      draw() {
        if (!ctx) return;

        // 3D to 2D Projection Math
        // The closer Z is to 0, the larger the scale
        const scale = width / this.z;

        // Disable mouse influence on mobile for better performance
        const offsetX = isMobile ? 0 : (mouseX - width / 2) * (scale * 0.05);
        const offsetY = isMobile ? 0 : (mouseY - height / 2) * (scale * 0.05);

        // Current position on screen
        const sx = (this.x / this.z) * width + width / 2 + offsetX;
        const sy = (this.y / this.z) * height + height / 2 + offsetY;

        // Calculate size based on closeness
        const size = (1 - this.z / width) * 2.5;
        const opacity = 1 - this.z / width; // Fade in as they approach

        ctx.beginPath();
        ctx.strokeStyle = this.color;
        ctx.lineWidth = size;
        ctx.lineCap = "round";
        // Draw opacity based on distance
        ctx.globalAlpha = opacity;

        // THE MAGIC TRICK: Draw a line from previous position to current position
        // This creates the "streak" effect instead of just dots.
        if (this.px !== 0) {
          ctx.moveTo(this.px, this.py);
          ctx.lineTo(sx, sy);
        } else {
          // First frame just draw a dot
          ctx.moveTo(sx, sy);
          ctx.lineTo(sx + 1, sy + 1);
        }
        ctx.stroke();
        ctx.globalAlpha = 1; // Reset global alpha

        // Store current pos for next frame's trail start
        this.px = sx;
        this.py = sy;
      }
    }

    let stars: Star[] = [];

    const init = () => {
      stars = [];
      for (let i = 0; i < STAR_COUNT; i++) {
        stars.push(new Star());
      }
    };

    const animate = () => {
      // "Motion Blur" trail effect using semi-transparent black rect
      ctx.fillStyle = "rgba(2, 2, 5, 0.3)";
      ctx.fillRect(0, 0, width, height);

      // Slowly reduce speed back to base if it was boosted
      if (speed > BASE_SPEED) {
        speed -= 0.5;
      }

      stars.forEach(star => {
        star.update();
        star.draw();
      });

      requestAnimationFrame(animate);
    };

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      // Handle High DPI screens properly
      const dpr = window.devicePixelRatio || 1;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);
      // Set display size explicitly
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      init();
    };

    // Listeners
    window.addEventListener("resize", handleResize);

    // Disable mouse listener functionality on mobile/touch
    if (!isMobile) {
      window.addEventListener("mousemove", (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        // Temporary speed boost on quick movement
        speed = BOOST_SPEED;
      });
    }

    handleResize();
    animate();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: -1,
        pointerEvents: "none",
        background: '#020205' // Deep Space Black
      }}
    />
  );
}