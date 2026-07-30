import { useEffect, useState } from "react";
import { ArrowRight, LayoutGrid } from "lucide-react";

import { fetchNotionProjects } from "@/lib/notionProjects";
import type { Project } from "@/data/projects";

import { Button } from "@/components/ui/button";

import ProjectsError from "../common/ProjectsError";
import { ProjectRow } from "./blocks/ProjectRow";
import { EmptyState } from "./blocks/EmptyState";

interface ProjectsCardProps {
  onViewProjects: () => void;
}

type LoadStatus = "loading" | "loaded" | "error";

export function ProjectsView({ onViewProjects }: ProjectsCardProps) {
  const [projects, setProjects] = useState<Project[]>([]);
  const [status, setStatus] = useState<LoadStatus>("loading");

  useEffect(() => {
    async function loadProjects() {
      try {
        const data = await fetchNotionProjects();

        const previewProjects = data
          .filter((project) => project.visibility && project.order != undefined)
          .sort((a, b) => {
            const orderA = a.order ?? Number.MAX_SAFE_INTEGER;
            const orderB = b.order ?? Number.MAX_SAFE_INTEGER;

            return orderA - orderB;
          });

        setProjects(previewProjects);
        setStatus("loaded");
      } catch {
        setStatus("error");
      }
    }

    loadProjects();
  }, []);

  if (status === "loading") {
    return <EmptyState />;
  }

  if (status === "error") {
    return (
      <div className="flex justify-center">
        <ProjectsError />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h2 className="text-center text-xl font-semibold text-foreground">
        Projects
      </h2>

      <div className="overflow-hidden border border-border bg-card">
        <div className="divide-y divide-border">
          {projects.map((project) => (
            <ProjectRow
              key={project.name}
              project={project}
              onViewProjects={onViewProjects}
            />
          ))}
        </div>
      </div>

      <Button
        variant="outline"
        onClick={onViewProjects}
        className="group/view h-auto w-full justify-between border border-accent/50 px-6 py-3 transition-colors md:px-12"
      >
        <div className="flex items-center gap-3">
          <LayoutGrid className="size-6 text-primary" />

          <div className="text-left">
            <p className="text-md font-semibold text-foreground">
              View all projects
            </p>

            <p className="text-sm text-foreground/70">
              Detailed write-ups behind each build
            </p>
          </div>
        </div>

        <ArrowRight className="size-5 text-foreground transition-transform duration-200 group-hover/view:translate-x-1" />
      </Button>
    </div>
  );
}
