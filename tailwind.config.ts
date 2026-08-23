import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                void: "#0B0B0E",
                basalt: "#161619",
                stone: "#1A1A20",
                gold: "#C5A059",
                goldlight: "#E4D2A6",
                ivory: "#E4E4E7",
                bronze: "#78350F",
                smoke: "#26221E",
            },
            fontFamily: {
                display: ["var(--font-cinzel)"],
                serif: ["var(--font-cormorant)"],
                sans: ["var(--font-inter)"],
                mono: ["var(--font-jetbrains-mono)"],
            },
            backgroundImage: {
                'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
                'gold-fade': 'linear-gradient(180deg, rgba(197,160,89,0.14) 0%, rgba(197,160,89,0) 100%)',
                'stone-texture':
                    "url(\"data:image/svg+xml,%3Csvg width='120' height='120' viewBox='0 0 120 120' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.5'/%3E%3C/svg%3E\")",
            },
            boxShadow: {
                'gold-soft': '0 0 40px -12px rgba(197,160,89,0.28)',
                'gold-glow': '0 0 60px -8px rgba(197,160,89,0.35)',
                'gold-ring': 'inset 0 0 0 1px rgba(197,160,89,0.25)',
            },
            keyframes: {
                drift: {
                    "0%, 100%": { transform: "translate3d(-4%, 0, 0)" },
                    "50%": { transform: "translate3d(4%, 0, 0)" },
                },
                'drift-slow': {
                    "0%, 100%": { transform: "translate3d(0, 0, 0) scale(1)" },
                    "50%": { transform: "translate3d(2%, -2%, 0) scale(1.06)" },
                },
                'rise': {
                    "0%": { transform: "translateY(110vh) translateX(0)", opacity: "0" },
                    "10%": { opacity: "0.9" },
                    "90%": { opacity: "0.9" },
                    "100%": { transform: "translateY(-12vh) translateX(4vw)", opacity: "0" },
                },
                'smoke': {
                    "0%": { transform: "translate3d(0, 0, 0) scale(1) rotate(0deg)", opacity: "0" },
                    "15%": { opacity: "0.5" },
                    "85%": { opacity: "0.5" },
                    "100%": { transform: "translate3d(-6vw, -14vh, 0) scale(1.8) rotate(8deg)", opacity: "0" },
                },
                'flicker': {
                    "0%, 100%": { opacity: "1" },
                    "42%": { opacity: "0.82" },
                    "54%": { opacity: "0.95" },
                    "72%": { opacity: "0.78" },
                    "80%": { opacity: "1" },
                },
                'shimmer': {
                    "0%": { backgroundPosition: "-200% 0" },
                    "100%": { backgroundPosition: "200% 0" },
                },
                'scroll-pulse': {
                    "0%": { transform: "translateY(0)", opacity: "0.6" },
                    "50%": { transform: "translateY(8px)", opacity: "1" },
                    "100%": { transform: "translateY(0)", opacity: "0.6" },
                },
                'scanline': {
                    "0%": { transform: "translateY(-100%)" },
                    "100%": { transform: "translateY(100vh)" },
                },
                'breath': {
                    "0%, 100%": { opacity: "0.55" },
                    "50%": { opacity: "1" },
                },
                'spin-slow': {
                    "0%": { transform: "rotate(0deg)" },
                    "100%": { transform: "rotate(360deg)" },
                },
                'float': {
                    "0%, 100%": { transform: "translateY(0)" },
                    "50%": { transform: "translateY(-10px)" },
                },
                'sway': {
                    "0%, 100%": { transform: "skewX(-14deg) translateX(0) rotate(0deg)" },
                    "50%": { transform: "skewX(-14deg) translateX(2.5vw) rotate(1.2deg)" },
                },
                'ripple': {
                    "0%": { transform: "scale(0.35)", opacity: "0.65" },
                    "100%": { transform: "scale(2.4)", opacity: "0" },
                },
                'doorlight': {
                    "0%, 100%": { opacity: "0.55" },
                    "50%": { opacity: "1" },
                },
                'fogcross': {
                    "0%": { transform: "translateX(-60%) skewX(-12deg)", opacity: "0" },
                    "20%": { opacity: "0.5" },
                    "80%": { opacity: "0.5" },
                    "100%": { transform: "translateX(60%) skewX(-12deg)", opacity: "0" },
                },
            },
            animation: {
                drift: "drift 24s ease-in-out infinite",
                'drift-slow': "drift-slow 36s ease-in-out infinite",
                rise: "rise 16s linear infinite",
                smoke: "smoke 22s ease-in-out infinite",
                flicker: "flicker 5s ease-in-out infinite",
                shimmer: "shimmer 4s linear infinite",
                'scroll-pulse': "scroll-pulse 2.4s ease-in-out infinite",
                scanline: "scanline 9s linear infinite",
                breath: "breath 6s ease-in-out infinite",
                'spin-slow': "spin-slow 40s linear infinite",
                float: "float 7s ease-in-out infinite",
                sway: "sway 16s ease-in-out infinite",
                ripple: "ripple 1.2s ease-out forwards",
                doorlight: "doorlight 5s ease-in-out infinite",
                fogcross: "fogcross 9s linear infinite",
            },
        },
    },
    plugins: [],
};
export default config;
