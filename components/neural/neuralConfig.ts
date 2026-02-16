export const NEURAL_CONFIG = {
    pathCount: 12,
    baseOpacity: 0.12,
    blur: 20, // Reduced from 40px for performance
    colors: {
        raw: "rgba(6, 182, 212, 0.4)", // Cyan
        processing: "rgba(59, 130, 246, 0.5)", // Blue
        output: "rgba(255, 255, 255, 0.6)", // White
    },
    animation: {
        durationMin: 30,
        durationMax: 45,
        pulseSpeed: 0.5,
        glitchChance: 0.0,
        idleTimeout: 5000, // Reduced timeout (was 10s)
    },
    layers: {
        raw: { count: 3, jitter: 5, width: 1, opacity: 0.3 }, // Reduced count (was 6)
        processing: { count: 2, jitter: 2, width: 2, opacity: 0.4 }, // Reduced count (was 4)
        output: { count: 1, jitter: 0, width: 3, opacity: 0.5 }, // Reduced count (was 3)
    }
} as const;
