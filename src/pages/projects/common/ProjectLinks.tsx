import type { ComponentType } from "react";
import type { Project } from "@/data/projects";
import { ExternalLink } from "lucide-react";
import { GithubIcon, YoutubeIcon } from "@/components/icons/BrandIcons";

interface ProjectLinksProps {
  project: Project;
  size?: number;
  variant?: "icon" | "button";
}

interface LinkItem {
  key: string;
  href?: string;
  label: string;
  Icon: ComponentType<{
    size?: number;
    className?: string;
  }>;
}

export function ProjectLinks({
  project,
  size = 22,
  variant = "icon",
}: ProjectLinksProps) {
  const links: LinkItem[] = [
    {
      key: "github",
      href: project.github,
      label: "View Code",
      Icon: GithubIcon,
    },
    {
      key: "live",
      href: project.liveUrl,
      label: "Live Demo",
      Icon: ExternalLink,
    },
    {
      key: "youtube",
      href: project.youtube,
      label: "Watch Walkthrough",
      Icon: YoutubeIcon,
    },
  ];

  const visibleLinks = links.filter(
    (link): link is LinkItem & { href: string } => Boolean(link.href),
  );

  if (visibleLinks.length === 0) {
    return null;
  }

  return (
    <div className="flex flex-wrap gap-1 ">
      {visibleLinks.map(({ key, href, label, Icon }) => (
        <a
          key={key}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${project.name} ${label}`}
          className={
            variant === "button"
              ? "inline-flex items-center gap-2 rounded-xl border border-border px-4 py-2 text-sm font-medium transition-colors hover:bg-muted"
              : "p-2 text-muted-foreground transition-all duration-200 hover:text-foreground hover:scale-105"
          }
        >
          <Icon size={variant === "button" ? 18 : size} />

          {variant === "button" && <span>{label}</span>}
        </a>
      ))}
    </div>
  );
}
