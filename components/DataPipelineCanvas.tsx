"use client";

import { useEffect, useRef } from "react";

/*
 ╔═══════════════════════════════════════════════════════════════════╗
 ║  SENTIENT DATA SWARM                                              ║
 ║                                                                   ║
 ║  2000 particles · flocking behavior · mouse repulsion             ║
 ║  scroll velocity · color cycling · atmospheric glow               ║
 ║                                                                   ║
 ║  Optimized Canvas API with spatial hash grid for O(n) queries     ║
 ╚═══════════════════════════════════════════════════════════════════╝
*/

// ═══════════════════════════════════════════════════════════
//  CONFIG
// ═══════════════════════════════════════════════════════════

const PARTICLE_COUNT_DESKTOP = 2000;
const PARTICLE_COUNT_TABLET = 800;
const PARTICLE_COUNT_MOBILE = 300;

const GRID_CELL = 60;           // spatial hash cell size
const NEIGHBOR_RADIUS = 55;     // flocking neighbor radius
const MAX_SPEED = 1.2;
const MOUSE_RADIUS = 140;       // repulsion field radius
const MOUSE_FORCE = 3.5;        // repulsion strength
const SCROLL_BOOST_DECAY = 0.95;

// Flocking weights
const COHESION_W = 0.003;
const ALIGNMENT_W = 0.04;
const SEPARATION_W = 0.08;
const SEPARATION_DIST = 18;

// Wave field
const WAVE_STRENGTH = 0.15;
const WAVE_FREQ = 0.0008;
const WAVE_TIME_SCALE = 0.3;

// Colors — hue values for hsl()
const COLOR_BLUE = 220;
const COLOR_VIOLET = 270;
const COLOR_CYAN = 185;
const COLOR_CYCLE_SPEED = 0.08; // hue degrees per second per particle

// Glow centers
const GLOW_CENTERS = [
    { x: 0.2, y: 0.3, r: 350, color: "rgba(20, 10, 60, 0.25)" },
    { x: 0.75, y: 0.6, r: 300, color: "rgba(0, 15, 50, 0.2)" },
    { x: 0.5, y: 0.8, r: 280, color: "rgba(10, 5, 40, 0.15)" },
];

// ═══════════════════════════════════════════════════════════
//  TYPED ARRAYS (SoA layout for cache performance)
// ═══════════════════════════════════════════════════════════

let px: Float32Array;  // position x
let py: Float32Array;  // position y
let vx: Float32Array;  // velocity x
let vy: Float32Array;  // velocity y
let hue: Float32Array; // color hue per particle
let sz: Float32Array;  // size per particle
let al: Float32Array;  // alpha per particle

// ═══════════════════════════════════════════════════════════
//  SPATIAL HASH GRID
// ═══════════════════════════════════════════════════════════

let gridCols = 0;
let gridRows = 0;
let gridCells: Int32Array;       // flat array of cell starts
let gridCounts: Int32Array;      // count per cell
let gridIndices: Int32Array;     // particle indices sorted by cell
const MAX_PER_CELL = 32;

function initGrid(W: number, H: number) {
    gridCols = Math.ceil(W / GRID_CELL) + 1;
    gridRows = Math.ceil(H / GRID_CELL) + 1;
    const totalCells = gridCols * gridRows;
    gridCells = new Int32Array(totalCells * MAX_PER_CELL);
    gridCounts = new Int32Array(totalCells);
}

function buildGrid(count: number) {
    gridCounts.fill(0);
    for (let i = 0; i < count; i++) {
        const col = Math.floor(px[i] / GRID_CELL);
        const row = Math.floor(py[i] / GRID_CELL);
        if (col < 0 || col >= gridCols || row < 0 || row >= gridRows) continue;
        const cellIdx = row * gridCols + col;
        const cnt = gridCounts[cellIdx];
        if (cnt < MAX_PER_CELL) {
            gridCells[cellIdx * MAX_PER_CELL + cnt] = i;
            gridCounts[cellIdx] = cnt + 1;
        }
    }
}

// ═══════════════════════════════════════════════════════════
//  COMPONENT
// ═══════════════════════════════════════════════════════════

