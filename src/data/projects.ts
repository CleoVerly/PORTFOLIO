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
  {
    id: "gamerecs",
    title: "GameRecs",
    description:
      "Steam game recommendation system based on content-based filtering (TF-IDF & cosine similarity).",
    longDescription:
      "Web application recommending Steam games using content-based filtering. Finds similarities based on genre, tags, and categories with TF-IDF and cosine similarity. Supports flexible search, genre filtering, pagination, and random recommendations. Flask backend with Tailwind CSS + DaisyUI.",
    techStack: ["Python", "Flask", "scikit-learn", "Tailwind CSS"],
    githubUrl: "https://github.com/CleoVerly/Web-Recomendation-Games",
    category: "Machine Learning",
    featured: false,
    year: 2025,
    role: "Full Stack Engineer",
    client: "Academic Project",
    status: "Completed",
    duration: "1 Month",
  },
  {
    id: "crysense",
    title: "CrySense",
    description:
      "Infant cry classification (hungry, pain, uncomfortable) utilizing Machine Learning & Deep Learning.",
    longDescription:
      "Baby cry classification system to detect infant needs. Performs audio preprocessing, feature extraction (MFCC, Chroma, Spectral Contrast), data augmentation, then trains and evaluates sound classification models based on ML and Deep Learning.",
    techStack: ["Python", "TensorFlow", "Librosa", "scikit-learn"],
    githubUrl: "https://github.com/CleoVerly/CrySense",
    category: "Machine Learning",
    featured: false,
    year: 2026,
    role: "ML Engineer",
    client: "Academic Project",
    status: "Completed",
    duration: "2 Months",
  },
  {
    id: "bike-sharing-dashboard",
    title: "Bike Sharing Dashboard",
    description:
      "Data analysis dashboard for bike sharing rentals based on seasons, time, and trends.",
    longDescription:
      "Interactive dashboard built with Streamlit to analyze bike sharing rental data. Presents trends based on seasons, time, and total rentals through clear data visualizations.",
    techStack: ["Python", "Streamlit", "Pandas", "Matplotlib"],
    githubUrl: "https://github.com/CleoVerly/Data-Analysis-Bike-Sharing",
    category: "Data",
    featured: false,
    year: 2025,
    role: "Data Analyst",
    client: "Personal Project",
    status: "Completed",
    duration: "2 Weeks",
  },
];

export const categories = ["All", ...Array.from(new Set(projects.map((p) => p.category)))];
