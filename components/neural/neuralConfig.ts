export const NEURAL_CONFIG = {
    pathCount: 12,
    baseOpacity: 0.12,
    blur: 40, // px
    colors: {
        raw: "rgba(6, 182, 212, 0.4)", // Cyan
        processing: "rgba(59, 130, 246, 0.5)", // Blue
        output: "rgba(255, 255, 255, 0.6)", // White
    },
    animation: {
        durationMin: 30, // Slower
        durationMax: 45,
        pulseSpeed: 0.5,
        glitchChance: 0.0, // No jitter/glitch as requested
        idleTimeout: 10000,
    },
    layers: {
        raw: { count: 6, jitter: 5, width: 1, opacity: 0.3 }, // Reduced jitter
        processing: { count: 4, jitter: 2, width: 2, opacity: 0.4 },
        output: { count: 3, jitter: 0, width: 3, opacity: 0.5 },
    }
} as const;
