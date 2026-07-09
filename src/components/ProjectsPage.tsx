import { useEffect, useState } from "react";
import {
  ArrowLeft,
  LayoutGrid,
  Table2,
  AlertCircle,
  ExternalLink,
} from "lucide-react";
import { lazy, Suspense } from "react";
import { ProjectsTable } from "./projects/ProjectsTable";
import { SITE_CONFIG } from "../config";
import type { Project } from "../lib/notionProjects";
import { fetchNotionProjects } from "../lib/notionProjects";
type ViewMode = "table" | "board";
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
  const [view, setView] = useState<ViewMode>("table");
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
          {/* Back */}
          <button
            type="button"
            onClick={onBack}
            className="mb-5 inline-flex items-center gap-1.5 text-xs text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft size={13} />
            Back ·<span className="text-foreground/70">{SITE_CONFIG.name}</span>
            ·<span className="font-medium text-foreground">Projects</span>
          </button>

          {/* Header */}
          <div className="mb-7 flex items-start justify-between gap-4">
            <div>
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

            {/* Desktop only */}
            <div className="hidden sm:flex items-center gap-1 rounded-lg border border-border bg-muted/40 p-1">
              <button
                type="button"
                disabled={status !== "loaded"}
                onClick={() => setView("table")}
                className={`inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-medium transition-colors disabled:opacity-50 ${
                  view === "table"
                    ? "bg-card text-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <Table2 size={13} />
                Table
              </button>

              <button
                type="button"
                disabled={status !== "loaded"}
                onClick={() => setView("board")}
                className={`inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-medium transition-colors disabled:opacity-50 ${
                  view === "board"
                    ? "bg-card text-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <LayoutGrid size={13} />
                Board
              </button>
            </div>
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
            <>
              {/* Mobile */}
              <div className="sm:hidden">
                <Suspense fallback={<ProjectsSkeleton />}>
                  <ProjectsBoard projects={projects} />
                </Suspense>
              </div>

              {/* Desktop */}
              <div className="hidden sm:block">
                {view === "table" ? (
                  <ProjectsTable projects={projects} />
                ) : (
                  <Suspense fallback={<ProjectsSkeleton />}>
                    <ProjectsBoard projects={projects} />
                  </Suspense>
                )}
              </div>
            </>
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

function ProjectsError() {
  return (
    <div className="max-w-md rounded-xl border border-border bg-card p-10 text-center">
      <div className="mx-auto mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-amber-500/10">
        <AlertCircle size={18} className="text-amber-600" />
      </div>

      <h3 className="mb-2 text-sm font-medium text-foreground">
        Couldn't load the live project list.
      </h3>

      <p className="mb-5 text-xs leading-6 text-muted-foreground">
        The Notion connection is temporarily unavailable.
      </p>

      <a
        href={SITE_CONFIG.notionProjectsUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
      >
        View on Notion
        <ExternalLink size={13} />
      </a>
    </div>
  );
}
