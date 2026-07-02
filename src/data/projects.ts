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
    id: "olimversal-academy",
    title: "Olimversal Academy",
    description:
      "Interactive learning platform built for science olympiad training with cinematic UI and smooth animations.",
    longDescription:
      "Landing page for Olimversal Academy — a science olympiad training platform. Built with Next.js 15 (App Router), React 19, and Tailwind CSS v4. Relies on Framer Motion for mask reveals, coverflow carousels, scroll progress, and animated counters, with Playfair Display + Plus Jakarta Sans typography.",
    techStack: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Framer Motion"],
    githubUrl: "https://github.com/CleoVerly/Olimversal-Academy",
    category: "Web App",
    featured: true,
    year: 2026,
    role: "Front-End Engineer",
    client: "Olimversal",
    status: "Live",
    duration: "2 Months",
  },
  {
    id: "cat-meong-app",
    title: "Cat Meong — AI Translator",
    description:
      "Intelligent PWA that analyzes cat vocalizations and predicts emotions using an AI model.",
    longDescription:
      "Smart web application to translate cat vocalizations into emotional context (Comfortable, Anxious, Hungry) using an AI model. Supports live mic recording, audio upload, emotion prediction, and analysis history. Built as a PWA with React, TypeScript, and Vite.",
    techStack: ["React", "TypeScript", "Vite", "PWA"],
    liveUrl: "https://cat-meong-app.vercel.app",
    githubUrl: "https://github.com/CleoVerly/cat-meong-app",
    category: "AI App",
    featured: true,
    year: 2026,
    role: "Full Stack Engineer",
    client: "Personal Project",
    status: "Live",
    duration: "1 Month",
  },
  {
    id: "craftmit",
    title: "Craftmit",
    description:
      "Automated git commit message generator from git diffs using AI, featuring an interactive neubrutalism UI.",
    longDescription:
      "Web-based tool leveraging OpenRouter AI to craft clean, Conventional Commits-compliant messages directly from git diff outputs. Features a bold neubrutalism interface with smart-swap UI to toggle between diff input and results. Built with React + Vite.",
    techStack: ["React", "Vite", "OpenRouter AI", "Tailwind CSS"],
    liveUrl: "https://craftmit-cv-team.vercel.app",
    githubUrl: "https://github.com/CleoVerly/Craftmit-CVTeam",
    category: "AI Tool",
    featured: true,
    year: 2026,
    role: "Front-End Engineer",
    client: "CV Team",
    status: "Live",
    duration: "3 Weeks",
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
