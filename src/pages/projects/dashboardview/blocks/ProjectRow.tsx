import type { Project } from "@/data/projects";

import { ArrowRight } from "lucide-react";
import { ProjectLinks } from "../../common/ProjectLinks";
import { Button } from "@/components/ui/button";

interface ProjectRowProps {
  project: Project;
  onViewProjects: () => void;
}

export function ProjectRow({ project, onViewProjects }: ProjectRowProps) {
  return (
    <div className="group flex gap-4 p-5 transition-colors hover:bg-accent/5">
      {/* Index */}
      <div className="hidden pt-1 text-xs font-medium text-muted-foreground/50 sm:block">
        {String(project.order).padStart(2, "0")}
      </div>

      <div className="min-w-0 flex-1">
        {/* Header */}
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="text-base font-semibold text-foreground transition-colors group-hover:text-primary">
              {project.name}
            </h3>

            <div className="mt-1 flex flex-wrap">
              <span className="rounded-full border border-border bg-muted px-2 py-1 text-[11px] font-medium text-foreground">
                {project.type}
              </span>

              <span className="rounded-full border border-border bg-muted px-2 py-1 text-[11px] font-medium text-foreground">
                {project.status}
              </span>
            </div>
          </div>
        </div>

        {/* Description */}
        <p className="mt-4 line-clamp-2 text-sm leading-6 text-muted-foreground">
          {project.description}
        </p>

        {/* Footer */}
        <div className="mt-4 flex items-center justify-between">
          <ProjectLinks project={project} size={18} />

          <Button
            variant="ghost"
            size="icon"
            onClick={onViewProjects}
            aria-label={`View ${project.name}`}
            className="h-8 w-8 text-muted-foreground transition-all group-hover:translate-x-1 group-hover:text-foreground hover:bg-accent/10"
          >
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
