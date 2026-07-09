export interface EducationInfo {
  id: string;
  icon: string;
  desc: string;
  degree: string;
  school: string;
  period: string;
}

export const EDUCATION: EducationInfo[] = [
  {
    id: "2",
    icon: "pesuIcon",
    degree: "Master of Computer Applications (MCA)",
    desc: "Full Stack Engineering & Data Engineering",
    school: "PES University",
    period: "2023 – 2025",
  },
  {
    id: "1",
    icon: "bmsIcon",
    degree: "Bachelor of Science",
    desc: "Physics, Mathematics & Computer Science",
    school: "B.M.S. College for Women",
    period: "2020 – 2023",
  },
];
