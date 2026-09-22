export interface SkillItem {
  name: string;
  icon?: string;
}

export interface SkillSection {
  title: string;
  description: string;
  items: SkillItem[];
}

export const SKILL_SECTIONS: SkillSection[] = [
  {
    title: "What do I use?",
    description:
      "The technologies and tools I use to build, design, and develop software.",
    items: [
      { name: "React" },
      { name: "TypeScript" },
      { name: "Next.js" },
      { name: "Tailwind CSS" },
      { name: "Git" },
      { name: "Figma" },
    ],
  },

  {
    title: "What do I have?",
    description:
      "The experience, knowledge, and technical foundation I have built through projects and professional work.",
    items: [
      { name: "Frontend Development" },
      { name: "REST APIs" },
      { name: "Component Design" },
      { name: "System Design" },
      { name: "Technical Documentation" },
    ],
  },

  {
    title: "What can I make?",
    description:
      "The kind of software and experiences I can turn ideas and requirements into.",
    items: [
      { name: "Web Applications" },
      { name: "Full-Stack Applications" },
      { name: "Interactive Interfaces" },
      { name: "Developer Tools" },
      { name: "AI-Powered Applications" },
    ],
  },
];
