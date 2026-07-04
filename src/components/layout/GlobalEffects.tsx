"use client";

import { useEffect } from "react";
import { motion, useScroll, useSpring } from "framer-motion";

export default function GlobalEffects() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Soft cursor follower
  const cursorX = useSpring(-100, { stiffness: 200, damping: 25 });
  const cursorY = useSpring(-100, { stiffness: 200, damping: 25 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      cursorX.set(e.clientX - 12);
      cursorY.set(e.clientY - 12);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [cursorX, cursorY]);

  return (
    <>
      {/* Scroll Progress - Ultra thin line at the very top */}
      <motion.div
        className="fixed top-0 left-0 right-0 origin-left z-[100]"
        style={{ 
          scaleX, 
          height: "1.5px", 
          background: "var(--gold)",
          boxShadow: "0 0 10px var(--gold)"
        }}
      />
      
      {/* Soft Cursor Follower (Doesn't hide default cursor) */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[99] hidden lg:block rounded-full"
        style={{
          width: 24,
          height: 24,
          border: "1px solid rgba(230,192,141,0.5)", // Gold-ish border
          x: cursorX,
          y: cursorY,
        }}
      />
    </>
  );
}
