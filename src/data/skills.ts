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
    description: "The tools I reach for to research, design, and build.",
    items: [
      { name: "Pen and Paper" },
      { name: "Figma" },
      { name: "Notion" },
      { name: "Adobe Lightroom" },
      { name: "React / TypeScript / HTML / CSS" },
      { name: "Material UI & shadcn/ui" },
      { name: "AI for Research" },
    ],
  },

  {
    title: "What do I have?",
    description:
      "The foundation I've built through real projects and professional engineering work.",
    items: [
      { name: "Problem Framing" },
      { name: "User Flows & Information Architecture" },
      { name: "Usability Thinking & Testing" },
      { name: "An Eye for UX Friction" },
      { name: "2 Years of Frontend Engineering Fluency" },
    ],
  },

  {
    title: "What can I do?",
    description:
      "How I take a problem, understand who it's for, and shape a solution that works for both users and business.",
    items: [
      { name: "Understand Users and Their Needs" },
      { name: "Ideate Multiple Solutions" },
      { name: "Sketch → Structured Flow → Prototype" },
      { name: "Balance Business Needs with User Needs" },
      { name: "Build Case Studies from Real Friction, Not Assigned Briefs" },
      { name: "Think Through Edge Cases" },
    ],
  },
];
