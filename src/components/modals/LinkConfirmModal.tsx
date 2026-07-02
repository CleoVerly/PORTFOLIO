"use client";

import { motion, AnimatePresence } from "framer-motion";
import type { Project } from "@/data/projects";

interface LinkConfirmModalProps {
  project: Project | null;
  onClose: () => void;
  onConfirm: (url: string) => void;
}

export default function LinkConfirmModal({
  project,
  onClose,
  onConfirm,
}: LinkConfirmModalProps) {
  if (!project) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="modal-overlay"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="card max-w-md w-full mx-4 p-8 relative"
          style={{ background: "var(--bg-elevated)" }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 rounded-lg flex items-center justify-center text-text-muted hover:text-text-primary hover:bg-bg-tertiary transition-all"
            aria-label="Close modal"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>

          {/* Icon */}
          <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 border border-[rgba(201,169,110,0.2)] bg-[rgba(201,169,110,0.07)]">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-accent">
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
              <polyline points="15 3 21 3 21 9" />
              <line x1="10" y1="14" x2="21" y2="3" />
            </svg>
          </div>

          {/* Content */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-text-primary mb-2">
              Opening an external link
            </h3>
            <p className="text-text-secondary text-sm leading-relaxed">
              You&apos;re about to visit the live site for{" "}
              <span className="text-text-primary font-medium">{project.title}</span>.
              It will open in a new tab.
            </p>
            <p className="text-text-muted text-xs mt-3 break-all font-mono">
              {project.liveUrl}
            </p>
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="btn-secondary flex-1 justify-center"
            >
              Cancel
            </button>
            <button
              onClick={() => onConfirm(project.liveUrl ?? "")}
              className="btn-primary flex-1 justify-center"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                <polyline points="15 3 21 3 21 9" />
                <line x1="10" y1="14" x2="21" y2="3" />
              </svg>
              Visit Site
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
