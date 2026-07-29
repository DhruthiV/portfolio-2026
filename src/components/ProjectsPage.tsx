import { useEffect, useState, lazy, Suspense } from "react";
import { ArrowLeft } from "lucide-react";
import { SITE_CONFIG } from "../config";
import type { Project } from "../lib/notionProjects";
import { fetchNotionProjects } from "../lib/notionProjects";
import ProjectsError from "./projects/ProjectsError";

type LoadStatus = "loading" | "loaded" | "error";

interface ProjectsPageProps {
  onBack: () => void;
}

const ProjectsBoard = lazy(() =>
  import("./projects/ProjectsBoard").then((m) => ({
    default: m.ProjectsBoard,
  })),
);

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

  return (
    <div className="h-full overflow-y-auto">
      <div className="min-h-full flex justify-center">
        <div className="w-full max-w-5xl px-4 py-6 md:px-8 md:py-8">
          <button
            type="button"
            onClick={onBack}
            className="mb-5 inline-flex items-center gap-1.5 text-xs text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft size={13} />
            Back ·<span className="text-foreground/70">{SITE_CONFIG.name}</span>
            ·<span className="font-medium text-foreground">Projects</span>
          </button>

          <div className="mb-7">
            <h1
              className="mb-1 text-2xl font-bold text-foreground"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              Projects
            </h1>

            <p className="text-sm text-muted-foreground">
              {status === "loaded"
                ? `${projects.length} builds · personal projects, internship work, and learning`
                : "Loading projects..."}
            </p>
          </div>

          {status === "loading" && (
            <div className="flex min-h-[60vh] items-center justify-center">
              <ProjectsSkeleton />
            </div>
          )}

          {status === "error" && (
            <div className="flex min-h-[60vh] items-center justify-center">
              <ProjectsError />
            </div>
          )}

          {status === "loaded" && (
            <Suspense fallback={<ProjectsSkeleton />}>
              <ProjectsBoard projects={projects} />
            </Suspense>
          )}
        </div>
      </div>
    </div>
  );
}

function ProjectsSkeleton() {
  return (
    <div className="w-full animate-pulse overflow-hidden rounded-xl border border-border bg-card">
      <div className="border-b border-border bg-muted/30 px-5 py-4">
        <div className="h-4 w-40 rounded bg-muted" />
      </div>
      {[...Array(6)].map((_, i) => (
        <div
          key={i}
          className="flex items-center gap-6 border-b border-border px-5 py-5 last:border-0"
        >
          <div className="h-10 w-10 rounded-full bg-muted" />
          <div className="flex-1 space-y-3">
            <div className="h-4 w-48 rounded bg-muted" />
            <div className="h-3 w-full rounded bg-muted" />
            <div className="h-3 w-2/3 rounded bg-muted" />
          </div>
        </div>
      ))}
    </div>
  );
}
