export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  techStack: string[];
  liveUrl?: string;
  githubUrl?: string;
  category: string;
  featured: boolean;
  year: number;
  role?: string;
  client?: string;
  status?: string;
  duration?: string;
  /** Optional screenshot/cover. Drop a file in /public/projects and set the path
   *  here (e.g. "/projects/olimversal.png"). Falls back to a placeholder. */
  image?: string;
}

export const projects: Project[] = [
  {
    id: "bumdes-sirah-dayeuh",
    title: "BUMDES Sirah Dayeuh",
    description:
      "A modern profile website for a village enterprise, driving local economic growth with a clean and responsive interface.",
    longDescription:
      "The official profile platform for BUMDES Sirah Dayeuh, designed to promote the village's potential and business units. Built with Next.js and Tailwind CSS, delivering a fast, responsive, and highly accessible user experience for the local community.",
    techStack: ["Next.js", "React", "TypeScript", "Tailwind CSS"],
    liveUrl: "https://bumdes-sirah-deyueh.vercel.app",
    category: "Web App",
    featured: true,
    year: 2024,
    role: "Front-End Engineer",
    client: "BUMDES Sirah Dayeuh",
    status: "Live",
    duration: "1 Month",
    image: "/projects/bumdes.webp",
  },
  {
    id: "kembang-sereh",
    title: "Kembang Sereh",
    description:
      "A refreshing digital storefront for a natural herbal drink brand, featuring a vibrant and modern visual design.",
    longDescription:
      "A digital marketing platform for Kembang Sereh, an all-natural herbal beverage. Showcases product catalogs, health benefits, and a seamless ordering interface. Built with modern web technologies focusing heavily on performance and SEO.",
    techStack: ["React", "TypeScript", "Tailwind CSS"],
    liveUrl: "https://kembang-sereh.vercel.app",
    category: "Landing Page",
    featured: true,
    year: 2024,
    role: "Full Stack Engineer",
    client: "Kembang Sereh",
    status: "Live",
    duration: "3 Weeks",
    image: "/projects/kembangsereh.webp",
  },
  {
    id: "craftmit",
    title: "Craftmit",
    description:
      "Automated git commit message generator from git diffs using AI, featuring an interactive neubrutalism UI.",
    longDescription:
      "Web-based tool leveraging OpenRouter AI to craft clean, Conventional Commits-compliant messages directly from git diff outputs. Features a bold neubrutalism interface with smart-swap UI to toggle between diff input and results. Built with React + Vite.",
    techStack: ["React", "Vite", "OpenRouter AI", "Tailwind CSS"],
    liveUrl: "https://craftmit.cleoverly.online",
    githubUrl: "https://github.com/CleoVerly/Craftmit-CVTeam",
    category: "AI Tool",
    featured: true,
    year: 2026,
    role: "Front-End Engineer",
    client: "CV Team",
    status: "Live",
    duration: "3 Weeks",
    image: "/projects/craftmit.webp",
  },
];

export const categories = ["All", ...Array.from(new Set(projects.map((p) => p.category)))];
