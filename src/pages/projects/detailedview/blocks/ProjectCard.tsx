import type { Project } from "@/data/projects";
import { ProjectLinks } from "../../common/ProjectLinks";
import { Badge } from "@/components/ui/badge";

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <article className="overflow-hidden border border-border bg-card shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/20 hover:shadow-lg">
      {/* Header */}
      <header className="p-6">
        <h2 className="text-xl font-semibold text-foreground">
          {project.name}
        </h2>

        <div className="mt-3 flex flex-wrap gap-2">
          <Badge className="bg-chart-5">{project.type}</Badge>
          <Badge variant="secondary">{project.density}</Badge>
          {project.status === "Ongoing" && (
            <Badge className="bg-secondary text-chart-1">
              <span className="h-1 w-1 shrink-0 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_#10b981]" />
              {project.status}
            </Badge>
          )}
        </div>

        <p className="mt-5 text-sm leading-7 text-foreground/75">
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
