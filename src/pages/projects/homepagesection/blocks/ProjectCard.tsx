import type { Project } from "@/data/projects";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { useNavigate } from "react-router-dom";

interface ProjectCardProps {
  project: Project;
  onViewProjects: () => void;
}

export function ProjectCard({ project }: ProjectCardProps) {
  const navigate = useNavigate();

  const handleOpen = () => {
    if (project.caseStudyId) {
      navigate(`/projects/case-study/${project.caseStudyId}`, {
        state: { title: project.name },
      });
    }
  };

  return (
    <Card
      onClick={handleOpen}
      className={cn(
        "group relative overflow-hidden rounded-sm border border-border bg-card pt-0",
        "transition-colors hover:border-accent/60",
      )}
    >
      {/* Image */}
      {project.pic ? (
        <div className="relative overflow-hidden">
          <img
            src={project.pic}
            alt={`${project.name} project preview`}
            className="aspect-[3/2] w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
          />
        </div>
      ) : (
        <div className="flex aspect-[16/9] items-center justify-center bg-muted text-sm text-muted-foreground">
          No preview available
        </div>
      )}

      {/* Content */}
      <CardHeader>
        <CardTitle className="text-xl font-semibold transition-colors group-hover:text-primary">
          {project.name}
        </CardTitle>

        <div className="flex flex-wrap gap-1.5">
          <span className="rounded-full border border-border bg-muted px-2 py-1 text-[11px] font-medium text-foreground">
            {project.type}
          </span>

          <span className="rounded-full border border-border bg-muted px-2 py-1 text-[11px] font-medium text-foreground">
            {project.status}
          </span>
        </div>

        <CardDescription className="mt-2 line-clamp-3 text-md leading-6">
          {project.description}
        </CardDescription>
      </CardHeader>

      {/* Footer */}
      <CardFooter className="justify-between">
        {/* <ProjectLinks project={project} size={18} /> */}

        <Button
          variant="ghost"
          size="icon"
          onClick={handleOpen}
          aria-label={`View ${project.name}`}
          className="ml-auto h-8 w-8 text-muted-foreground transition-all hover:bg-accent/10 hover:text-foreground group-hover:translate-x-1"
        >
          <ArrowRight className="h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
}
