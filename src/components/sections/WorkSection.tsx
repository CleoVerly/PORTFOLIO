"use client";

import { useRef } from "react";
import { motion, useInView, useMotionValue, useMotionTemplate, useScroll, useTransform } from "framer-motion";
import { projects } from "@/data/projects";

const ease = [0.22, 1, 0.36, 1] as const;

/* Staggered word animation helper */
function WordReveal({ text, delay = 0 }: { text: string; delay?: number }) {
  const words = text.split(" ");
  return (
    <span className="inline-block">
      {words.map((word, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.8, delay: delay + i * 0.1, ease }}
          className="inline-block mr-[0.25em]"
        >
          {word}
        </motion.span>
      ))}
    </span>
  );
}

function ProjectItem({
  project,
  index,
}: {
  project: (typeof projects)[0];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      initial={{ opacity: 0, y: 50, filter: "blur(10px)", rotateX: 0, rotateY: 0 }}
      animate={inView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
      whileHover={{ y: -4, rotateX: 1, rotateY: -1 }}
      transition={{ duration: 1, delay: index * 0.15, ease }}
      className="card-dark group relative overflow-hidden flex flex-col h-full"
      style={{ transformStyle: "preserve-3d" } as any}
    >
      {/* 4% Spotlight following cursor */}
      <motion.div 
        className="absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-500"
        style={{
          background: useMotionTemplate`radial-gradient(circle 350px at ${mouseX}px ${mouseY}px, rgba(230,192,141,0.04), transparent 80%)`,
          zIndex: 1
        } as any}
      />

      {/* Top meta row */}
      <div
        className="flex items-center justify-between px-8 pt-8 pb-6 relative z-10"
        style={{ borderBottom: "1px solid var(--border)" }}
      >
        <span className="label text-gold" style={{ color: "var(--gold)" }}>
          {String(index + 1).padStart(2, "0")}
        </span>
        <span
          className="text-xs font-light tracking-widest uppercase"
          style={{ color: "var(--text-3)", letterSpacing: "0.12em" }}
        >
          {project.category}
        </span>
      </div>

      {/* Main content */}
      <div className="px-8 py-8 flex flex-col flex-grow relative z-10">
        <h3
          className="display-section text-3xl sm:text-4xl mb-4 group-hover:text-gold group-hover:-translate-y-[2px] transition-all duration-500"
          style={{ fontWeight: 300 }}
        >
          {project.title}
        </h3>
        <p
          className="text-sm leading-relaxed mb-8"
          style={{ color: "var(--text-2)" }}
        >
          {project.description}
        </p>

        {/* Metadata Grid (Role, Year, Client, Status) */}
        <div className="grid grid-cols-2 gap-y-6 gap-x-4 mb-8">
          {[
            { label: "Role", value: project.role || "Developer" },
            { label: "Year", value: project.year },
            { label: "Client", value: project.client || "Independent" },
            { label: "Status", value: project.status || "Completed" },
          ].map((meta, i) => (
            <div key={i} className="flex flex-col gap-1">
              <span className="text-[10px] uppercase tracking-widest" style={{ color: "var(--text-3)" }}>
                {meta.label}
              </span>
              <span className="text-xs font-light" style={{ color: "var(--text-1)" }}>
                {meta.value}
              </span>
            </div>
          ))}
        </div>

        <div className="mt-auto" />

        {/* Tech stack */}
        <div className="flex flex-wrap gap-2 mt-6">
          {project.techStack.slice(0, 4).map((tech) => (
            <span
              key={tech}
              className="text-xs px-3 py-1 rounded-full group-hover:-translate-y-1 transition-transform duration-500"
              style={{
                background: "rgba(255,255,255,0.02)",
                border: "1px solid var(--border)",
                color: "var(--text-2)",
                letterSpacing: "0.05em",
              }}
            >
              {tech}
            </span>
          ))}
        </div>
      </div>

      {/* Bottom action row */}
      <div
        className="flex items-center justify-between px-8 py-5 relative z-10"
        style={{ borderTop: "1px solid var(--border)" }}
      >
        <div className="flex gap-4">
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="annotation text-xs group/btn hover:text-[var(--gold)] transition-colors overflow-hidden"
              style={{ padding: "7px 14px" }}
            >
              <span className="flex items-center gap-1 group-hover/btn:-translate-x-1 transition-transform duration-250">
                Live Site <span className="opacity-0 -ml-2 group-hover/btn:opacity-100 group-hover/btn:ml-0 transition-all duration-250">→</span>
              </span>
            </a>
          )}
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="annotation text-xs group/btn hover:text-[var(--gold)] transition-colors overflow-hidden"
              style={{ padding: "7px 14px" }}
            >
              <span className="flex items-center gap-1 group-hover/btn:-translate-x-1 transition-transform duration-250">
                GitHub <span className="opacity-0 -ml-2 group-hover/btn:opacity-100 group-hover/btn:ml-0 transition-all duration-250">→</span>
              </span>
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export default function WorkSection() {
  const featuredProjects = projects.filter((p) => p.featured);
  
  // VisionOS style typography blur/translateY on scroll out
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "start start"] });
  
  return (
    <section ref={ref} id="work" className="relative py-40 px-6 sm:px-10 z-20 transition-colors duration-1000" style={{ background: "var(--bg)" }}>
      {/* Section header */}
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-12 mb-24">
          <div>
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="label block mb-6"
            >
              Selected Work
            </motion.span>
            <h2
              className="display-section"
              style={{ fontSize: "clamp(2.5rem, 5vw, 5rem)" }}
            >
              <WordReveal text="Products built" delay={0.1} />
              <br />
              <WordReveal text="to solve" delay={0.3} />
              <br />
              <span style={{ color: "var(--text-2)" }}>
                <WordReveal text="real-world problems." delay={0.5} />
              </span>
            </h2>
          </div>

          <motion.a
            initial={{ opacity: 0, filter: "blur(10px)" }}
            whileInView={{ opacity: 1, filter: "blur(0px)" }}
            viewport={{ once: true }}
            transition={{ delay: 0.6, duration: 0.8 }}
            href="https://github.com/cleoverly"
            target="_blank"
            rel="noopener noreferrer"
            className="annotation self-start sm:self-end"
          >
            All on GitHub
            <span className="annotation-arrow">↗</span>
          </motion.a>
        </div>

        {/* Project list */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featuredProjects.map((p, i) => (
            <ProjectItem key={p.id} project={p} index={i} />
          ))}
        </div>
      </div>

      {/* Design Philosophy Section (Cool Ambient Space) */}
      <div id="about" className="max-w-7xl mx-auto py-40 border-t mt-40" style={{ borderColor: "rgba(255,255,255,0.05)" }}>
        
        {/* Cool ambient glow specific to About section */}
        <div className="absolute left-0 right-0 h-full w-full pointer-events-none" style={{ background: "radial-gradient(circle at 50% 100%, rgba(200,210,230,0.02) 0%, transparent 50%)" }} />

        <div className="grid md:grid-cols-12 gap-16 items-start relative z-10">
          <div className="md:col-span-5">
            <motion.span 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="label block mb-8"
            >
              Design Philosophy
            </motion.span>
            <h2
              className="display-section"
              style={{ fontSize: "clamp(2rem, 3.5vw, 3.5rem)" }}
            >
              <WordReveal text="Great software" delay={0} />
              <br />
              <WordReveal text="should disappear." delay={0.2} />
            </h2>
          </div>
          <div className="md:col-span-7 flex flex-col gap-10 md:pt-14">
            <p className="text-xl sm:text-2xl font-light leading-relaxed" style={{ color: "var(--text-1)" }}>
              <WordReveal text="People shouldn't notice" delay={0.4} />
              <br/>
              <WordReveal text="the interface." delay={0.6} />
              <br/>
              <span style={{ color: "var(--gold)" }}>
                <WordReveal text="They should notice" delay={0.8} />
                <br/>
                <WordReveal text="how easy everything feels." delay={1.0} />
              </span>
            </p>
            <motion.p 
              initial={{ opacity: 0, filter: "blur(10px)", y: 10 }}
              whileInView={{ opacity: 1, filter: "blur(0px)", y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 1.5, duration: 1 }}
              className="text-sm leading-relaxed max-w-lg mt-4" 
              style={{ color: "var(--text-2)" } as React.CSSProperties}
            >
              My focus is bridging the gap between beautiful interfaces and reliable engineering. I work end-to-end, from the first sketch to production deployment, ensuring every digital experience is crafted with intention.
            </motion.p>
          </div>
        </div>
      </div>
    </section>
  );
}
