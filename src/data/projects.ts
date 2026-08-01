export type ProjectType =
  | "Full Stack Application"
  | "Frontend Application"
  | "Backend Application"
  | "AI Full-Stack Application";
export type ProjectStatus = "Completed" | "In Progress" | "Ongoing";
export type ProjectDensity = "Major Project" | "Mini Project";
export interface Project {
  name: string;
  description: string;

  whatIDid: string;
  whyIDid: string;
  whoItHelps: string;

  type: ProjectType;
  density: ProjectDensity;
  status: ProjectStatus;

  techStack: string[];

  github: string;
  youtube?: string;
  liveUrl?: string;

  order?: number;
  visibility: boolean;
}
