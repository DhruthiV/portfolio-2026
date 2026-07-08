export interface SkillItem {
  name: string;
}

export interface SkillGroup {
  category: string;
  note?: string;
  items: SkillItem[];
}

export const SKILL_GROUPS: SkillGroup[] = [
  {
    category: "Frontend",
    items: [
      { name: "JavaScript" },
      { name: "TypeScript" },
      { name: "HTML5" },
      { name: "CSS3" },
      { name: "React" },
      { name: "Next.js" },
    ],
  },
  {
    category: "Backend",
    note: "Learning",
    items: [
      { name: "Node.js" },
      { name: "Express.js" },
      { name: "MongoDB" },
      { name: "PostgreSQL" },
    ],
  },
  {
    category: "Styling",
    items: [
      { name: "Tailwind CSS" },
      { name: "shadcn/ui" },
      { name: "Material UI" },
    ],
  },
  {
    category: "Tooling",
    items: [
      { name: "Git" },
      { name: "Figma" },
      { name: "VS Code" },
      { name: "Vite" },
      { name: "Vercel" },
      { name: "Neon" },
    ],
  },
];
