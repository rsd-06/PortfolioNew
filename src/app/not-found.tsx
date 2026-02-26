"use client";

import Link from "next/link";
import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";

import { NoiseBackground } from "../components/ui/noise-background";

// ─── Glitch hook ────────────────────────────────────────────────────────────
const GLITCH_CHARS = "!@#$%^&*<>?/\\|{}[]~`";
function useGlitch(text: string, running: boolean) {
    const [display, setDisplay] = useState(text);
    useEffect(() => {
        if (!running) { setDisplay(text); return; }
        let frame = 0;
        const id = setInterval(() => {
            frame++;
            setDisplay(
                text.split("").map((ch, i) =>
                    ch === " " ? " " : frame > i * 1.5
                        ? ch
                        : GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)]
                ).join("")
            );
            if (frame > text.length * 2) clearInterval(id);
        }, 40);
        return () => clearInterval(id);
    }, [running, text]);
    return display;
}

// ─── Quotes — no icons, manually shuffled for variety ────────────────────────
const QUOTES = [
    { text: "Plot twist: the page doesn't exist. Nobody saw that coming.", author: "— M. Night Shyamalan, Nodding" },
    { text: "You ran behind her — and still ended up here. You're welcome.", author: "— Someone just like you, Us moments" },
    { text: "Even light from this URL never arrives. It's a 404 hole.", author: "— Hawking's Footnotes, Vol. 404" },
    { text: "This URL bricked like a Shaq free throw in the finals.", author: "— Barkley's Ghost, ESPN 404" },
    { text: "This page got gerrymandered out of existence.", author: "— The Electoral College, No Comment" },
    { text: "The build succeeded. The tests passed. The page did not.", author: "— CI/CD Pipeline, Shrugging" },
    { text: "Wrong chord. Wrong page. Both hurt the same.", author: "— A Guitar String, Snapping at 2am" },
    { text: "The observable universe has been observed. This page has not.", author: "— JWST, Slightly Offended" },
    { text: "Rated 404. Contains scenes of missing content and broken links.", author: "— Film Board, Certifying Nothing" },
    { text: "Mile 21: hit the wall. Mile 22: found this page. Same energy.", author: "— Marathon Official, Confused" },
    { text: "We asked the parliament. They tabled a motion to find this page. It was filibustered.", author: "— C-SPAN, Falling Asleep" },
    { text: "It compiles. It ships. It 404s. Engineering is a spectrum.", author: "— Stack Overflow, Closing Your Tab" },
    { text: "Even a dropped G string lands somewhere. This page didn't.", author: "— Your Fretboard, Disappointed" },
    { text: "Signal lost somewhere between Earth and Andromeda. The beat drops elsewhere.", author: "— Your Aux Cord, Unplugged" },
    { text: "You drove to the basket and found nothing but net. Empty net.", author: "— Coach Nobody, Post-game Presser" },
    { text: "This page was on the setlist. It got cut before soundcheck.", author: "— The Venue, Sold Out Anyway" },
];

// ─── Ghost BG words (static, seeded — no Math.random at module level) ───────
const BG_WORDS = [
    { text: "42K", top: "78%", left: "72%", size: "clamp(4rem,10vw,10rem)", opacity: 0.04 },
    { text: "NBA", top: "12%", left: "78%", size: "clamp(3rem,7vw,7rem)", opacity: 0.03 },
    { text: "♪", top: "55%", left: "5%", size: "clamp(4rem,9vw,9rem)", opacity: 0.04 },
    { text: "∞", top: "20%", left: "10%", size: "clamp(3rem,6vw,6rem)", opacity: 0.035 },
    { text: "REEL", top: "40%", left: "82%", size: "clamp(2rem,5vw,5rem)", opacity: 0.03 },
    { text: "404", top: "65%", left: "2%", size: "clamp(3rem,7vw,7rem)", opacity: 0.025 },
    { text: "Mpc", top: "88%", left: "30%", size: "clamp(2rem,4vw,4rem)", opacity: 0.03 },
    { text: "LOOP", top: "8%", left: "38%", size: "clamp(2rem,4vw,4rem)", opacity: 0.025 },
    { text: "♭", top: "72%", left: "50%", size: "clamp(3rem,6vw,6rem)", opacity: 0.03 },
    { text: "RUN", top: "30%", left: "60%", size: "clamp(2.5rem,5vw,5rem)", opacity: 0.03 },
    { text: "z=0.404", top: "90%", left: "58%", size: "clamp(1.5rem,3vw,3rem)", opacity: 0.03 },
    { text: "⌀", top: "48%", left: "92%", size: "clamp(2rem,4vw,4rem)", opacity: 0.025 },
];

