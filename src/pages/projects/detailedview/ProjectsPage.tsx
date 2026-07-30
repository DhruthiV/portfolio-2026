import { useEffect, useState } from "react";
import { ArrowLeft } from "lucide-react";

import { SITE_CONFIG } from "../../../config";
import { fetchNotionProjects } from "../../../lib/notionProjects";

import ProjectsError from "../common/ProjectsError";
import type { Project } from "@/data/projects";
import { ProjectCard } from "./blocks/ProjectCard";
import { EmptyState } from "./blocks/EmptyState";

type LoadStatus = "loading" | "loaded" | "error";

interface ProjectsPageProps {
  onBack: () => void;
}

export function ProjectsPage({ onBack }: ProjectsPageProps) {
  const [status, setStatus] = useState<LoadStatus>("loading");
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    fetchNotionProjects()
      .then((data) => {
        setProjects(data);
        setStatus("loaded");
      })
      .catch(() => setStatus("error"));
  }, []);

  let content: React.ReactNode;

  if (status === "loading") {
    content = (
      <div className="grid gap-6 lg:grid-cols-2">
        {Array.from({ length: 4 }, (_, i) => (
          <EmptyState key={i} />
        ))}
      </div>
    );
  } else if (status === "error") {
    content = (
      <div className="flex min-h-[60vh] items-center justify-center">
        <ProjectsError />
      </div>
    );
  } else {
    content = (
      <div className="grid gap-6 lg:grid-cols-2">
        {projects.map((project) => (
          <ProjectCard key={project.name} project={project} />
        ))}
      </div>
    );
  }

  return (
    <div className="h-full overflow-y-auto">
      <div className="mx-auto w-full max-w-7xl px-4 py-6 md:px-8 md:py-8">
        <button
          type="button"
          onClick={onBack}
          className="mb-5 inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft size={13} />
          Back ·<span className="text-foreground/70">{SITE_CONFIG.name}</span> ·
          <span className="font-medium text-foreground">Projects</span>
        </button>

        <div className="mb-8">
          <h1
            className="text-3xl font-bold text-foreground"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Projects
          </h1>

          <p className="mt-2 text-sm text-muted-foreground">
            {status === "loaded"
              ? `${projects.length} builds · personal projects, internship work, and learning`
              : "Loading projects..."}
          </p>
        </div>

        {content}
      </div>
    </div>
  );
}
