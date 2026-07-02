"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ScrollReveal from "../ui/ScrollReveal";

const faqs = [
  {
    q: "What kind of projects do you take on?",
    a: "Full-stack web apps, landing pages, AI-powered tools, and data dashboards — from small builds to products that need frontend, backend, and integration all at once.",
  },
  {
    q: "Which tech stack do you use?",
    a: "Frontend: Next.js, React, and TypeScript. Backend: Laravel, Node.js, or Flask. For data and AI work I use Python and its ecosystem. The stack always fits the needs of the project.",
  },
  {
    q: "How long does a typical project take?",
    a: "It depends on scope. A landing page can take a few days, while a full application can take a few weeks. After discovery, I give a clear time estimate before we start.",
  },
  {
    q: "How do we communicate during a project?",
    a: "I send regular updates at every milestone through your preferred channel (email or chat). You always know the progress and can give feedback any time.",
  },
  {
    q: "Are you available for freelance work?",
    a: "Yes. I'm open to freelance, collaborations, or just a good conversation about an idea. The fastest way to reach me is email.",
  },
];

function FaqItem({
  faq,
  isOpen,
  onToggle,
}: {
  faq: { q: string; a: string };
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="border-b border-[rgba(255,255,255,0.07)]">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between gap-4 py-5 text-left group"
        aria-expanded={isOpen}
      >
        <span
          className={`text-base sm:text-lg font-medium transition-colors ${
            isOpen ? "text-text-primary" : "text-text-secondary group-hover:text-text-primary"
          }`}
        >
          {faq.q}
        </span>
        <motion.span
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          className={`shrink-0 w-7 h-7 rounded-full border flex items-center justify-center transition-all duration-300 ${
            isOpen
              ? "border-accent text-accent bg-[rgba(201,169,110,0.1)]"
              : "border-[rgba(255,255,255,0.1)] text-text-muted"
          }`}
        >
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <path d="M12 5v14M5 12h14" />
          </svg>
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <p className="pb-6 pr-10 text-text-secondary leading-relaxed max-w-2xl">
              {faq.a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="relative py-24 sm:py-32">
      <div className="max-w-3xl mx-auto px-6 sm:px-8">
        <ScrollReveal>
          <p className="eyebrow mb-6">FAQ</p>
          <h2 className="display text-3xl sm:text-4xl md:text-5xl font-light text-text-primary mb-12">
            Some things you might be wondering.
          </h2>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <div>
            {faqs.map((faq, i) => (
              <FaqItem
                key={i}
                faq={faq}
                isOpen={openIndex === i}
                onToggle={() => setOpenIndex(openIndex === i ? null : i)}
              />
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
