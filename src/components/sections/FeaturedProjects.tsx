"use client";

import { useState } from "react";
import ScrollReveal, { ScrollRevealItem } from "../ui/ScrollReveal";
import ProjectCard from "../ui/ProjectCard";
import LinkConfirmModal from "../modals/LinkConfirmModal";
import { projects, type Project } from "@/data/projects";
import Link from "next/link";

export default function FeaturedProjects() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const featuredProjects = projects.filter((p) => p.featured);

  const handleVisitSite = (project: Project) => {
    setSelectedProject(project);
  };

  const handleConfirm = (url: string) => {
    window.open(url, "_blank", "noopener,noreferrer");
    setSelectedProject(null);
  };

  return (
    <section id="work" className="relative py-24 sm:py-36">
      <div className="max-w-6xl mx-auto px-6 sm:px-8 relative z-10">
        {/* Section header */}
        <ScrollReveal>
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-12">
            <div>
              <p className="eyebrow mb-5">Selected work</p>
              <h2 className="display text-3xl sm:text-4xl md:text-5xl font-light text-text-primary max-w-xl">
                Take a closer look at some of my work.
              </h2>
            </div>
            <Link
              href="/projects"
              className="text-sm text-text-secondary hover:text-accent transition-colors inline-flex items-center gap-1.5 shrink-0"
            >
              View all
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </Link>
          </div>
        </ScrollReveal>

        {/* Featured grid */}
        <ScrollReveal stagger staggerDelay={0.12}>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {featuredProjects.map((project, i) => (
              <ScrollRevealItem key={project.id} direction="up">
                <ProjectCard
                  project={project}
                  onVisitSite={handleVisitSite}
                  index={i}
                />
              </ScrollRevealItem>
            ))}
          </div>
        </ScrollReveal>
      </div>

      {/* Modal */}
      {selectedProject && (
        <LinkConfirmModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
          onConfirm={handleConfirm}
        />
      )}
    </section>
  );
}
