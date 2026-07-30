import { useEffect, useState } from "react";
import { ArrowLeft } from "lucide-react";

import { SITE_CONFIG } from "../../config";
import { fetchNotionProjects } from "../../lib/notionProjects";

import { ProjectLinks } from "./ProjectLinks";
import ProjectsError from "./ProjectsError";
import type { Project } from "@/data/projects";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";

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
          <ProjectsSkeleton key={i} />
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
          className="mb-5 inline-flex items-center gap-1.5 text-xs text-muted-foreground transition-colors hover:text-foreground"
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
interface ProjectCardProps {
  project: Project;
}

function ProjectCard({ project }: ProjectCardProps) {
  return (
    <article className="overflow-hidden border border-border bg-card shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/20 hover:shadow-lg">
      {/* Header */}
      <header className="p-6">
        <h2 className="text-xl font-semibold text-foreground">
          {project.name}
        </h2>

        <div className="mt-3 flex flex-wrap gap-2">
          <Badge>{project.type}</Badge>
          <Badge>{project.density}</Badge>
          {project.status === "Ongoing" && <Badge>{project.status}</Badge>}
        </div>

        <p className="mt-5 text-sm leading-7 text-muted-foreground">
          {project.description}
        </p>
      </header>

      {project.whatIDid && (
        <Section title="What I did">{project.whatIDid}</Section>
      )}
      {project.whyIDid && (
        <Section title="Why I built it">{project.whyIDid}</Section>
      )}
      {project.whoItHelps && (
        <Section title="Who it helps">{project.whoItHelps}</Section>
      )}

      <section className="border-t border-border px-6 py-5">
        <h3 className="mb-4 text-sm font-semibold text-foreground">Stack</h3>

        <div className="flex flex-wrap gap-2">
          {project.techStack.map((tech: string) => (
            <span
              key={tech}
              className="rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-800 dark:border-emerald-900/60 dark:bg-emerald-950/40 dark:text-emerald-300"
            >
              {tech}
            </span>
          ))}
        </div>
      </section>

      <footer className="border-t border-border p-5">
        <ProjectLinks project={project} variant="button" />
      </footer>
    </article>
  );
}

interface SectionProps {
  title: string;
  children: React.ReactNode;
}

function Section({ title, children }: SectionProps) {
  return (
    <section className="border-t border-border px-6 py-5">
      <div className="grid gap-3 md:grid-cols-[135px_1fr]">
        <h3 className="text-sm font-semibold text-foreground">{title}</h3>

        <p className="text-sm leading-7 text-muted-foreground">{children}</p>
      </div>
    </section>
  );
}

function ProjectsSkeleton() {
  return (
    <div className="overflow-hidden border border-border bg-card">
      {/* Header */}
      <div className="space-y-4 p-6">
        <Skeleton className="h-7 w-56" />

        <div className="flex gap-2">
          <Skeleton className="h-6 w-28 rounded-full" />
          <Skeleton className="h-6 w-28 rounded-full" />
          <Skeleton className="h-6 w-24 rounded-full" />
        </div>

        <div className="space-y-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />
          <Skeleton className="h-4 w-2/3" />
        </div>
      </div>

      {/* Sections */}
      {[...Array(3)].map((_, i) => (
        <div key={i} className="border-t border-border px-6 py-5">
          <Skeleton className="mb-4 h-4 w-32" />

          <div className="space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-4/5" />
            <Skeleton className="h-4 w-2/3" />
          </div>
        </div>
      ))}

      {/* Stack */}
      <div className="border-t border-border px-6 py-5">
        <Skeleton className="mb-4 h-4 w-16" />

        <div className="flex flex-wrap gap-2">
          <Skeleton className="h-7 w-20 rounded-full" />
          <Skeleton className="h-7 w-24 rounded-full" />
          <Skeleton className="h-7 w-16 rounded-full" />
          <Skeleton className="h-7 w-28 rounded-full" />
        </div>
      </div>

      {/* Footer */}
      <div className="border-t border-border p-6">
        <div className="flex gap-3">
          <Skeleton className="h-10 w-32 rounded-xl" />
          <Skeleton className="h-10 w-32 rounded-xl" />
          <Skeleton className="h-10 w-36 rounded-xl" />
        </div>
      </div>
    </div>
  );
}
