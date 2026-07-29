import { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";
import { MainCard } from "./MainCard";
import { ProjectsTable } from "../projects/ProjectsTable";
import { fetchNotionProjects } from "../../lib/notionProjects";
import type { Project } from "../../lib/notionProjects";
import ProjectsError from "../projects/ProjectsError";

interface ProjectsCardProps {
  onViewProjects: () => void;
}

type LoadStatus = "loading" | "loaded" | "error";

export function ProjectsCard({ onViewProjects }: ProjectsCardProps) {
  const [status, setStatus] = useState<LoadStatus>("loading");
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    fetchNotionProjects()
      .then((data) => {
        setProjects(data.slice(0, 3));
        setStatus("loaded");
      })
      .catch(() => setStatus("error"));
  }, []);

  return (
    <MainCard className="gap-3">
      <div className="flex items-center justify-between">
        <h3
          className="text-sm font-semibold text-foreground"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          Projects
        </h3>

        <button
          type="button"
          onClick={onViewProjects}
          className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:opacity-80 transition-opacity"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          View all
          <ArrowRight size={12} />
        </button>
      </div>

      {status === "loading" && (
        <div className="animate-pulse space-y-2">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="h-10 rounded-lg bg-muted" />
          ))}
        </div>
      )}

      {status === "error" && (
        <div className="justify-items-center">
          <ProjectsError />
        </div>
      )}

      {status === "loaded" && <ProjectsTable projects={projects} />}
    </MainCard>
  );
}
