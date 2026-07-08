import { ArrowRight } from "lucide-react";
import { PROJECTS } from "../../data/projects";
import { BentoCard } from "./BentoCard";

interface ProjectsCardProps {
  onViewProjects: () => void;
}

export function ProjectsCard({ onViewProjects }: ProjectsCardProps) {
  const categories = Array.from(new Set(PROJECTS.map((p) => p.category)));

  return (
    <BentoCard className="gap-4">
      <div className="flex items-center justify-between">
        <h2
          className="text-sm font-semibold text-foreground"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          Projects
        </h2>
        {/* <span className="text-xs text-muted-foreground">
          {PROJECTS.length} builds
        </span> */}
      </div>

      <p className="text-xs text-muted-foreground leading-relaxed">
        Personal projects, internship work, and learning experiments.
      </p>

      <div className="flex flex-wrap gap-1">
        {categories.map((cat) => (
          <span
            key={cat}
            className="text-xs px-2.5 py-1 rounded-full border border-border bg-muted/60 text-foreground/80 font-medium"
          >
            {cat}
          </span>
        ))}
      </div>

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
