export interface ExperienceEntry {
  id: string;
  title: string;
  icon?: string;
  org: string;
  period: string;
  bullets: string[];
}

// Newest first — JourneyCard renders in this order.
export const EXPERIENCE: ExperienceEntry[] = [
  {
    id: "3",
    title: "Full Stack Engineer",
    org: "Independent",
    period: "May 2026 – Present",
    bullets: [
      "Building full-stack projects and strengthening system design expertise.",
    ],
  },
  {
    id: "2",
    title: "Software Engineer (Frontend)",
    icon: "vegamIcon",
    org: "Vegam Smart Factory Solutions",
    period: "Sep 2025 – May 2026",
    bullets: [
      "Worked on AI-Product - AIIntime an exterprise SaaS internal Knowledge Management System ",
      "Built the frontend for an AI-powered SaaS product and enhanced the customer experience.",
      "Improved the codebase by resolving performance issues and refining the application's architecture.",
      "Developed reusable, maintainable React components following SOLID principles.",
    ],
  },
  {
    id: "1",
    title: "Frontend Developer (Self-Learning & Collaboration)",
    icon: "pesuIcon",
    org: "Independent + University",
    period: "Feb 2025 – May 2026",
    bullets: [
      "Built mini projects using React, Tailwind CSS, and shadcn/ui.",
      "Collaborated with peers on learning-focused group projects and UI implementations.",
      "Continuously improved frontend development skills through documentation, tutorials, and open-source projects.",
    ],
  },
];
