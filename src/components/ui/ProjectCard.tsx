"use client";

import Image from "next/image";
import type { Project } from "@/data/projects";

interface ProjectCardProps {
  project: Project;
  onVisitSite: (project: Project) => void;
  index?: number;
}

const GithubIcon = ({ size = 18 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
  </svg>
);

export default function ProjectCard({ project, onVisitSite }: ProjectCardProps) {
  const hasLive = Boolean(project.liveUrl);

  const previewInner = (
    <>
      {project.image ? (
        <Image
          src={project.image}
          alt={project.title}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
        />
      ) : (
        <>
          {/* Dark placeholder with gold radial glow */}
          <div className="absolute inset-0 bg-bg-tertiary"
            style={{
              background: "radial-gradient(circle at 30% 20%, rgba(201,169,110,0.06), transparent 60%)"
            }}
          />
          <span className="absolute inset-0 flex items-center justify-center text-7xl font-light text-[rgba(201,169,110,0.08)] group-hover:text-[rgba(201,169,110,0.14)] transition-colors duration-500 select-none font-display">
            {project.title.charAt(0)}
          </span>
          <span className="absolute bottom-3 left-3 text-[0.65rem] text-text-muted bg-[rgba(0,0,0,0.5)] backdrop-blur-sm border border-[rgba(255,255,255,0.06)] rounded-full px-2 py-0.5">
            preview placeholder
          </span>
        </>
      )}

      {/* meta badges */}
      <span className="absolute top-3 left-3 text-xs text-text-secondary font-mono bg-[rgba(0,0,0,0.6)] backdrop-blur-sm border border-[rgba(255,255,255,0.07)] rounded-full px-2 py-0.5">
        {project.year}
      </span>
      <span className="absolute top-3 right-3 tech-badge bg-[rgba(0,0,0,0.55)] backdrop-blur-sm">
        {project.category}
      </span>

      {/* hover arrow */}
      <span className="absolute bottom-3 right-3 w-9 h-9 rounded-full bg-[rgba(201,169,110,0.9)] border border-accent flex items-center justify-center opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 shadow-sm"
        style={{ color: "var(--accent-contrast)" }}>
        {hasLive ? (
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M7 17L17 7M9 7h8v8" />
          </svg>
        ) : (
          <GithubIcon size={16} />
        )}
      </span>
    </>
  );

  return (
    <div className="card group flex flex-col overflow-hidden">
      {/* Preview area */}
      {hasLive ? (
        <button
          onClick={() => onVisitSite(project)}
          className="relative h-48 sm:h-52 w-full overflow-hidden text-left"
          aria-label={`Open ${project.title}`}
        >
          {previewInner}
        </button>
      ) : (
        <a
          href={project.githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="relative h-48 sm:h-52 w-full overflow-hidden text-left block"
          aria-label={`${project.title} on GitHub`}
        >
          {previewInner}
        </a>
      )}

      {/* Content */}
      <div className="flex flex-col flex-1 p-5">
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-base font-semibold text-text-primary">
            {project.title}
          </h3>
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-text-muted hover:text-accent transition-colors shrink-0 mt-0.5"
              aria-label="Source code"
            >
              <GithubIcon />
            </a>
          )}
        </div>
        <p className="mt-2 text-sm text-text-secondary leading-relaxed line-clamp-2">
          {project.description}
        </p>

        <div className="mt-4 pt-4 border-t border-[rgba(255,255,255,0.06)] flex flex-wrap gap-1.5">
          {project.techStack.slice(0, 4).map((tech) => (
            <span key={tech} className="tech-badge">
              {tech}
            </span>
          ))}
          {project.techStack.length > 4 && (
            <span className="tech-badge">+{project.techStack.length - 4}</span>
          )}
        </div>
      </div>
    </div>
  );
}
