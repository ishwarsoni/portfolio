"use client";

import { useEffect, useRef } from "react";

/*
 ╔═══════════════════════════════════════════════════════════════════╗
 ║  NEBULA FIELD — "THE LIVING INTELLIGENCE"                         ║
 ║                                                                   ║
 ║  500-600 particles · multi-octave sine drift · mouse repulsion    ║
 ║  neural connections · depth variation · optimized canvas loop     ║
 ║                                                                   ║
 ║  Optimized for 60fps with pre-allocated Float32Arrays             ║
 ╚═══════════════════════════════════════════════════════════════════╝
*/

// ═══════════════════════════════════════════════════════════
//  CONFIG
// ═══════════════════════════════════════════════════════════

const PARTICLE_COUNT = 550;
const CONNECTION_DIST = 85;
const MAX_CONNECTION_OPACITY = 0.05;
const MOUSE_RADIUS = 120;
const MOUSE_PUSH_FORCE = 3.2;   // gentle push acceleration
const MOUSE_RECOVERY = 0.012;   // smoke-like return speed
const DRIFT_SPEED = 0.45;

// Colors
const CYAN: [number, number, number] = [6, 182, 212];    // #06b6d4
const VIOLET: [number, number, number] = [139, 92, 246]; // #8b5cf6

// ═══════════════════════════════════════════════════════════
//  PHYSICS ARRAYS (Static allocations)
// ═══════════════════════════════════════════════════════════

// Dynamic state
const posX = new Float32Array(PARTICLE_COUNT);
const posY = new Float32Array(PARTICLE_COUNT);
const homeX = new Float32Array(PARTICLE_COUNT);
const homeY = new Float32Array(PARTICLE_COUNT);
const velX = new Float32Array(PARTICLE_COUNT);
const velY = new Float32Array(PARTICLE_COUNT);

// Intrinsic properties
const driftAngle = new Float32Array(PARTICLE_COUNT);
const driftFreq = new Float32Array(PARTICLE_COUNT);
const driftAmp = new Float32Array(PARTICLE_COUNT);
const phase = new Float32Array(PARTICLE_COUNT);
const radius = new Float32Array(PARTICLE_COUNT);
const depth = new Float32Array(PARTICLE_COUNT); // 0-1 for opacity/speed variation
const colorMix = new Float32Array(PARTICLE_COUNT); // 0 = cyan, 1 = violet

// ═══════════════════════════════════════════════════════════
//  SPATIAL PARTITIONING (for connections)
// ═══════════════════════════════════════════════════════════

const CELL_SIZE = 90;
const MAX_PER_CELL = 18;
let gridCols = 0, gridRows = 0;
let gridCells: Int32Array;
let gridCounts: Int32Array;

function initSpatialGrid(W: number, H: number) {
    gridCols = Math.ceil(W / CELL_SIZE) + 1;
    gridRows = Math.ceil(H / CELL_SIZE) + 1;
    const totalCells = gridCols * gridRows;
    gridCells = new Int32Array(totalCells * MAX_PER_CELL);
    gridCounts = new Int32Array(totalCells);
}

function updateSpatialGrid() {
    gridCounts.fill(0);
    for (let i = 0; i < PARTICLE_COUNT; i++) {
        const c = Math.floor(posX[i] / CELL_SIZE);
        const r = Math.floor(posY[i] / CELL_SIZE);
        if (c < 0 || c >= gridCols || r < 0 || r >= gridRows) continue;
        const cellIdx = r * gridCols + c;
        const count = gridCounts[cellIdx];
        if (count < MAX_PER_CELL) {
            gridCells[cellIdx * MAX_PER_CELL + count] = i;
            gridCounts[cellIdx] = count + 1;
        }
    }
}

// ═══════════════════════════════════════════════════════════
//  HELPERS
// ═══════════════════════════════════════════════════════════

const lerpColor = (a: [number, number, number], b: [number, number, number], t: number): string => {
    const r = Math.round(a[0] + (b[0] - a[0]) * t);
    const g = Math.round(a[1] + (b[1] - a[1]) * t);
    const bl = Math.round(a[2] + (b[2] - a[2]) * t);
    return `${r},${g},${bl}`;
};

