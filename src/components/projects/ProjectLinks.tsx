import { ExternalLink } from "lucide-react";

import type { Project } from "../../lib/notionProjects";
import { GithubIcon } from "../icons/BrandIcons";

interface ProjectLinksProps {
  project: Project;
  size?: number;
}

export function ProjectLinks({ project, size = 22 }: ProjectLinksProps) {
  if (!project.github && !project.live) {
    return null;
  }

  return (
    <div className="flex items-center gap-1">
      {project.github && (
        <a
          href={project.github}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${project.name} GitHub`}
          className="rounded-lg p-2 text-muted-foreground transition-all duration-200 hover:bg-muted hover:text-foreground hover:scale-105"
        >
          <GithubIcon size={size} />
        </a>
      )}

      {project.live && (
        <a
          href={project.live}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${project.name} Live Demo`}
          className="rounded-lg p-2 text-muted-foreground transition-all duration-200 hover:bg-muted hover:text-foreground hover:scale-105"
        >
          <ExternalLink size={size} />
        </a>
      )}
    </div>
  );
}
