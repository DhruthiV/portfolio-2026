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
import { Link, useNavigate } from "react-router-dom";

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  const navigate = useNavigate();

  const handleArrowClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    event.stopPropagation();

    if (project.caseStudyId) {
      navigate(`/projects/case-study/${project.caseStudyId}`, {
        state: { title: project.name },
      });
    }
  };

  return (
    <Link
      to={
        project.caseStudyId
          ? `/projects/case-study/${project.caseStudyId}`
          : "#"
      }
      state={{ title: project.name }}
      className="block h-full"
    >
      <Card
        className={cn(
          "group relative flex h-full min-h-[430px] flex-col overflow-hidden rounded-sm border border-border bg-card pt-0",
          "transition-colors hover:border-accent/60",
        )}
      >
        {/* Image */}
        {project.pic ? (
          <div className="relative shrink-0 overflow-hidden">
            <img
              src={project.pic}
              alt={`${project.name} project preview`}
              className="aspect-[3/2] w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
            />
          </div>
        ) : (
          <div className="flex aspect-[16/9] shrink-0 items-center justify-center bg-muted text-sm text-muted-foreground">
            No preview available
          </div>
        )}

        {/* Content */}
        <CardHeader className="flex-1">
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
        <CardFooter className="shrink-0 justify-between">
          <Button
            variant="ghost"
            size="icon"
            onClick={handleArrowClick}
            aria-label={`View ${project.name}`}
            className="ml-auto h-8 w-8 text-muted-foreground transition-all hover:bg-accent/10 hover:text-foreground group-hover:translate-x-1"
          >
            <ArrowRight className="h-4 w-4" />
          </Button>
        </CardFooter>
      </Card>
    </Link>
  );
}
