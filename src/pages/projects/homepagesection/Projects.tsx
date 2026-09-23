import { ArrowRight, LayoutGrid } from "lucide-react";
import { Button } from "@/components/ui/button";
import ProjectsError from "../common/ProjectsError";
import { EmptyState } from "./blocks/EmptyState";
import type { Project } from "@/data/projects";
import { ProjectCard } from "./blocks/ProjectCard";

interface ProjectsCardProps {
  projects: Project[];
  loading: boolean;
  error: string | null;
  onViewProjects: () => void;
}

export function Projects({
  projects,
  loading,
  error,
  onViewProjects,
}: ProjectsCardProps) {
  const previewProjects = projects
    .filter((project) => project.visibility && project.order !== undefined)
    .sort((a, b) => {
      const orderA = a.order ?? Number.MAX_SAFE_INTEGER;
      const orderB = b.order ?? Number.MAX_SAFE_INTEGER;

      return orderA - orderB;
    });

  if (loading) {
    return <EmptyState />;
  }

  if (error) {
    return (
      <div className="flex justify-center">
        <ProjectsError />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h2 className="text-center font-heading text-2xl font-semibold text-foreground">
        Projects
      </h2>

      <div className="grid gap-4 md:grid-cols-2">
        {previewProjects.map((project) => (
          <ProjectCard
            key={project.name}
            project={project}
            onViewProjects={onViewProjects}
          />
        ))}
      </div>

      <Button
        variant="secondary"
        onClick={onViewProjects}
        className="group/view h-auto w-full justify-between border border-accent/50 px-6 py-3 transition-colors md:px-12"
      >
        <div className="flex items-center gap-3">
          <LayoutGrid className="size-4 text-primary" />

          <div className="text-left">
            <p className="text-md font-semibold text-foreground">
              View all projects
            </p>

            <p className="text-sm text-foreground/70">
              Detailed write-ups behind each build
            </p>
          </div>
        </div>

        <ArrowRight className="size-5 text-foreground transition-transform duration-200 group-hover/view:translate-x-1 group-hover/view:bg-accent/25 rounded-full" />
      </Button>
    </div>
  );
}
