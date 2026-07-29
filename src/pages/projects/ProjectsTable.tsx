import type { Project } from "../../lib/notionProjects";
import { ProjectLinks } from "./ProjectLinks";

interface ProjectsTableProps {
  projects: Project[];
}

export function ProjectsTable({ projects }: ProjectsTableProps) {
  return (
    <div className="overflow-hidden rounded-xl border border-border bg-card">
      <table className="w-full table-fixed">
        <thead>
          <tr className="border-b border-border bg-muted/40">
            <th className="w-[22%] px-5 py-3 text-left text-xs font-medium uppercase tracking-wide text-muted-foreground">
              Project
            </th>

            <th className="w-[38%] px-5 py-3 text-left text-xs font-medium uppercase tracking-wide text-muted-foreground">
              Description
            </th>

            <th className="w-[10%] px-5 py-3 text-center text-xs font-medium uppercase tracking-wide text-muted-foreground">
              Links
            </th>
          </tr>
        </thead>

        <tbody>
          {projects.map((project) => (
            <tr
              key={project.name}
              className="border-b border-border last:border-0 transition-colors hover:bg-muted/25"
            >
              {/* Project */}
              <td className="px-5 py-4 align-top">
                <div className="flex items-start gap-3">
                  <span className="text-sm leading-none">{project.emoji}</span>

                  <div className="min-w-0">
                    <h3 className="text-sm font-medium text-foreground">
                      {project.name}
                    </h3>

                    {project.kind && (
                      <span className="mt-2 inline-flex rounded-full border border-amber-200 bg-amber-50 px-2 py-0.5 text-[11px] font-medium text-amber-700 dark:border-amber-900/60 dark:bg-amber-950/40 dark:text-amber-300">
                        {project.kind}
                      </span>
                    )}
                  </div>
                </div>
              </td>

              {/* Description */}
              <td className="px-5 py-4 align-top">
                <p className="line-clamp-3 text-sm leading-6 text-muted-foreground">
                  {project.desc}
                </p>
              </td>

              {/* Links */}
              <td className="px-5 py-4 align-top">
                <div className="flex justify-center">
                  <ProjectLinks project={project} size={21} />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