// ─── Static star positions (seeded, SSR-safe) ────────────────────────────────
// Generated once here as literal values so server & client match perfectly
const STARS = [
    { id: 0, x: 7.2, y: 13.5, s: 1.2, d: 2.1, dl: 0.3 },
    { id: 1, x: 19.8, y: 44.1, s: 0.8, d: 3.5, dl: 1.2 },
    { id: 2, x: 33.4, y: 71.9, s: 1.6, d: 2.8, dl: 0.7 },
    { id: 3, x: 45.1, y: 22.3, s: 0.6, d: 4.1, dl: 2.1 },
    { id: 4, x: 58.7, y: 88.2, s: 1.4, d: 2.4, dl: 0.4 },
    { id: 5, x: 72.3, y: 36.6, s: 1.0, d: 3.2, dl: 1.8 },
    { id: 6, x: 85.9, y: 55.4, s: 1.8, d: 2.6, dl: 0.9 },
    { id: 7, x: 12.6, y: 78.1, s: 0.7, d: 3.9, dl: 3.1 },
    { id: 8, x: 26.4, y: 9.7, s: 1.3, d: 2.2, dl: 0.6 },
    { id: 9, x: 39.2, y: 63.8, s: 0.9, d: 4.3, dl: 1.5 },
    { id: 10, x: 52.8, y: 31.5, s: 1.5, d: 2.7, dl: 0.2 },
    { id: 11, x: 66.1, y: 92.4, s: 0.5, d: 3.7, dl: 2.4 },
    { id: 12, x: 79.5, y: 18.9, s: 1.1, d: 2.3, dl: 0.8 },
    { id: 13, x: 91.3, y: 47.6, s: 1.7, d: 3.0, dl: 1.0 },
    { id: 14, x: 5.4, y: 60.2, s: 0.6, d: 4.5, dl: 3.5 },
    { id: 15, x: 18.2, y: 84.7, s: 1.3, d: 2.5, dl: 0.5 },
    { id: 16, x: 31.9, y: 27.3, s: 0.8, d: 3.8, dl: 2.0 },
    { id: 17, x: 44.7, y: 51.8, s: 1.6, d: 2.1, dl: 0.1 },
    { id: 18, x: 57.3, y: 6.4, s: 1.0, d: 4.0, dl: 1.7 },
    { id: 19, x: 70.8, y: 73.1, s: 1.4, d: 2.9, dl: 0.3 },
    { id: 20, x: 84.2, y: 40.9, s: 0.7, d: 3.4, dl: 2.8 },
    { id: 21, x: 93.6, y: 16.5, s: 1.2, d: 2.6, dl: 0.6 },
    { id: 22, x: 9.1, y: 95.8, s: 1.8, d: 3.1, dl: 1.3 },
    { id: 23, x: 22.5, y: 57.4, s: 0.5, d: 4.2, dl: 3.0 },
    { id: 24, x: 35.8, y: 3.9, s: 1.1, d: 2.4, dl: 0.4 },
    { id: 25, x: 49.3, y: 80.6, s: 1.5, d: 3.6, dl: 1.9 },
    { id: 26, x: 62.7, y: 24.1, s: 0.9, d: 2.2, dl: 0.7 },
    { id: 27, x: 76.4, y: 68.8, s: 1.3, d: 4.4, dl: 2.6 },
    { id: 28, x: 89.8, y: 11.3, s: 0.6, d: 2.8, dl: 0.2 },
    { id: 29, x: 3.2, y: 38.7, s: 1.7, d: 3.3, dl: 1.1 },
    { id: 30, x: 16.6, y: 66.2, s: 1.0, d: 2.0, dl: 0.9 },
    { id: 31, x: 29.9, y: 91.7, s: 1.4, d: 3.9, dl: 2.3 },
    { id: 32, x: 43.4, y: 15.8, s: 0.8, d: 2.7, dl: 0.5 },
    { id: 33, x: 56.8, y: 43.5, s: 1.6, d: 4.1, dl: 3.2 },
    { id: 34, x: 69.2, y: 82.9, s: 0.5, d: 2.5, dl: 0.8 },
    { id: 35, x: 82.6, y: 29.4, s: 1.2, d: 3.5, dl: 1.6 },
    { id: 36, x: 96.0, y: 58.1, s: 1.0, d: 2.3, dl: 0.3 },
    { id: 37, x: 8.3, y: 48.6, s: 1.5, d: 4.6, dl: 2.7 },
    { id: 38, x: 21.7, y: 74.3, s: 0.7, d: 2.9, dl: 1.4 },
    { id: 39, x: 34.1, y: 20.8, s: 1.3, d: 3.7, dl: 0.6 },
    { id: 40, x: 47.5, y: 97.5, s: 1.8, d: 2.1, dl: 2.1 },
    { id: 41, x: 61.9, y: 37.2, s: 0.6, d: 3.0, dl: 0.4 },
    { id: 42, x: 75.3, y: 61.9, s: 1.1, d: 4.3, dl: 1.8 },
    { id: 43, x: 88.7, y: 86.4, s: 1.4, d: 2.6, dl: 0.7 },
    { id: 44, x: 2.1, y: 25.9, s: 0.9, d: 3.8, dl: 2.5 },
    { id: 45, x: 14.4, y: 52.6, s: 1.7, d: 2.4, dl: 1.0 },
    { id: 46, x: 27.8, y: 79.3, s: 0.5, d: 3.2, dl: 0.2 },
    { id: 47, x: 41.2, y: 8.0, s: 1.3, d: 4.5, dl: 1.6 },
    { id: 48, x: 54.6, y: 35.7, s: 1.0, d: 2.8, dl: 3.3 },
    { id: 49, x: 68.0, y: 62.4, s: 1.6, d: 3.6, dl: 0.5 },
];

