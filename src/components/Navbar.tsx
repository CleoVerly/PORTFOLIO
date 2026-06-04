"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useMotionValue, useTransform, useAnimationFrame } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

const navLinks = [
  { label: "Home", href: "#hero" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

// Duplicate links to fill the 360 wheel
const wheelLinks = [...navLinks, ...navLinks, ...navLinks]; 
// 15 items total, 360/15 = 24 degrees apart. This ensures a densely populated wheel.

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");

  useEffect(() => {
    const handleScroll = () => {
      // Detect active section
      const sections = navLinks.map((l) => l.href.replace("#", ""));
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 150) {
            setActiveSection(sections[i]);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const id = href.replace("#", "");
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
    setMobileOpen(false);
  };

  return (
    <>
      {/* Desktop Wheel Sidebar */}
      <DesktopWheel activeSection={activeSection} onNavClick={handleNavClick} />

      {/* Mobile Navbar (Standard fixed top) */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass py-4 md:hidden">
        <div className="px-6 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="relative group flex items-center">
            <Image 
              src="/CLEOVERLY.svg" 
              alt="CLEOVERLY" 
              width={140} 
              height={32} 
              className="w-auto h-6 object-contain"
              priority
            />
          </Link>

          {/* Mobile Toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="relative w-8 h-8 flex flex-col items-center justify-center gap-1.5"
            aria-label="Toggle menu"
          >
            <motion.span
              animate={mobileOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
              className="w-6 h-0.5 bg-text-primary rounded-full block"
            />
            <motion.span
              animate={mobileOpen ? { opacity: 0, x: -20 } : { opacity: 1, x: 0 }}
              className="w-6 h-0.5 bg-text-primary rounded-full block"
            />
            <motion.span
              animate={mobileOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
              className="w-6 h-0.5 bg-text-primary rounded-full block"
            />
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 md:hidden"
            style={{ 
              paddingTop: "80px",
              background: "rgba(5, 5, 5, 0.95)",
              backdropFilter: "blur(20px)",
            }}
          >
            <div className="flex flex-col items-center gap-6 p-8">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08 }}
                  className={`text-xl font-medium transition-colors ${
                    activeSection === link.href.replace("#", "")
                      ? "gradient-text"
                      : "text-text-secondary hover:text-text-primary"
                  }`}
                >
                  {link.label}
                </motion.a>
              ))}
              <Link
                href="/projects"
                className="btn-primary mt-4 w-full text-center"
                onClick={() => setMobileOpen(false)}
              >
                All Projects
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

// ---------------------------------------------------------
// DESKTOP WHEEL COMPONENT
// ---------------------------------------------------------

function DesktopWheel({ 
  activeSection, 
  onNavClick 
}: { 
  activeSection: string;
  onNavClick: (e: React.MouseEvent<HTMLAnchorElement>, href: string) => void;
}) {
  const [isHovered, setIsHovered] = useState(false);
  const rotation = useMotionValue(0);
  const targetSpeed = useRef(0);

  useAnimationFrame((time, delta) => {
    if (isHovered) {
      rotation.set(rotation.get() + (targetSpeed.current * delta * 0.03));
    } else {
      // Slow down gradually when not hovered
      targetSpeed.current *= 0.9;
      if (Math.abs(targetSpeed.current) > 0.01) {
        rotation.set(rotation.get() + (targetSpeed.current * delta * 0.03));
      }
    }
  });

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const centerY = rect.top + rect.height / 2;
    const distanceY = e.clientY - centerY;
    const normalizedY = distanceY / (rect.height / 2); // -1 to 1
    // Invert the speed and apply a curve (squared) so hovering near center is much slower
    targetSpeed.current = - (normalizedY * Math.abs(normalizedY)) * 1.2; 
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    targetSpeed.current = 0; // Stop eventually
  };

  // Invert rotation so text stays upright
  const invertedRotation = useTransform(rotation, (r) => -r);

  return (
    <div 
      className={`fixed left-0 top-0 bottom-0 z-50 hidden md:block transition-all duration-300 ease-out ${isHovered ? 'w-[600px]' : 'w-[160px]'}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
      style={{
        // Gradient mask to fade out items at the top and bottom edges smoothly
        maskImage: "linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%)",
        WebkitMaskImage: "linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%)",
      }}
    >
      {/* Center Pivot Point (off-screen to the left) */}
      <div className="absolute top-1/2 left-[-120px] w-0 h-0 flex items-center justify-center">
        
        {/* The Rotating Wheel */}
        <motion.div 
          className="relative" 
          style={{ rotate: rotation }}
        >
          {wheelLinks.map((link, i) => {
            const baseAngle = (i * 360) / wheelLinks.length;
            const radius = isHovered ? 320 : 220; // Expanded sizes
            const radians = baseAngle * (Math.PI / 180);
            
            const targetX = Math.cos(radians) * radius;
            const targetY = Math.sin(radians) * radius;
            
            const isActive = activeSection === link.href.replace("#", "");

            return (
              <motion.div
                key={`${link.label}-${i}`}
                className="absolute left-0 top-0 pointer-events-none"
                style={{ rotate: invertedRotation }}
                animate={{ 
                  x: targetX, 
                  y: targetY, 
                  opacity: isHovered ? 1 : 0.7,
                  scale: isHovered ? 1 : 0.85
                }}
                transition={{ type: "spring", stiffness: 200, damping: 25 }}
              >
                {/* The actual clickable item, shifted to center itself */}
                <div className="absolute -translate-x-1/2 -translate-y-1/2 pointer-events-auto">
                  <a
                    href={link.href}
                    onClick={(e) => onNavClick(e, link.href)}
                    className={`flex items-center justify-center px-5 py-2.5 rounded-full transition-all duration-300 font-medium whitespace-nowrap border backdrop-blur-md hover:scale-110 hover:-translate-y-0.5
                      ${isActive 
                        ? "bg-accent/20 border-accent text-accent-bright shadow-[0_0_20px_rgba(0,230,118,0.3)]" 
                        : "bg-bg-secondary/80 border-border text-text-secondary hover:text-text-primary hover:border-accent-dim hover:bg-bg-tertiary"
                      }
                    `}
                  >
                    {link.label}
                  </a>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Center decorative hub (optional, just for visual anchor) */}
        <motion.div 
          className="absolute w-12 h-12 rounded-full border border-border bg-bg-secondary/50 backdrop-blur-md"
          animate={{ scale: isHovered ? 1.2 : 1, opacity: isHovered ? 1 : 0.3 }}
        >
          <div className="absolute inset-2 rounded-full bg-accent/20" />
        </motion.div>

      </div>
    </div>
  );
}
