"use client";

import ScrollReveal from "../ui/ScrollReveal";
import { skillCategories } from "@/data/skills";

const allSkills = skillCategories.flatMap((cat) => cat.skills);

// split into two rows for opposing marquees
const rowA = allSkills.filter((_, i) => i % 2 === 0);
const rowB = allSkills.filter((_, i) => i % 2 === 1);

function MarqueeRow({
  items,
  reverse = false,
}: {
  items: typeof allSkills;
  reverse?: boolean;
}) {
  // Repeat each set enough to span wide viewports, then duplicate the whole
  // set once so translateX(-50%) loops seamlessly with no gap.
  const set = [...items, ...items, ...items];
  const track = [...set, ...set];
  return (
    <div className="marquee-mask marquee-paused overflow-hidden py-2">
      <div
        className="marquee-track gap-3"
        style={reverse ? { animationDirection: "reverse" } : undefined}
      >
        {track.map((s, i) => (
          <div
            key={`${s.name}-${i}`}
            className="card flex items-center gap-3 px-5 py-3.5 shrink-0"
            aria-hidden={i >= set.length}
          >
            <span className="text-xl text-text-secondary">{s.icon}</span>
            <span className="text-sm font-medium text-text-primary whitespace-nowrap">
              {s.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function SkillsSection() {
  return (
    <section id="skills" className="relative py-24 sm:py-36 overflow-hidden">
      <div className="max-w-5xl mx-auto px-6 sm:px-8 mb-12">
        <ScrollReveal>
          <p className="eyebrow mb-6">Stack</p>
          <h2 className="display text-3xl sm:text-4xl md:text-5xl font-semibold text-text-primary max-w-2xl">
            Tools that power my every day.
          </h2>
          <p className="mt-6 text-text-secondary max-w-xl">
            A focused set of technologies for building and shipping full-stack
            web applications.
          </p>
        </ScrollReveal>
      </div>

      <ScrollReveal delay={0.1} direction="fade">
        <div className="flex flex-col gap-3">
          <MarqueeRow items={rowA} />
          <MarqueeRow items={rowB} reverse />
        </div>
      </ScrollReveal>
    </section>
  );
}
