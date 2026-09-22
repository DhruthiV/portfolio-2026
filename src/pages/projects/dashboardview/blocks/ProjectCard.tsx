import type { Project } from "@/data/projects";
import { ArrowRight } from "lucide-react";
import { ProjectLinks } from "../../common/ProjectLinks";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useNavigate } from "react-router-dom";

interface ProjectCardProps {
  project: Project;
  onViewProjects: () => void;
}

export function ProjectCard({ project }: ProjectCardProps) {
  const navigate = useNavigate();
  const handleOpen = () => {
    if (project.caseStudyId) {
      navigate(`/p/${project.caseStudyId}`);
    }
  };

  return (
    <article
      onClick={handleOpen}
      className={cn(
        "group overflow-hidden border border-border bg-card",
        "transition-colors hover:border-accent/60",
      )}
    >
      {/* Image */}
      <div className="aspect-[16/9] overflow-hidden bg-muted">
        {project.pic ? (
          <img
            src={project.pic}
            alt={`${project.name} project preview`}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-sm text-muted-foreground">
            No preview available
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5">
        {/* Header */}
        <div>
          <h3 className="text-lg font-semibold text-foreground transition-colors group-hover:text-primary">
            {project.name}
          </h3>

          <div className="mt-2 flex flex-wrap gap-1.5">
            <span className="rounded-full border border-border bg-muted px-2 py-1 text-[11px] font-medium text-foreground">
              {project.type}
            </span>

            <span className="rounded-full border border-border bg-muted px-2 py-1 text-[11px] font-medium text-foreground">
              {project.status}
            </span>
          </div>
        </div>

        {/* Description */}
        <p className="mt-4 line-clamp-3 text-sm leading-6 text-muted-foreground">
          {project.description}
        </p>

        {/* Footer */}
        <div className="mt-5 flex items-center justify-between">
          <ProjectLinks project={project} size={18} />

          <Button
            variant="ghost"
            size="icon"
            onClick={handleOpen}
            aria-label={`View ${project.name}`}
            className="h-8 w-8 text-muted-foreground transition-all hover:bg-accent/10 hover:text-foreground group-hover:translate-x-1"
          >
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </article>
  );
}
