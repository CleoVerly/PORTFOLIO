"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

const links = [
  { label: "Work", href: "#work" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    document.getElementById(href.replace("#", ""))?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <>
      <motion.header
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="fixed top-0 left-0 right-0 z-50 px-6 sm:px-10 pt-6"
      >
        <nav
          className="flex items-center justify-between max-w-7xl mx-auto rounded-2xl"
          style={{
            background: scrolled ? "rgba(20,20,22,0.45)" : "transparent",
            backdropFilter: scrolled ? "blur(20px)" : "blur(0px)",
            WebkitBackdropFilter: scrolled ? "blur(20px)" : "blur(0px)",
            border: scrolled ? "1px solid rgba(255,255,255,0.06)" : "1px solid transparent",
            padding: scrolled ? "12px 24px" : "16px 0",
            transition: "all 0.6s cubic-bezier(0.16, 1, 0.3, 1)",
          }}
        >
          {/* Brand */}
          <Link href="/"
            className="font-display font-light text-xl tracking-[0.15em] uppercase"
            style={{ color: "var(--text-1)", letterSpacing: "0.2em", fontSize: "0.9rem" }}
          >
            Cleoverly
          </Link>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-8">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={(e) => scrollTo(e, l.href)}
                className="text-sm font-light tracking-wide transition-colors duration-200"
                style={{ color: "var(--text-2)", letterSpacing: "0.06em" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "var(--text-1)")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-2)")}
              >
                {l.label}
              </a>
            ))}
          </div>

          {/* Right — social icon + contact */}
          <div className="hidden md:flex items-center gap-5">
            <a
              href="https://github.com/cleoverly"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              style={{ color: "var(--text-3)" }}
              className="hover:text-[var(--text-1)] transition-colors"
            >
              <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
            </a>
            <a
              href="#contact"
              onClick={(e) => scrollTo(e, "#contact")}
              className="annotation text-xs"
              style={{ padding: "8px 18px" }}
            >
              Let&apos;s talk
              <span className="annotation-arrow">↗</span>
            </a>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden flex flex-col gap-1.5 p-2"
            aria-label="Menu"
          >
            <motion.span animate={menuOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }} className="w-5 h-px block" style={{ background: "var(--text-1)" } as any} />
            <motion.span animate={menuOpen ? { opacity: 0 } : { opacity: 1 }} className="w-5 h-px block" style={{ background: "var(--text-1)" } as any} />
            <motion.span animate={menuOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }} className="w-5 h-px block" style={{ background: "var(--text-1)" } as any} />
          </button>
        </nav>
      </motion.header>

      {/* Mobile drawer */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-40 md:hidden flex flex-col justify-center px-10"
            style={{ background: "rgba(20,20,22,0.97)", backdropFilter: "blur(20px)" } as any}
          >
            <div className="flex flex-col gap-8">
              {links.map((l, i) => (
                <motion.a
                  key={l.href}
                  href={l.href}
                  onClick={(e) => scrollTo(e, l.href)}
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.07, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  className="display-section text-4xl"
                >
                  {l.label}
                </motion.a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
