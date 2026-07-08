import { useState } from "react";
import { ArrowLeft, Table2, LayoutGrid, ExternalLink } from "lucide-react";
import { GithubIcon } from "./icons/BrandIcons";
import { PROJECTS, type Project, type ProjectStatus } from "../data/projects";
import { SITE_CONFIG } from "../config";

type ViewMode = "table" | "board";

const STATUS_DOT: Record<ProjectStatus, string> = {
  Completed: "bg-emerald-500",
  "In Progress": "bg-amber-500",
};

const STATUS_COLUMNS: ProjectStatus[] = ["In Progress", "Completed"];

interface ProjectsPageProps {
  onBack: () => void;
}

export function ProjectsPage({ onBack }: ProjectsPageProps) {
  const [view, setView] = useState<ViewMode>("table");

  return (
    <div className="h-full overflow-y-auto">
      <div className="max-w-5xl mx-auto p-4 md:p-8">
        {/* Breadcrumb / back */}
        <button
          type="button"
          onClick={onBack}
          className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors mb-4"
        >
          <ArrowLeft size={13} /> Back ·{" "}
          <span className="text-foreground/70">{SITE_CONFIG.name.toLowerCase().replace(" ", ".")}</span> ·{" "}
          <span className="font-medium text-foreground">Projects</span>
        </button>

        {/* Header */}
        <div className="flex items-start justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-bold text-foreground mb-1" style={{ fontFamily: "var(--font-heading)" }}>
              Projects
            </h1>
            <p className="text-sm text-muted-foreground">
              {PROJECTS.length} builds · personal projects, internship work, and learning
            </p>
          </div>

          <div className="flex items-center gap-1 p-1 rounded-lg border border-border bg-muted/40 shrink-0">
            <button
              type="button"
              onClick={() => setView("table")}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
                view === "table" ? "bg-card text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Table2 size={13} /> Table
            </button>
            <button
              type="button"
              onClick={() => setView("board")}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
                view === "board" ? "bg-card text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <LayoutGrid size={13} /> Board
            </button>
          </div>
        </div>

        {/* Notion integration note */}
        <div className="rounded-lg border border-primary/20 bg-primary/5 px-4 py-2.5 mb-6 text-xs text-muted-foreground">
          <span className="font-medium text-primary">Notion integration ready</span> — swap the local{" "}
          <code className="px-1 py-0.5 rounded bg-muted text-foreground/80">PROJECTS</code> array in{" "}
          <code className="px-1 py-0.5 rounded bg-muted text-foreground/80">data/projects.ts</code> for a fetch from
          your published Notion page once the URL is ready.
        </div>

        {view === "table" ? <ProjectsTable /> : <ProjectsBoard />}
      </div>
    </div>
  );
}

function ProjectsTable() {
  return (
    <div className="rounded-xl border border-border bg-card overflow-hidden">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-border bg-muted/40 text-xs text-muted-foreground">
            <th className="text-left font-medium px-4 py-2.5">Name</th>
            <th className="text-left font-medium px-4 py-2.5">Type</th>
            <th className="text-left font-medium px-4 py-2.5 hidden sm:table-cell">Stack</th>
            <th className="text-left font-medium px-4 py-2.5">Status</th>
            <th className="text-left font-medium px-4 py-2.5 hidden md:table-cell">Year</th>
            <th className="text-left font-medium px-4 py-2.5">Links</th>
          </tr>
        </thead>
        <tbody>
          {PROJECTS.map((p) => (
            <tr key={p.name} className="border-b border-border last:border-0 hover:bg-muted/30 transition-colors">
              <td className="px-4 py-3">
                <span className="inline-flex items-center gap-2 font-medium text-foreground">
                  <span>{p.emoji}</span>
                  {p.name}
                </span>
              </td>
              <td className="px-4 py-3">
                <span className="text-xs px-2 py-0.5 rounded-full border border-border text-muted-foreground">
                  {p.category}
                </span>
              </td>
              <td className="px-4 py-3 hidden sm:table-cell">
                <div className="flex flex-wrap gap-1">
                  {p.tech.slice(0, 3).map((t) => (
                    <span key={t} className="text-xs px-1.5 py-0.5 rounded bg-muted text-muted-foreground">
                      {t}
                    </span>
                  ))}
                  {p.tech.length > 3 && (
                    <span className="text-xs text-muted-foreground/70">+{p.tech.length - 3}</span>
                  )}
                </div>
              </td>
              <td className="px-4 py-3">
                <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
                  <span className={`w-1.5 h-1.5 rounded-full ${STATUS_DOT[p.status]}`} />
                  {p.status}
                </span>
              </td>
              <td className="px-4 py-3 hidden md:table-cell text-xs text-muted-foreground">{p.year}</td>
              <td className="px-4 py-3">
                <ProjectLinks project={p} size={13} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function ProjectsBoard() {
  return (
    <div className="grid sm:grid-cols-2 gap-4">
      {STATUS_COLUMNS.map((status) => {
        const items = PROJECTS.filter((p) => p.status === status);
        return (
          <div key={status} className="rounded-xl border border-border bg-muted/20 p-3">
            <div className="flex items-center gap-2 px-1 pb-3">
              <span className={`w-2 h-2 rounded-full ${STATUS_DOT[status]}`} />
              <span className="text-xs font-semibold text-foreground uppercase tracking-wide">{status}</span>
              <span className="text-xs text-muted-foreground">{items.length}</span>
            </div>
            <div className="space-y-2">
              {items.map((p) => (
                <div key={p.name} className="rounded-lg border border-border bg-card p-3 space-y-2">
                  <div className="flex items-start justify-between gap-2">
                    <span className="text-sm font-medium text-foreground flex items-center gap-1.5">
                      <span>{p.emoji}</span> {p.name}
                    </span>
                    <ProjectLinks project={p} size={12} />
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed">{p.tagline}</p>
                  <div className="flex flex-wrap gap-1">
                    <span className="text-xs px-1.5 py-0.5 rounded bg-muted text-muted-foreground">
                      {p.category}
                    </span>
                    {p.tech.slice(0, 2).map((t) => (
                      <span key={t} className="text-xs px-1.5 py-0.5 rounded bg-muted text-muted-foreground">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}

function ProjectLinks({ project, size }: { project: Project; size: number }) {
  return (
    <div className="flex items-center gap-1.5">
      <a
        href={project.github}
        aria-label={`${project.name} on GitHub`}
        className="text-muted-foreground hover:text-foreground transition-colors"
      >
        <GithubIcon size={size} />
      </a>
      {project.live && (
        <a
          href={project.live}
          aria-label={`${project.name} live site`}
          className="text-muted-foreground hover:text-foreground transition-colors"
        >
          <ExternalLink size={size} />
        </a>
      )}
    </div>
  );
}
