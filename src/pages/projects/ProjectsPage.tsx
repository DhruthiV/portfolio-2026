import { useEffect, useState } from "react";
import { ArrowLeft } from "lucide-react";
import { SITE_CONFIG } from "../../config";
import type { Project } from "../../lib/notionProjects";
import { fetchNotionProjects } from "../../lib/notionProjects";
import ProjectsError from "./ProjectsError";
import Masonry from "react-masonry-css";
import { ProjectLinks } from "./ProjectLinks";

type LoadStatus = "loading" | "loaded" | "error";

interface ProjectsPageProps {
  onBack: () => void;
}

const breakpoints = {
  default: 3,
  1280: 3,
  1024: 2,
  768: 2,
  640: 1,
};

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
            <Masonry
              breakpointCols={breakpoints}
              className="flex gap-5"
              columnClassName="flex flex-col gap-5"
            >
              {projects.map((project) => (
                <article
                  key={project.name}
                  className="group overflow-hidden rounded-2xl border border-border bg-card p-5 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-primary/20 hover:shadow-lg"
                >
                  {/* Header */}
                  <div className="flex items-start gap-2">
                    <span className="mt-0.5 shrink-0 text-base">
                      {project.emoji}
                    </span>

                    <div className="min-w-0 flex-1">
                      <h3 className="truncate text-base font-semibold text-foreground">
                        {project.name}
                      </h3>

                      <div className="mt-2 flex flex-wrap gap-2">
                        {project.category && (
                          <span className="rounded-full border border-blue-200 bg-blue-50 px-2.5 py-1 text-[11px] font-medium text-blue-700 dark:border-blue-900/60 dark:bg-blue-950/40 dark:text-blue-300">
                            {project.category}
                          </span>
                        )}

                        {project.kind && (
                          <span className="rounded-full border border-amber-200 bg-amber-50 px-2.5 py-1 text-[11px] font-medium text-amber-700 dark:border-amber-900/60 dark:bg-amber-950/40 dark:text-amber-300">
                            {project.kind}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="mt-4 text-sm leading-6 text-muted-foreground">
                    {project.desc}
                  </p>

                  {/* Tech */}
                  {project.tech.length > 0 && (
                    <div className="mt-5 flex flex-wrap gap-2">
                      {project.tech.map((tech) => (
                        <span
                          key={tech}
                          className="rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-1 text-[11px] font-medium text-emerald-700 dark:border-emerald-900/60 dark:bg-emerald-950/40 dark:text-emerald-300"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Footer */}
                  <div className="mt-5 flex justify-center border-t border-border pt-4">
                    <ProjectLinks project={project} size={24} />
                  </div>
                </article>
              ))}
            </Masonry>
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
