"use client";

import { motion } from "framer-motion";
import ScrollReveal from "../ui/ScrollReveal";

const steps = [
  {
    no: "01",
    title: "Discovery",
    desc: "We talk through goals, scope, and the problem to solve. I turn the requirements into a clear plan.",
  },
  {
    no: "02",
    title: "Build",
    desc: "I handle it end-to-end — interface, API, and integration — with regular updates so you always know the progress.",
  },
  {
    no: "03",
    title: "Ship & iterate",
    desc: "Deploy to production, watch performance, then refine and grow it based on real feedback.",
  },
];

const ease = [0.22, 1, 0.36, 1] as const;

export default function ProcessSection() {
  return (
    <section id="process" className="relative py-24 sm:py-32 bg-bg-secondary border-y border-[rgba(255,255,255,0.06)]">
      <div className="max-w-6xl mx-auto px-6 sm:px-8">
        <ScrollReveal>
          <p className="eyebrow mb-6">How it works</p>
          <h2 className="display text-3xl sm:text-4xl md:text-5xl font-light text-text-primary max-w-2xl">
            How it works — simple, fast, no back-and-forth.
          </h2>
        </ScrollReveal>

        <div className="mt-16 grid md:grid-cols-3 gap-x-8 gap-y-12 relative">
          {steps.map((step, i) => (
            <motion.div
              key={step.no}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: i * 0.12, ease }}
              className="relative"
            >
              {/* connector dot row */}
              <div className="flex items-center gap-3 mb-6">
                <span className="text-sm font-mono text-accent font-medium tracking-widest">
                  {step.no}
                </span>
                <span className="flex-1 h-px bg-[rgba(255,255,255,0.06)]" />
                <span className="w-2.5 h-2.5 rounded-full border-2 border-accent" />
              </div>
              <h3 className="text-xl font-semibold text-text-primary">
                {step.title}
              </h3>
              <p className="mt-3 text-text-secondary leading-relaxed">
                {step.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
