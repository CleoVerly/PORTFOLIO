"use client";

import { motion } from "framer-motion";
import { FiLayout, FiServer, FiCpu, FiBarChart2 } from "react-icons/fi";
import ScrollReveal from "../ui/ScrollReveal";

const services = [
  {
    icon: <FiLayout />,
    title: "Web App Development",
    desc: "Modern, fast, responsive interfaces built with Next.js, React, and TypeScript.",
  },
  {
    icon: <FiServer />,
    title: "Backend & APIs",
    desc: "Clean, well-structured REST APIs with Laravel, Node.js, or Flask.",
  },
  {
    icon: <FiCpu />,
    title: "AI / ML Integration",
    desc: "Bringing machine-learning models into products — from classification to recommendations.",
  },
  {
    icon: <FiBarChart2 />,
    title: "Data & Dashboards",
    desc: "Data analysis and interactive dashboards that turn numbers into decisions.",
  },
];

const ease = [0.22, 1, 0.36, 1] as const;

export default function ServicesSection() {
  return (
    <section id="services" className="relative py-24 sm:py-32">
      <div className="max-w-6xl mx-auto px-6 sm:px-8">
        <ScrollReveal>
          <p className="eyebrow mb-6">What I do</p>
          <h2 className="display text-3xl sm:text-4xl md:text-5xl font-light text-text-primary max-w-2xl">
            Covering everything from early ideas to polished, shipped results.
          </h2>
        </ScrollReveal>

        <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {services.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: i * 0.08, ease }}
              whileHover={{ y: -4 }}
              className="card p-6 flex flex-col group"
            >
              <div className="w-11 h-11 rounded-xl bg-bg-tertiary border border-[rgba(201,169,110,0.15)] flex items-center justify-center text-xl text-accent mb-5 group-hover:border-[rgba(201,169,110,0.35)] group-hover:bg-[rgba(201,169,110,0.08)] transition-all duration-300">
                {s.icon}
              </div>
              <h3 className="text-base font-semibold text-text-primary">
                {s.title}
              </h3>
              <p className="mt-2 text-sm text-text-secondary leading-relaxed">
                {s.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