// ─── Component ────────────────────────────────────────────────────────────────
export default function NotFound() {
    const [glitchRunning, setGlitchRunning] = useState(false);
    const [quoteIndex, setQuoteIndex] = useState(0);
    const [orbitAngle, setOrbitAngle] = useState(0);
    const rafRef = useRef<number>(0);
    const lastRef = useRef<number>(0);
    const containerRef = useRef<HTMLDivElement>(null);

    const glitched404 = useGlitch("404", glitchRunning);

    // Scroll-based parallax for quote section jump
    const { scrollY } = useScroll({ container: containerRef });
    const quoteY = useTransform(scrollY, [0, 200], [0, -30]);

    // Orbit planet
    useEffect(() => {
        const tick = (now: number) => {
            if (now - lastRef.current > 16) {
                setOrbitAngle(a => (a + 0.28) % 360);
                lastRef.current = now;
            }
            rafRef.current = requestAnimationFrame(tick);
        };
        rafRef.current = requestAnimationFrame(tick);
        return () => cancelAnimationFrame(rafRef.current);
    }, []);

    // Cycle quotes
    useEffect(() => {
        const id = setInterval(() => setQuoteIndex(q => (q + 1) % QUOTES.length), 3500);
        return () => clearInterval(id);
    }, []);

    const orbitX = 50 + 40 * Math.cos((orbitAngle * Math.PI) / 180);
    const orbitY = 50 + 20 * Math.sin((orbitAngle * Math.PI) / 180);
    const current = QUOTES[quoteIndex];

    return (
        <>
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Serif+Display:ital@0;1&display=swap');

                @keyframes twinkle {
                    from { opacity: 0.06; transform: scale(0.7); }
                    to   { opacity: 0.7;  transform: scale(1.3); }
                }
                @keyframes glitch1 {
                    0%,89%,100% { opacity:0; transform:translateX(0); }
                    91% { opacity:.7; transform:translateX(-5px); }
                    93% { opacity:.7; transform:translateX(4px); }
                    95% { opacity:0; }
                }
                @keyframes glitch2 {
                    0%,87%,100% { opacity:0; transform:translateX(0); }
                    89% { opacity:.6; transform:translateX(5px); }
                    92% { opacity:.6; transform:translateX(-3px); }
                    94% { opacity:0; }
                }
                @keyframes grainShift {
                    0%   { transform:translate(0,0); }
                    25%  { transform:translate(-4%,3%); }
                    50%  { transform:translate(3%,-4%); }
                    75%  { transform:translate(-3%,4%); }
                    100% { transform:translate(4%,-2%); }
                }
                @keyframes stringVibe {
                    0%,100% { transform:scaleY(1); }
                    30%     { transform:scaleY(5) translateY(-1px); }
                    60%     { transform:scaleY(2.5) translateY(-0.5px); }
                }

                .nf-big {
                    font-family: 'Bebas Neue', sans-serif;
                    position: relative;
                    display: block;
                    line-height: 0.82;
                    color: var(--text-primary);
                }
                .nf-big::before, .nf-big::after {
                    content: attr(data-text);
                    position: absolute; top:0; left:0;
                    font-family: 'Bebas Neue', sans-serif;
                    font-size: inherit;
                    pointer-events: none;
                }
                .nf-big::before {
                    color: var(--accent-glow);
                    clip-path: polygon(0 26%, 100% 26%, 100% 46%, 0 46%);
                    animation: glitch1 5s infinite;
                    opacity: 0;
                }
                .nf-big::after {
                    color: #ff4757;
                    clip-path: polygon(0 56%, 100% 56%, 100% 73%, 0 73%);
                    animation: glitch2 5s 0.7s infinite;
                    opacity: 0;
                }

                .nf-quote-text {
                    font-family: 'DM Serif Display', serif;
                    font-style: italic;
                }

                /* scrollbar hidden on nf-scroll */
                .nf-scroll { overflow-y: auto; scrollbar-width: none; -ms-overflow-style: none; }
                .nf-scroll::-webkit-scrollbar { display: none; }
            `}</style>

            {/* overflow-hidden here so ghost words don't cause scroll */}
            <main
                ref={containerRef}
                className="nf-scroll relative h-screen overflow-hidden bg-base-bg text-text-primary flex flex-col transition-colors duration-300 select-none"
            >
                {/* Grain */}
                <div
                    className="fixed pointer-events-none z-[99] inset-[-50%] w-[200%] h-[200%] opacity-[0.028]"
                    style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
                        animation: "grainShift 0.5s steps(2) infinite",
                    }}
                    aria-hidden
                />

                {/* Stars — static positions, SSR safe */}
                <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden>
                    {STARS.map(s => (
                        <div
                            key={s.id}
                            className="absolute rounded-full bg-text-muted"
                            style={{
                                left: `${s.x}%`, top: `${s.y}%`,
                                width: `${s.s}px`, height: `${s.s}px`,
                                animation: `twinkle ${s.d}s ${s.dl}s infinite ease-in-out alternate`,
                            }}
                        />
                    ))}
                </div>

                {/* Ghost BG words */}
                <div className="absolute inset-0 pointer-events-none overflow-hidden select-none" aria-hidden>
                    {BG_WORDS.map((w, i) => (
                        <div
                            key={i}
                            className="absolute leading-none"
                            style={{
                                top: w.top,
                                left: w.left,
                                fontSize: w.size,
                                opacity: w.opacity,
                                fontFamily: "'Bebas Neue', sans-serif",
                                color: "var(--text-primary)",
                            }}
                        >
                            {w.text}
                        </div>
                    ))}
                </div>

                {/* Basketball court faint lines */}
                <svg
                    className="absolute inset-0 w-full h-full pointer-events-none opacity-[0.035]"
                    viewBox="0 0 1400 800"
                    preserveAspectRatio="xMidYMid slice"
                    aria-hidden
                >
                    <circle cx="700" cy="400" r="130" stroke="currentColor" strokeWidth="1.5" fill="none" />
                    <line x1="700" y1="0" x2="700" y2="800" stroke="currentColor" strokeWidth="1" />
                    <rect x="50" y="250" width="200" height="300" stroke="currentColor" strokeWidth="1.5" fill="none" />
                    <rect x="1150" y="250" width="200" height="300" stroke="currentColor" strokeWidth="1.5" fill="none" />
                    <path d="M 250 280 Q 400 400 250 520" stroke="currentColor" strokeWidth="1.5" fill="none" />
                    <path d="M 1150 280 Q 1000 400 1150 520" stroke="currentColor" strokeWidth="1.5" fill="none" />
                </svg>

                {/* ──────────── MAIN CONTENT ──────────── */}
                <div className="relative z-10 flex-1 flex flex-col justify-center px-4 sm:px-8 md:px-12 lg:px-16 xl:px-24 py-8 max-w-[1600px] mx-auto w-full">

                    {/* Error tag */}
                    <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.05 }}
                        className="font-mono text-[0.55rem] sm:text-[0.6rem] tracking-[0.25em] uppercase text-accent mb-4 sm:mb-6"
                    >
                        [ error / page_not_found / rsd.exe ]
                    </motion.p>

                    {/* ── Responsive two-column grid on lg+ ── */}
                    <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-6 lg:gap-12 xl:gap-20 items-end">

                        {/* LEFT: 404 + subtitle + CTA */}
                        <div className="flex flex-col">
                            {/* Giant 404 */}
                            <motion.div
                                initial={{ opacity: 0, x: -24 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.7, delay: 0.15 }}
                                className="relative mb-3 sm:mb-4 cursor-pointer select-none w-fit"
                                onMouseEnter={() => setGlitchRunning(true)}
                                onMouseLeave={() => setGlitchRunning(false)}
                            >
                                {/* Orbiting planet */}
                                <div className="absolute inset-0 pointer-events-none" aria-hidden>
                                    <div
                                        className="absolute w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full -translate-x-1/2 -translate-y-1/2"
                                        style={{
                                            left: `${orbitX}%`,
                                            top: `${orbitY}%`,
                                            background: "radial-gradient(circle at 35% 35%, var(--accent-soft), var(--accent-main))",
                                            boxShadow: "0 0 10px var(--accent-glow)",
                                        }}
                                    />
                                </div>

                                <span
                                    className="nf-big"
                                    data-text={glitched404}
                                    style={{ fontSize: "clamp(7rem,22vw,22rem)" }}
                                >
                                    {glitched404}
                                </span>
                            </motion.div>

                            {/* Subtitle */}
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.35 }}
                                className="mb-6 sm:mb-10 max-w-xl"
                            >
                                <p className="text-text-primary text-xl sm:text-2xl lg:text-3xl xl:text-4xl leading-snug font-semibold">
                                    Didn't find what you were looking for?
                                </p>
                                <p className="text-text-primary text-base sm:text-lg lg:text-xl xl:text-2xl mt-2 font-light italic opacity-75">
                                    Maybe the universe hasn't rendered it yet.
                                </p>
                            </motion.div>

                            {/* CTA */}
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.55 }}
                                className="self-start"
                            >
                                <Link
                                    href="/"
                                    className="group inline-flex items-center w-fit text-[0.7rem] sm:text-[1rem] tracking-[0.18em] uppercase relative overflow-hidden font-inter font-black"
                                >
                                    <NoiseBackground
                                        containerClassName="w-fit p-2 rounded-full border border-text-muted mx-auto bg-text-muted "
                                        gradientColors={["var(--accent-main)", "var(--accent-glow)", "var(--accent-hover)"]}
                                    >
                                        <button className="h-full w-full cursor-pointer rounded-full bg-linear-to-r from-neutral-100 via-neutral-100 to-white px-4 py-2 text-black shadow-[0px_2px_0px_0px_var(--color-neutral-50)_inset,0px_0.5px_1px_0px_var(--color-neutral-400)] transition-all duration-100 active:scale-98 dark:from-black dark:via-black dark:to-neutral-900 dark:text-white dark:shadow-[0px_1px_0px_0px_var(--color-neutral-950)_inset,0px_1px_0px_0px_var(--color-neutral-800)]">
                                            Back to Home
                                        </button>
                                    </NoiseBackground>
                                </Link>
                            </motion.div>
                        </div>

                        {/* RIGHT: Flowing quote — visible on lg+, stacked below on mobile */}
                        <motion.div
                            style={{ y: quoteY }}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.7, delay: 0.45 }}
                            className="lg:max-w-[380px] xl:max-w-[440px] w-full pb-2"
                        >
                            {/* Quotation mark */}
                            <div
                                className="nf-quote-text text-accent leading-none mb-2 sm:mb-3"
                                style={{ fontSize: "clamp(4rem,8vw,6rem)", opacity: 0.25 }}
                                aria-hidden
                            >
                                &ldquo;
                            </div>

                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={quoteIndex}
                                    initial={{ opacity: 0, y: 14 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -14 }}
                                    transition={{ duration: 0.38 }}
                                >
                                    {/* Quote text */}
                                    <p
                                        className="nf-quote-text text-text-primary leading-snug mb-4 sm:mb-5"
                                        style={{ fontSize: "clamp(1.1rem,2.2vw,1.6rem)" }}
                                    >
                                        {current.text}
                                    </p>

                                    {/* Author */}
                                    <p className="font-mono text-[0.62rem] sm:text-[0.68rem] tracking-[0.18em] text-text-muted uppercase">
                                        {current.author}
                                    </p>
                                </motion.div>
                            </AnimatePresence>

                            {/* Progress bar */}
                            <div className="flex gap-1.5 mt-5 sm:mt-6">
                                {QUOTES.map((_, i) => (
                                    <div
                                        key={i}
                                        className="h-[3px] rounded-full transition-all duration-500"
                                        style={{
                                            width: i === quoteIndex ? "18px" : "4px",
                                            background: i === quoteIndex ? "var(--accent-main)" : "var(--border-subtle)",
                                        }}
                                    />
                                ))}
                            </div>
                        </motion.div>

                    </div>
                </div>

                {/* ──────────── BOTTOM BAR ──────────── */}
                <motion.footer
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.6, delay: 1.0 }}
                    className="relative z-10 border-t border-border-subtle px-4 sm:px-8 md:px-12 lg:px-16 xl:px-24 py-4 sm:py-5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-1.5 sm:gap-2 text-[0.52rem] sm:text-[0.8rem] tracking-[0.15em] sm:tracking-[0.18em] italic text-text-muted"
                >
                    <span className="font-mono font-extrabold">rsd.exe © 2026</span>
                    <span className="text-text-secondary font-roboto">HTTP 404 — NOT FOUND</span>
                    <span className="font-roboto sm:block normal-case tracking-normal italic font-extrabold text-[0.75rem] sm:text-[1rem] text-text-muted">
                        &ldquo;Not all those who wander are lost.&rdquo; — Tolkien
                    </span>
                </motion.footer>

                {/* Guitar string */}
                <div
                    className="absolute bottom-0 left-0 right-0 h-px pointer-events-none"
                    style={{
                        background: "linear-gradient(90deg, transparent, var(--accent-glow), var(--accent-soft), var(--accent-glow), transparent)",
                        animation: "stringVibe 2.5s ease-in-out infinite",
                    }}
                    aria-hidden
                />
            </main>
        </>
    );
}