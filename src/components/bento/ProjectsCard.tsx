import { ArrowRight } from "lucide-react";
// import { PROJECTS } from "../../data/projects";
import { BentoCard } from "./BentoCard";

interface ProjectsCardProps {
  onViewProjects: () => void;
}

export function ProjectsCard({ onViewProjects }: ProjectsCardProps) {
  // const categories = Array.from(new Set(PROJECTS.map((p) => p.category)));

  return (
    <BentoCard className="gap-1.5">
      <div className="flex items-start justify-between flex-col">
        <h3
          className="text-sm font-semibold text-foreground"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          Projects
        </h3>
      </div>
      <h3 className="text-xs text-muted-foreground ">Developed Projects.</h3>

      <button
        type="button"
        onClick={onViewProjects}
        className="inline-flex items-center justify-center gap-2 h-9 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition-opacity"
        style={{ fontFamily: "var(--font-heading)" }}
      >
        View projects <ArrowRight size={14} />
      </button>
    </BentoCard>
  );
}
