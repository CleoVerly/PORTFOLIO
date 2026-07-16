"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, MotionValue, AnimatePresence } from "framer-motion";
import { projects, Project } from "@/data/projects";

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

function ProjectCard3D({ 
  project, 
  index, 
  scrollX,
  cardWidth,
}: { 
  project: Project; 
  index: number; 
  scrollX: MotionValue<number>;
  cardWidth: number;
}) {
  const centerPos = index * cardWidth;

  // Coverflow Math (Convex)
  const distanceRange = [
    centerPos - cardWidth * 2,
    centerPos - cardWidth,
    centerPos,
    centerPos + cardWidth,
    centerPos + cardWidth * 2
  ];

  // Left cards face right (+rotateY), Right cards face left (-rotateY)
  const yRotation = useTransform(scrollX, distanceRange, [50, 35, 0, -35, -50]);
  const scale3D = useTransform(scrollX, distanceRange, [0.6, 0.8, 1, 0.8, 0.6]);
  const zTranslation = useTransform(scrollX, distanceRange, [-400, -200, 0, -200, -400]);
  const op = useTransform(scrollX, distanceRange, [0, 0.5, 1, 0.5, 0]);

  return (
    <motion.div
      style={{ 
        scale: scale3D,
        rotateY: yRotation,
        z: zTranslation,
        opacity: op,
        transformStyle: "preserve-3d",
        width: cardWidth - 32, // Set width dynamically based on cardWidth minus margins
      }}
      className="flex flex-col items-center shrink-0 mx-4 snap-center cursor-pointer"
    >
      <div className="w-full aspect-video sm:h-[320px] rounded-3xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)] relative">
        {project.image ? (
          <img
            src={project.image}
            alt={project.title}
            className="absolute inset-0 w-full h-full object-cover"
          />
        ) : (
          <div className="absolute inset-0 w-full h-full bg-[var(--bg-card)]" />
        )}
        {/* Subtle inner shadow/border */}
        <div className="absolute inset-0 border border-white/10 rounded-3xl pointer-events-none" />
      </div>
    </motion.div>
  );
}

export default function WorkSection() {
  const featuredProjects = projects.filter((p) => p.featured);
  
  const scrollRef = useRef<HTMLDivElement>(null);
  const { scrollX } = useScroll({ container: scrollRef });

  // Hydration & Responsive setup
  const [isMounted, setIsMounted] = useState(false);
  const [cardWidth, setCardWidth] = useState(560); // Default to desktop 560px
  
  useEffect(() => {
    setIsMounted(true);
    const updateWidth = () => {
      // Mobile: 320px width + 32px gap = 352
      // Desktop: 560px width + 32px gap = 592
      setCardWidth(window.innerWidth < 640 ? 352 : 592); 
    };
    updateWidth();
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  // Convert vertical mouse wheel to horizontal scroll
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const onWheel = (e: WheelEvent) => {
      // If the user scrolls vertically, map it to horizontal scroll
      if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
        e.preventDefault();
        el.scrollLeft += e.deltaY;
      }
    };
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, []);

  const allProjects = [...featuredProjects, ...featuredProjects, ...featuredProjects];

  // Active Project State
  const [activeIndex, setActiveIndex] = useState(0);

  const handleScroll = () => {
    if (!scrollRef.current) return;
    const currentScroll = scrollRef.current.scrollLeft;
    // Calculate which card is closest to the center
    const newIndex = Math.round(currentScroll / cardWidth);
    if (newIndex >= 0 && newIndex < allProjects.length && newIndex !== activeIndex) {
      setActiveIndex(newIndex);
    }
  };

  const activeProject = allProjects[activeIndex];

  return (
    <section id="work" className="relative z-20 py-24 sm:py-32 overflow-hidden" style={{ background: "var(--bg)" }}>
      {/* Section header */}
      <div className="max-w-7xl mx-auto px-6 sm:px-10 mb-8 sm:mb-12 flex flex-col items-center text-center">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-xs uppercase tracking-widest mb-4"
          style={{ color: "var(--text-3)" }}
        >
          Explore more brand identities
        </motion.p>
        <motion.a
          href="https://github.com/CleoVerly"
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="flex items-center gap-3 text-sm font-bold uppercase tracking-wider"
          style={{ color: "var(--text-1)" }}
        >
          See more Projects
          <span className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: "var(--gold)", color: "var(--bg)" }}>
            ↗
          </span>
        </motion.a>
      </div>

      {/* Coverflow Carousel */}
      <div className="w-full relative overflow-hidden perspective-[1200px] mt-10">
        <div 
          ref={scrollRef}
          onScroll={handleScroll}
          className="w-full overflow-x-auto overflow-y-hidden pb-8 pt-8 cursor-grab active:cursor-grabbing snap-x snap-mandatory [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
        >
          <div key={cardWidth} className="flex flex-row items-center w-max h-[400px]" style={{ transformStyle: "preserve-3d" }}>
            {/* Spacer to center the first card */}
            <div className="shrink-0" style={{ width: `calc(50vw - ${cardWidth / 2}px)` }} />
            
            {isMounted && allProjects.map((p, i) => (
              <ProjectCard3D 
                key={`${p.id}-${i}`} 
                project={p} 
                index={i}
                scrollX={scrollX}
                cardWidth={cardWidth}
              />
            ))}
            
            {/* Spacer to center the last card */}
            <div className="shrink-0" style={{ width: `calc(50vw - ${cardWidth / 2}px)` }} />
          </div>
        </div>
      </div>

      {/* Synchronized Details Panel */}
      <div className="max-w-2xl mx-auto px-6 mt-8">
        <AnimatePresence mode="wait">
          {activeProject && (
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3, ease }}
              className="flex flex-col items-center text-center"
            >
              <h3 className="text-2xl sm:text-3xl font-bold mb-2" style={{ color: "var(--text-1)" }}>
                {activeProject.title}
              </h3>
              <p className="text-sm sm:text-base max-w-lg mb-6 leading-relaxed" style={{ color: "var(--text-2)" }}>
                {activeProject.description}
              </p>
              
              <div className="flex flex-wrap justify-center gap-2 mb-6">
                {activeProject.techStack.slice(0, 4).map((tech, i) => (
                  <span 
                    key={i} 
                    className="text-xs font-medium px-3 py-1.5 rounded-full border"
                    style={{ borderColor: "var(--border)", color: "var(--text-2)" }}
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {(activeProject.liveUrl || activeProject.githubUrl) && (
                <a 
                  href={activeProject.liveUrl || activeProject.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs uppercase tracking-widest font-bold flex items-center gap-2 px-6 py-3 rounded-full hover:scale-105 transition-transform"
                  style={{ background: "var(--text-1)", color: "var(--bg)" }}
                >
                  View Project
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M7 17l9.2-9.2M17 17V7.8H7.8" />
                  </svg>
                </a>
              )}
            </motion.div>
          )}
        </AnimatePresence>
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
