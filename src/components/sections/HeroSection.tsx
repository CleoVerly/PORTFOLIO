"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import Image from "next/image";

const ease = [0.22, 1, 0.36, 1] as const;

/* Floating annotation label — like "Portable Design" in the reference */
function Annotation({
  children,
  className,
  delay = 0,
  style,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  style?: React.CSSProperties;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16, filter: "blur(10px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      transition={{ delay, duration: 0.8, ease }}
      className={`annotation absolute overflow-hidden group ${className}`}
      style={style as any}
    >
      {children}
      <span className="annotation-arrow">↗</span>
    </motion.div>
  );
}

/* Minimal Stat line */
function Stat({ number, text, delay = 0 }: { number: string; text: string; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16, filter: "blur(10px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      transition={{ delay, duration: 0.6, ease }}
      className="flex flex-col gap-2"
    >
      <span className="text-4xl font-light" style={{ color: "var(--gold)" }}>{number}</span>
      <span className="text-xs uppercase tracking-[0.2em]" style={{ color: "var(--text-2)" }}>{text}</span>
    </motion.div>
  );
}

export default function HeroSection() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  
  // Subtle scroll translation for the lantern
  const imageY = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  // Subtle Mouse Parallax & Cursor Glow
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const mouseX = useSpring(0, { stiffness: 40, damping: 20 });
  const mouseY = useSpring(0, { stiffness: 40, damping: 20 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Normalize mouse position between -1 and 1
      const x = (e.clientX / window.innerWidth - 0.5) * 2;
      const y = (e.clientY / window.innerHeight - 0.5) * 2;
      setMousePos({ x: e.clientX, y: e.clientY });
      mouseX.set(x);
      mouseY.set(y);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  // 3-5px translation for luxury feel
  const parallaxX = useTransform(mouseX, [-1, 1], [-5, 5]);
  const parallaxY = useTransform(mouseY, [-1, 1], [-5, 5]);
  
  // Parallax for background glow (moves slightly opposite to lantern)
  const bgParallaxX = useTransform(mouseX, [-1, 1], [8, -8]);
  const bgParallaxY = useTransform(mouseY, [-1, 1], [8, -8]);

  return (
    <section
      ref={ref}
      id="hero"
      className="relative w-full overflow-hidden h-screen sm:h-[100svh] flex items-center justify-center"
      style={{
        background: "radial-gradient(ellipse 80% 80% at 50% -20%, rgba(255,255,255,0.03) 0%, transparent 100%)", // Top vignette
      }}
    >
      {/* ── Cursor Glow ── */}
      <motion.div
        className="pointer-events-none fixed top-0 left-0 w-[500px] h-[500px] rounded-full hidden lg:block"
        style={{
          background: "radial-gradient(circle, rgba(230,192,141,0.02) 0%, transparent 60%)",
          x: mousePos.x - 250,
          y: mousePos.y - 250,
          zIndex: 1,
        } as any}
      />

      {/* ── Massive Ambient Room Lighting ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 1.2, ease }}
        className="absolute pointer-events-none animate-glow"
        style={{
          top: "45%",
          left: "50%",
          x: "-50%",
          y: "-50%",
          translateX: bgParallaxX,
          translateY: bgParallaxY,
          width: "90vw", // Huge to illuminate the background
          height: "90vh",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(230,192,141,0.07) 0%, rgba(230,192,141,0.02) 40%, transparent 70%)",
          filter: "blur(80px)",
          zIndex: 2,
        } as any}
      />

      {/* ── MAIN LAYOUT ── */}
      <motion.div style={{ opacity } as any} className="relative h-full w-full max-w-[1600px] mx-auto flex items-center justify-center">
        
        {/* ── GIANT TYPOGRAPHY (Obscured by lantern) ── */}
        <motion.div
          className="absolute top-0 left-0 w-full h-full flex flex-col justify-center items-center pointer-events-none select-none z-0"
        >
          {/* Cleo */}
          <motion.h1
            initial={{ opacity: 0, filter: "blur(16px)", scale: 0.95 }}
            animate={{ opacity: 1, filter: "blur(0px)", scale: 1 }}
            transition={{ delay: 0.4, duration: 1, ease }}
            className="display-hero w-full text-center"
            style={{
              fontSize: "clamp(8rem, 22vw, 280px)",
              marginRight: "15%", // Offset left
              marginTop: "-10vh",
            } as any}
          >
            Cleo
          </motion.h1>

          {/* Verly */}
          <motion.h1
            initial={{ opacity: 0, filter: "blur(16px)", scale: 0.95 }}
            animate={{ opacity: 1, filter: "blur(0px)", scale: 1 }}
            transition={{ delay: 0.5, duration: 1, ease }}
            className="display-hero w-full text-center hidden sm:block"
            style={{
              fontSize: "clamp(8rem, 22vw, 280px)",
              marginLeft: "15%", // Offset right
              marginTop: "-8vh",
            } as any}
          >
            Verly
          </motion.h1>
        </motion.div>

        {/* ── CENTRAL LANTERN IMAGE with Parallax & Hover Animation ── */}
        <motion.div
          className="absolute top-0 left-0 w-full h-full flex items-center justify-center pointer-events-none z-10"
          style={{ x: parallaxX, y: parallaxY }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, filter: "blur(20px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            transition={{ delay: 0, duration: 1.5, ease }}
            style={{ y: imageY }}
            className="relative"
          >
            <div className="animate-float relative">
              <div
                className="relative pointer-events-none select-none"
                style={{
                  width: "clamp(300px, 45vw, 650px)",
                  height: "clamp(400px, 60vw, 850px)",
                }}
              >
                <Image
                  src="/lantern.png"
                  alt=""
                  fill
                  draggable={false}
                  className="object-contain drop-shadow-2xl pointer-events-none select-none"
                  style={{ mixBlendMode: "lighten" }}
                  priority
                  quality={100}
                />
              </div>
              
              {/* Soft Ground Shadow directly under the lantern base */}
              <div 
                className="absolute left-1/2 -translate-x-1/2"
                style={{
                  bottom: "8%",
                  width: "50%",
                  height: "20px",
                  background: "rgba(0,0,0,0.8)",
                  borderRadius: "50%",
                  filter: "blur(15px)",
                  zIndex: -1,
                }}
              />
            </div>
          </motion.div>
        </motion.div>

        {/* ── FLOATING ANNOTATION LABELS ── */}
        {/* Top right: tech */}
        <Annotation
          delay={0.6}
          className="hidden lg:flex"
          style={{ top: "22%", left: "68%", zIndex: 20 }}
        >
          Built with Next.js
        </Annotation>

        {/* Left center: location */}
        <Annotation
          delay={0.65}
          className="hidden lg:flex"
          style={{ top: "48%", left: "15%", zIndex: 20 }}
        >
          Based in Indonesia
        </Annotation>

        {/* Bottom left: status */}
        <Annotation
          delay={0.7}
          className="hidden lg:flex"
          style={{ top: "72%", left: "20%", zIndex: 20 }}
        >
          Open for Freelance
        </Annotation>

        {/* ── LEFT SIDE STATS (Minimal) ── */}
        <motion.div
          className="absolute bottom-16 left-16 flex flex-col gap-12 z-20 hidden lg:flex"
        >
          <Stat number="04" text="Years Experience" delay={0.7} />
          <Stat number="20+" text="Projects Delivered" delay={0.75} />
        </motion.div>

        {/* ── RIGHT SIDE CTA (Floating near lantern) ── */}
        <motion.div
          initial={{ opacity: 0, y: 16, filter: "blur(10px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ delay: 0.8, duration: 0.8, ease }}
          className="absolute z-20 hidden lg:flex"
          style={{ top: "68%", left: "68%" } as any}
        >
          <a href="#work" onClick={(e) => { e.preventDefault(); document.getElementById("work")?.scrollIntoView({ behavior: "smooth" }); }}>
            <div className="btn-circle">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" style={{ color: "var(--text-1)" }}>
                <rect x="2" y="7" width="20" height="14" rx="2" />
                <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
              </svg>
              <span style={{ fontSize: "0.65rem", letterSpacing: "0.1em", color: "var(--text-2)", marginTop: "4px" }}>
                VIEW WORK
              </span>
            </div>
          </a>
        </motion.div>

        {/* Tagline at bottom right */}
        <motion.div
          initial={{ opacity: 0, filter: "blur(10px)" }}
          animate={{ opacity: 1, filter: "blur(0px)" }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="absolute bottom-16 right-16 z-20 hidden sm:block"
        >
          <h2
            className="text-2xl font-light leading-snug text-right max-w-[280px]"
            style={{ color: "var(--text-1)" }}
          >
            Beautiful interfaces.<br/>
            <span style={{ color: "var(--text-2)" }}>Reliable engineering.</span>
          </h2>
        </motion.div>

        {/* ── MOBILE CTA ── */}
        <motion.div
          initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ delay: 1.5, duration: 0.8, ease }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-4 sm:hidden z-20"
        >
          <a href="#work" className="btn-ghost text-sm px-6 py-3">View Work</a>
          <a href="#contact" className="btn-gold text-sm px-6 py-3">Hire Me</a>
        </motion.div>

      </motion.div>
    </section>
  );
}
