export type ProjectCategory = "Full Stack" | "Frontend" | "ML" | "Learning";
export type ProjectStatus = "Completed" | "In Progress";

export interface Project {
  name: string;
  emoji: string;
  tagline: string;
  desc: string;
  tech: string[];
  category: ProjectCategory;
  status: ProjectStatus;
  year: string;
  github: string;
  live?: string;
}

// NOTE: When the Notion integration lands, replace this static array with
// a fetch that maps Notion table/board rows into this same Project shape,
// so ProjectsPage.tsx and ProjectsCard.tsx don't need to change at all.
export const PROJECTS: Project[] = [
  {
    name: "Bloom",
    emoji: "🌿",
    tagline: "Plant care tracker",
    desc: "Watering reminders, growth journaling, and plant ID via a public ML API.",
    tech: ["React", "TypeScript", "Supabase"],
    category: "Full Stack",
    status: "Completed",
    year: "2024",
    github: "#",
    live: "#",
  },
  {
    name: "Palette",
    emoji: "🎨",
    tagline: "Color palette generator",
    desc: "Harmony-based color generation with WCAG contrast checking.",
    tech: ["React", "Canvas API", "Vite"],
    category: "Frontend",
    status: "Completed",
    year: "2024",
    github: "#",
    live: "#",
  },
  {
    name: "Tempo",
    emoji: "⏱",
    tagline: "Productivity timer PWA",
    desc: "Pomodoro timer installable on mobile, offline-first with IndexedDB.",
    tech: ["React", "PWA", "IndexedDB"],
    category: "Frontend",
    status: "Completed",
    year: "2024",
    github: "#",
  },
  {
    name: "Snippr",
    emoji: "📋",
    tagline: "Code snippet manager",
    desc: "Syntax-highlighted snippet manager with tag search and sharing.",
    tech: ["Next.js", "PostgreSQL", "Prisma"],
    category: "Full Stack",
    status: "In Progress",
    year: "2025",
    github: "#",
  },
  {
    name: "Portfolio v2",
    emoji: "🗂",
    tagline: "This site",
    desc: "Bento-grid portfolio with a Notion-powered projects table.",
    tech: ["React", "Tailwind", "Vite"],
    category: "Frontend",
    status: "Completed",
    year: "2025",
    github: "#",
    live: "#",
  },
  {
    name: "Weather Widget",
    emoji: "🌤",
    tagline: "First API project",
    desc: "Vanilla JS weather lookup — where the API-fetching habit started.",
    tech: ["Vanilla JS", "OpenWeather API"],
    category: "Learning",
    status: "Completed",
    year: "2023",
    github: "#",
  },
];
