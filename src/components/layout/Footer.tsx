import { personalInfo } from "@/data/personal";

export default function Footer() {
  return (
    <footer
      className="py-16 px-6 sm:px-10"
      style={{ borderTop: "1px solid var(--border)" }}
    >
      <div className="max-w-7xl mx-auto flex flex-col items-center justify-center gap-8 text-center">
        <div className="flex flex-col gap-2">
          <p className="text-sm tracking-wide" style={{ color: "var(--text-1)" }}>
            Available for selected projects
          </p>
          <a href={`mailto:${personalInfo.email}`} className="text-lg font-light hover:text-[var(--gold)] transition-colors" style={{ color: "var(--text-2)" }}>
            {personalInfo.email}
          </a>
        </div>
        
        <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-12 mt-8">
          <p className="label">Based in Indonesia</p>
          <span className="hidden sm:block" style={{ color: "var(--border)" }}>|</span>
          <p className="label" style={{ color: "var(--gold)" }}>Crafted with care.</p>
          <span className="hidden sm:block" style={{ color: "var(--border)" }}>|</span>
          <p className="label">© {new Date().getFullYear()}</p>
        </div>
      </div>
    </footer>
  );
}
