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
    title: "UX/Product Designer",
    org: "Independent",
    period: "May 2026 – Present",
    bullets: [
      "Moving from frontend engineering toward UX and product design, building on an interest in usability and interface clarity that grew through working on real products.",
      "Exploring design by noticing friction in the apps I use, understanding what feels difficult or unclear, and designing better solutions through user flows, sketches, and Figma prototypes.",
    ],
  },
  {
    id: "2",
    title: "Software Engineer – Frontend",
    icon: "vegamIcon",
    org: "Vegam Smart Factory Solutions Pvt. Ltd.",
    period: "Sep 2025 – May 2026",
    bullets: [
      "Designed and built reusable React components, while addressing UI and usability issues and documenting components with Storybook to improve consistency across the product.",
      "Collaborated with product and backend teams to build frontend features for AI InTime, an enterprise AI platform, including authentication, user management, and knowledge hub integrations.",
    ],
  },
  {
    id: "1",
    title: "Frontend Developer (Self-Learning & Collaboration)",
    org: "Independent + University",
    period: "Feb 2025 – May 2026",
    icon: "pesuIcon",
    bullets: [
      "Built mini projects using React, Tailwind CSS, and shadcn/ui, with a focus on clean, usable interfaces.",
      "Collaborated with peers on learning-focused group projects, sharpening frontend and design sensibility through documentation, tutorials, and open-source work.",
    ],
  },
];