export const DataPipelineCanvas = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const animRef = useRef<number>(0);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const maybeCtx = canvas.getContext("2d", { alpha: false });
        if (!maybeCtx) return;
        const ctx = maybeCtx;

        // ── Device tier ──
        const w0 = window.innerWidth;
        const isMobile = w0 < 768;
        const isTablet = w0 >= 768 && w0 < 1024;
        const COUNT = isMobile ? PARTICLE_COUNT_MOBILE : isTablet ? PARTICLE_COUNT_TABLET : PARTICLE_COUNT_DESKTOP;
        const dpr = Math.min(window.devicePixelRatio || 1, 2);

        let W = w0, H = window.innerHeight;

        const resize = () => {
            W = window.innerWidth;
            H = window.innerHeight;
            canvas.width = W * dpr;
            canvas.height = H * dpr;
            canvas.style.width = `${W}px`;
            canvas.style.height = `${H}px`;
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
            initGrid(W, H);
        };
        resize();

        // ── Initialize particles ──
        px = new Float32Array(COUNT);
        py = new Float32Array(COUNT);
        vx = new Float32Array(COUNT);
        vy = new Float32Array(COUNT);
        hue = new Float32Array(COUNT);
        sz = new Float32Array(COUNT);
        al = new Float32Array(COUNT);

        const hues = [COLOR_BLUE, COLOR_VIOLET, COLOR_CYAN];

        for (let i = 0; i < COUNT; i++) {
            px[i] = Math.random() * W;
            py[i] = Math.random() * H;
            const angle = Math.random() * Math.PI * 2;
            const speed = 0.2 + Math.random() * 0.5;
            vx[i] = Math.cos(angle) * speed;
            vy[i] = Math.sin(angle) * speed;
            hue[i] = hues[Math.floor(Math.random() * 3)] + (Math.random() - 0.5) * 20;
            sz[i] = 0.5 + Math.random() * 1.5;
            al[i] = 0.3 + Math.random() * 0.5;
        }

        initGrid(W, H);

        // ── Mouse state ──
        let mouseX = -9999, mouseY = -9999;
        let mouseActive = false;

        const onMouseMove = (e: MouseEvent) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            mouseActive = true;
        };
        const onMouseLeave = () => { mouseActive = false; mouseX = -9999; mouseY = -9999; };
        window.addEventListener("mousemove", onMouseMove, { passive: true });
        document.addEventListener("mouseleave", onMouseLeave);

        // ── Scroll velocity ──
        let scrollSpeed = 0;
        let lastScrollY = window.scrollY;
        const onScroll = () => {
            const dy = Math.abs(window.scrollY - lastScrollY);
            scrollSpeed = Math.min(dy * 0.02, 2.5); // cap
            lastScrollY = window.scrollY;
        };
        window.addEventListener("scroll", onScroll, { passive: true });

        // ── Visibility ──
        let visible = true;
        const onVis = () => { visible = document.visibilityState === "visible"; };
        document.addEventListener("visibilitychange", onVis);

        // ── Resize ──
        let resizeTimer: ReturnType<typeof setTimeout>;
        const onResize = () => {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(resize, 200);
        };
        window.addEventListener("resize", onResize);

        // ── Time ──
        let time = 0;
        let lastFrameTime = performance.now();

        // ── Pre-compute glow positions ──
        function drawBackground() {
            // Solid background
            ctx.fillStyle = "#020204";
            ctx.fillRect(0, 0, W, H);

            // Atmospheric glow centers
            for (const g of GLOW_CENTERS) {
                const grad = ctx.createRadialGradient(
                    g.x * W, g.y * H, 0,
                    g.x * W, g.y * H, g.r
                );
                grad.addColorStop(0, g.color);
                grad.addColorStop(1, "rgba(2,2,4,0)");
                ctx.fillStyle = grad;
                ctx.fillRect(0, 0, W, H);
            }
        }

        // ═══════════════════════════════════════════════
        //  PHYSICS: Flocking + Mouse + Scroll
        // ═══════════════════════════════════════════════

        function updatePhysics(dt: number) {
            buildGrid(COUNT);

            const speedMult = 1 + scrollSpeed;

            for (let i = 0; i < COUNT; i++) {
                // ── Accumulate flocking forces ──
                let cohX = 0, cohY = 0, cohCount = 0;
                let aliX = 0, aliY = 0;
                let sepX = 0, sepY = 0;

                const col = Math.floor(px[i] / GRID_CELL);
                const row = Math.floor(py[i] / GRID_CELL);

                // Check 3x3 neighborhood
                for (let dr = -1; dr <= 1; dr++) {
                    for (let dc = -1; dc <= 1; dc++) {
                        const nc = col + dc;
                        const nr = row + dr;
                        if (nc < 0 || nc >= gridCols || nr < 0 || nr >= gridRows) continue;
                        const cellIdx = nr * gridCols + nc;
                        const cnt = gridCounts[cellIdx];

                        for (let k = 0; k < cnt; k++) {
                            const j = gridCells[cellIdx * MAX_PER_CELL + k];
                            if (j === i) continue;

                            const ddx = px[j] - px[i];
                            const ddy = py[j] - py[i];
                            const dist = Math.sqrt(ddx * ddx + ddy * ddy);

                            if (dist < NEIGHBOR_RADIUS && dist > 0.1) {
                                // Cohesion
                                cohX += px[j];
                                cohY += py[j];
                                cohCount++;

                                // Alignment
                                aliX += vx[j];
                                aliY += vy[j];

                                // Separation
                                if (dist < SEPARATION_DIST) {
                                    const f = (SEPARATION_DIST - dist) / SEPARATION_DIST;
                                    sepX -= (ddx / dist) * f;
                                    sepY -= (ddy / dist) * f;
                                }
                            }
                        }
                    }
                }

                // Apply forces
                if (cohCount > 0) {
                    const cx = cohX / cohCount - px[i];
                    const cy = cohY / cohCount - py[i];
                    vx[i] += cx * COHESION_W;
                    vy[i] += cy * COHESION_W;

                    vx[i] += (aliX / cohCount - vx[i]) * ALIGNMENT_W;
                    vy[i] += (aliY / cohCount - vy[i]) * ALIGNMENT_W;
                }

                vx[i] += sepX * SEPARATION_W;
                vy[i] += sepY * SEPARATION_W;

                // ── Wave field (organic waves) ──
                const waveAngle = Math.sin(px[i] * WAVE_FREQ + time * WAVE_TIME_SCALE) * Math.PI +
                    Math.cos(py[i] * WAVE_FREQ * 0.7 + time * WAVE_TIME_SCALE * 1.3) * Math.PI * 0.5;
                vx[i] += Math.cos(waveAngle) * WAVE_STRENGTH * dt;
                vy[i] += Math.sin(waveAngle) * WAVE_STRENGTH * dt;

                // ── Mouse repulsion ──
                if (mouseActive) {
                    const mdx = px[i] - mouseX;
                    const mdy = py[i] - mouseY;
                    const mDist = Math.sqrt(mdx * mdx + mdy * mdy);
                    if (mDist < MOUSE_RADIUS && mDist > 1) {
                        const force = (1 - mDist / MOUSE_RADIUS) * MOUSE_FORCE;
                        vx[i] += (mdx / mDist) * force;
                        vy[i] += (mdy / mDist) * force;
                    }
                }

                // ── Speed limit ──
                const spd = Math.sqrt(vx[i] * vx[i] + vy[i] * vy[i]);
                const maxSpd = MAX_SPEED * speedMult;
                if (spd > maxSpd) {
                    vx[i] = (vx[i] / spd) * maxSpd;
                    vy[i] = (vy[i] / spd) * maxSpd;
                }

                // ── Integrate ──
                px[i] += vx[i];
                py[i] += vy[i];

                // ── Wrap at edges ──
                if (px[i] < -10) px[i] += W + 20;
                if (px[i] > W + 10) px[i] -= W + 20;
                if (py[i] < -10) py[i] += H + 20;
                if (py[i] > H + 10) py[i] -= H + 20;

                // ── Color cycling ──
                hue[i] += COLOR_CYCLE_SPEED * dt * (0.5 + Math.sin(i * 0.01 + time) * 0.5);
                if (hue[i] > 290) hue[i] = 175; // wrap from violet back to cyan
            }

            // Decay scroll speed
            scrollSpeed *= SCROLL_BOOST_DECAY;
        }

        // ═══════════════════════════════════════════════
        //  RENDER
        // ═══════════════════════════════════════════════

        function renderParticles() {
            for (let i = 0; i < COUNT; i++) {
                const h = hue[i];
                const s = 75 + Math.sin(time + i * 0.05) * 15;
                const l = 50 + sz[i] * 10;
                const a = al[i] * (0.6 + Math.sin(time * 0.5 + i * 0.1) * 0.4);
                const r = sz[i];

                ctx.beginPath();
                ctx.arc(px[i], py[i], r, 0, Math.PI * 2);
                ctx.fillStyle = `hsla(${h},${s}%,${l}%,${a})`;
                ctx.fill();
            }
        }

        // ═══════════════════════════════════════════════
        //  MAIN LOOP
        // ═══════════════════════════════════════════════

        function frame() {
            const now = performance.now();
            const delta = now - lastFrameTime;
            lastFrameTime = now;

            if (!visible) {
                animRef.current = requestAnimationFrame(frame);
                return;
            }

            const dt = Math.min(delta * 0.001, 0.05); // cap dt to avoid explosion
            time += dt;

            // Physics
            updatePhysics(dt);

            // Render
            drawBackground();
            renderParticles();

            animRef.current = requestAnimationFrame(frame);
        }

        animRef.current = requestAnimationFrame(frame);

        return () => {
            cancelAnimationFrame(animRef.current);
            window.removeEventListener("mousemove", onMouseMove);
            document.removeEventListener("mouseleave", onMouseLeave);
            window.removeEventListener("scroll", onScroll);
            document.removeEventListener("visibilitychange", onVis);
            window.removeEventListener("resize", onResize);
            clearTimeout(resizeTimer);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 pointer-events-none"
            style={{ zIndex: 1 }}
            aria-hidden="true"
        />
    );
};