// ═══════════════════════════════════════════════════════════
//  COMPONENT
// ═══════════════════════════════════════════════════════════

export const NebulaField = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const animRef = useRef<number>(0);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d", { alpha: false });
        if (!ctx) return;

        const dpr = Math.min(window.devicePixelRatio || 1, 2);
        let W = window.innerWidth;
        let H = window.innerHeight;

        const resize = () => {
            W = window.innerWidth;
            H = window.innerHeight;
            canvas.width = W * dpr;
            canvas.height = H * dpr;
            canvas.style.width = `${W}px`;
            canvas.style.height = `${H}px`;
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
            initSpatialGrid(W, H);
        };
        resize();

        // ── Init state ──
        for (let i = 0; i < PARTICLE_COUNT; i++) {
            const x = Math.random() * W;
            const y = Math.random() * H;
            posX[i] = homeX[i] = x;
            posY[i] = homeY[i] = y;
            velX[i] = 0;
            velY[i] = 0;
            driftAngle[i] = Math.random() * Math.PI * 2;
            driftFreq[i] = 0.4 + Math.random() * 0.8;
            driftAmp[i] = 0.5 + Math.random() * 1.5;
            phase[i] = Math.random() * Math.PI * 2;
            radius[i] = 0.6 + Math.random() * 2.2;
            depth[i] = 0.2 + Math.random() * 0.8;
            colorMix[i] = Math.random();
        }

        // ── Mouse logic ──
        let mouseX = -999, mouseY = -999;
        let isMouseActive = false;

        const onMouseMove = (e: MouseEvent) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            isMouseActive = true;
        };
        const onMouseLeave = () => { isMouseActive = false; };
        window.addEventListener("mousemove", onMouseMove, { passive: true });
        document.addEventListener("mouseleave", onMouseLeave);

        // ── Visibility tracking ──
        let isVisible = true;
        const onVisibilityChange = () => { isVisible = document.visibilityState === "visible"; };
        document.addEventListener("visibilitychange", onVisibilityChange);

        // ── Throttled resize ──
        let resizeTimeout: ReturnType<typeof setTimeout>;
        const onResize = () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                resize();
                // Shift particles to new bounds smoothly
                for (let i = 0; i < PARTICLE_COUNT; i++) {
                    homeX[i] = Math.random() * W;
                    homeY[i] = Math.random() * H;
                }
            }, 150);
        };
        window.addEventListener("resize", onResize);

        // ── Draw Loop ──
        let lastTime = performance.now();
        function render(time: number) {
            if (!ctx) return;
            const dt = Math.min((time - lastTime) / 1000, 0.05);
            lastTime = time;

            if (!isVisible) {
                animRef.current = requestAnimationFrame(render);
                return;
            }

            const elapsed = time * 0.001;

            // 1. CLEAR & UPDATE PHYSICS
            ctx.fillStyle = "#09090b"; // zinc-950
            ctx.fillRect(0, 0, W, H);

            for (let i = 0; i < PARTICLE_COUNT; i++) {
                // Multi-octave drift
                const ang = driftAngle[i];
                const sinWave = Math.sin(elapsed * driftFreq[i] + phase[i]);
                const cosWave = Math.cos(elapsed * 0.3 + phase[i] * 0.5);

                const driftX = Math.cos(ang) * DRIFT_SPEED + cosWave * 0.1;
                const driftY = Math.sin(ang) * DRIFT_SPEED + sinWave * driftAmp[i] * 0.15;

                // Evolve home position (the "original flow")
                homeX[i] += driftX * dt * 30;
                homeY[i] += driftY * dt * 30;

                // Wrap around
                if (homeX[i] < -50) homeX[i] += W + 100;
                if (homeX[i] > W + 50) homeX[i] -= W + 100;
                if (homeY[i] < -50) homeY[i] += H + 100;
                if (homeY[i] > H + 50) homeY[i] -= H + 100;

                // Mouse repulsion force
                if (isMouseActive) {
                    const dx = posX[i] - mouseX;
                    const dy = posY[i] - mouseY;
                    const distSq = dx * dx + dy * dy;
                    if (distSq < MOUSE_RADIUS * MOUSE_RADIUS) {
                        const dist = Math.sqrt(distSq);
                        const strength = (1 - dist / MOUSE_RADIUS) * MOUSE_PUSH_FORCE;
                        velX[i] += (dx / dist) * strength;
                        velY[i] += (dy / dist) * strength;
                    }
                }

                // Return to home position (smoke-like inertia)
                velX[i] += (homeX[i] - posX[i]) * MOUSE_RECOVERY;
                velY[i] += (homeY[i] - posY[i]) * MOUSE_RECOVERY;

                // Apply friction
                velX[i] *= 0.955;
                velY[i] *= 0.955;

                // Step
                posX[i] += velX[i];
                posY[i] += velY[i];
            }

            // 2. SPATIAL GRID FOR CONNECTIONS
            updateSpatialGrid();

            // 3. DRAW CONNECTIONS
            ctx.lineWidth = 0.5;
            for (let i = 0; i < PARTICLE_COUNT; i++) {
                const c = Math.floor(posX[i] / CELL_SIZE);
                const r = Math.floor(posY[i] / CELL_SIZE);

                for (let dr = 0; dr <= 1; dr++) {
                    for (let dc = -1; dc <= 1; dc++) {
                        const nc = c + dc;
                        const nr = r + dr;
                        if (nc < 0 || nc >= gridCols || nr < 0 || nr >= gridRows) continue;

                        const cellIdx = nr * gridCols + nc;
                        const cnt = gridCounts[cellIdx];
                        for (let k = 0; k < cnt; k++) {
                            const j = gridCells[cellIdx * MAX_PER_CELL + k];
                            if (j <= i) continue; // prevent double drawing

                            const dx = posX[i] - posX[j];
                            const dy = posY[i] - posY[j];
                            const distSq = dx * dx + dy * dy;

                            if (distSq < CONNECTION_DIST * CONNECTION_DIST) {
                                const dist = Math.sqrt(distSq);
                                const opacity = (1 - dist / CONNECTION_DIST) * MAX_CONNECTION_OPACITY;
                                const mix = (colorMix[i] + colorMix[j]) * 0.5;
                                const rgb = lerpColor(CYAN, VIOLET, mix);

                                ctx.beginPath();
                                ctx.moveTo(posX[i], posY[i]);
                                ctx.lineTo(posX[j], posY[j]);
                                ctx.strokeStyle = `rgba(${rgb},${opacity})`;
                                ctx.stroke();
                            }
                        }
                    }
                }
            }

            // 4. DRAW PARTICLES
            for (let i = 0; i < PARTICLE_COUNT; i++) {
                const x = posX[i], y = posY[i];
                // Skip culling check for slight perf, just draw everything (small count)
                const breathe = 0.7 + 0.3 * Math.sin(elapsed * driftFreq[i] * 1.4 + phase[i]);
                const alphaValue = depth[i] * breathe;
                const size = radius[i] * (0.8 + breathe * 0.2);
                const rgb = lerpColor(CYAN, VIOLET, colorMix[i]);

                // Secondary glow pass
                ctx.beginPath();
                ctx.arc(x, y, size * 2.5, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(${rgb},${alphaValue * 0.15})`;
                ctx.fill();

                // Sharp core
                ctx.beginPath();
                ctx.arc(x, y, size, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(${rgb},${alphaValue})`;
                ctx.fill();
            }

            animRef.current = requestAnimationFrame(render);
        }

        animRef.current = requestAnimationFrame(render);

        return () => {
            cancelAnimationFrame(animRef.current);
            window.removeEventListener("mousemove", onMouseMove);
            document.removeEventListener("mouseleave", onMouseLeave);
            document.removeEventListener("visibilitychange", onVisibilityChange);
            window.removeEventListener("resize", onResize);
            clearTimeout(resizeTimeout);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 -z-10 bg-zinc-950 pointer-events-none"
            aria-hidden="true"
        />
    );
};
