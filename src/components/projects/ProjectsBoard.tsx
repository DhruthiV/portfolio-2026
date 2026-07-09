import Masonry from "react-masonry-css";

import type { Project } from "../../lib/notionProjects";
import { ProjectLinks } from "./ProjectLinks";

interface ProjectsBoardProps {
  projects: Project[];
}

const breakpoints = {
  default: 3,
  1280: 3,
  1024: 2,
  768: 2,
  640: 1,
};

export function ProjectsBoard({ projects }: ProjectsBoardProps) {
  return (
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
            <span className="mt-0.5 shrink-0 text-base">{project.emoji}</span>

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
  );
}
