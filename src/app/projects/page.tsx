"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import ScrollReveal, { ScrollRevealItem } from "@/components/ui/ScrollReveal";
import ProjectCard from "@/components/ui/ProjectCard";
import LinkConfirmModal from "@/components/modals/LinkConfirmModal";
import Footer from "@/components/layout/Footer";
import { projects, categories, type Project } from "@/data/projects";

export default function ProjectsPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      const matchesCategory =
        activeCategory === "All" || project.category === activeCategory;
      const matchesSearch =
        searchQuery === "" ||
        project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.techStack.some((t) =>
          t.toLowerCase().includes(searchQuery.toLowerCase())
        );
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  const handleVisitSite = (project: Project) => {
    setSelectedProject(project);
  };

  const handleConfirm = (url: string) => {
    window.open(url, "_blank", "noopener,noreferrer");
    setSelectedProject(null);
  };

  return (
    <>
      {/* Top Nav Bar */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="fixed top-0 left-0 right-0 z-50 glass py-3.5"
      >
        <div className="max-w-6xl mx-auto px-6 sm:px-8 flex items-center justify-between">
          <Link
            href="/"
            className="group flex items-center gap-2.5 text-sm text-text-secondary hover:text-text-primary transition-colors"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:-translate-x-0.5 transition-transform">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            Back home
          </Link>
          <span className="text-text-muted text-sm">All projects</span>
        </div>
      </motion.nav>

      <main className="flex-1 relative z-10 pt-28">
        <div className="max-w-6xl mx-auto px-6 sm:px-8">
          {/* Page header */}
          <ScrollReveal>
            <div className="mb-10 pt-6">
              <p className="eyebrow mb-5">Archive</p>
              <h1 className="display text-4xl sm:text-5xl md:text-6xl font-semibold text-text-primary">
                All projects
              </h1>
              <p className="text-text-secondary mt-6 max-w-lg">
                A complete collection of things I&apos;ve built, across various
                technologies and stacks.
              </p>
            </div>
          </ScrollReveal>

          {/* Search & Filters */}
          <ScrollReveal delay={0.15}>
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mb-6">
              {/* Search */}
              <div className="relative flex-1 w-full sm:max-w-xs">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-text-muted"
                >
                  <circle cx="11" cy="11" r="8" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
                <input
                  type="text"
                  placeholder="Search projects or tech..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-11 pr-4 py-2.5 rounded-xl bg-white border border-border text-text-primary placeholder:text-text-muted text-sm focus:outline-none focus:border-accent shadow-sm transition-colors"
                />
              </div>

              {/* Category filters */}
              <div className="flex flex-wrap gap-2">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-colors border ${
                      activeCategory === cat
                        ? "bg-[#0a0a0a] text-white border-transparent"
                        : "bg-white text-text-secondary hover:text-text-primary border-border hover:border-border-light"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
          </ScrollReveal>

          {/* Results count */}
          <div className="mb-6">
            <p className="text-text-muted text-sm">
              {filteredProjects.length} project
              {filteredProjects.length !== 1 ? "s" : ""}
            </p>
          </div>

          {/* Projects Grid */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory + searchQuery}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
            >
              {filteredProjects.length > 0 ? (
                <ScrollReveal stagger staggerDelay={0.08}>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 pb-20">
                    {filteredProjects.map((project, i) => (
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
              ) : (
                <div className="text-center py-24 border border-border rounded-2xl mb-20">
                  <p className="text-text-primary mb-1">No projects found</p>
                  <p className="text-text-muted text-sm">
                    Try adjusting your search or filter.
                  </p>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>

      <Footer />

      {/* Modal */}
      {selectedProject && (
        <LinkConfirmModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
          onConfirm={handleConfirm}
        />
      )}
    </>
  );
}
