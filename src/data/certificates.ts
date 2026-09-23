// src/modules/Certifications/data/certificates.ts
//NEEDS FOCUS
export interface Certificate {
  id: string;
  title: string;
  image: string;
  description: string;
  bullets: string[];
}

export const CERTIFICATES: Certificate[] = [
  {
    id: "c1",
    title: "Foundations of UX design",
    image: "src/certificates/c1.jpg",
    description: "A short description of what this certification represents.",
    bullets: [
      "What you learned or worked on",
      "A specific skill or concept covered",
      "How it relates to your development",
    ],
  },
  {
    id: "c2",
    title: "Foundations of UX design",
    image: "src/certificates/c1.jpg",
    description: "A short description of what this certification represents.",
    bullets: [
      "What you learned or worked on",
      "A specific skill or concept covered",
      "How it relates to your development",
    ],
  },
];
