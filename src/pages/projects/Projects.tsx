// import { useEffect, useState } from "react";
// import { ArrowRight, LayoutGrid } from "lucide-react";

// import { fetchNotionProjects } from "@/lib/notionProjects";

// import { Button } from "@/components/ui/button";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";

// import ProjectsError from "./ProjectsError";
// import { ProjectLinks } from "./ProjectLinks";
// import type { Project } from "@/data/projects";

// interface ProjectsCardProps {
//   onViewProjects: () => void;
// }

// type LoadStatus = "loading" | "loaded" | "error";

// export function Projects({ onViewProjects }: ProjectsCardProps) {
//   const [projects, setProjects] = useState<Project[]>([]);
//   const [status, setStatus] = useState<LoadStatus>("loading");
//   useEffect(() => {
//     (async () => {
//       try {
//         const data = await fetchNotionProjects();

//         setProjects(data);
//         setStatus("loaded");
//       } catch {
//         setStatus("error");
//       }
//     })();
//   }, []);

//   if (status === "loading") {
//     return (
//       <>
//         <h2 className="text-center text-xl font-semibold text-foreground">
//           Projects
//         </h2>
//         <div className="space-y-2 animate-pulse">
//           {[...Array(3)].map((_, index) => (
//             <div key={index} className="h-16 rounded-lg bg-muted" />
//           ))}
//         </div>
//       </>
//     );
//   }

//   if (status === "error") {
//     return (
//       <div className="flex justify-center">
//         <ProjectsError />
//       </div>
//     );
//   }

//   return (
//     <div className="space-y-4">
//       <h2 className="text-center text-xl font-semibold text-foreground">
//         Projects
//       </h2>
//       <div className="overflow-hidden border border-border bg-card">
//         <Table className="table-fixed">
//           <TableHeader>
//             <TableRow className="hover:bg-transparent">
//               <TableHead className="w-[180px] px-6">Project</TableHead>

//               <TableHead className="px-6">Description</TableHead>

//               <TableHead className="w-[150px] text-center">Links</TableHead>

//               <TableHead className="w-[50px] text-center" />
//             </TableRow>
//           </TableHeader>

//           <TableBody>
//             {projects.map((project) => (
//               <TableRow
//                 key={project.name}
//                 className="transition-colors hover:bg-accent/10"
//               >
//                 {/* Project */}
//                 <TableCell className="w-[100px] px-6 py-5 align-top">
//                   <h3 className="whitespace-normal break-words text-sm font-semibold leading-6 text-foreground">
//                     {project.name}
//                   </h3>
//                 </TableCell>

//                 {/* Description */}
//                 <TableCell className="px-6 py-5 align-top">
//                   <p className="whitespace-normal break-words text-sm leading-6 text-muted-foreground">
//                     {project.description}
//                   </p>
//                 </TableCell>

//                 {/* Links */}
//                 <TableCell className="w-[72px] px-4 py-5 align-top">
//                   <div className="flex justify-start">
//                     <ProjectLinks project={project} size={18} />
//                   </div>
//                 </TableCell>

//                 {/* View */}
//                 <TableCell className="w-[72px] px-4 py-5 align-top">
//                   <div className="flex justify-center">
//                     <Button
//                       variant="ghost"
//                       size="icon"
//                       onClick={onViewProjects}
//                       className="h-8 w-8 text-muted-foreground transition-all hover:translate-x-1 hover:bg-accent/10"
//                     >
//                       <ArrowRight className="h-4 w-4" />
//                     </Button>
//                   </div>
//                 </TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </div>

//       <Button
//         variant="outline"
//         onClick={onViewProjects}
//         className="group/view h-auto w-full justify-between border border-accent/50 px-12 py-2 transition-colors"
//       >
//         <div className="flex items-center gap-2">
//           <LayoutGrid className="size-6 text-primary" />

//           <div className="text-left">
//             <p className="text-lg font-semibold text-foreground">
//               View all projects
//             </p>

//             <p className="text-sm text-foreground/70">
//               Detailed write-ups behind each build
//             </p>
//           </div>
//         </div>

//         <ArrowRight className="size-5 text-foreground transition-transform duration-200 group-hover/view:translate-x-1" />
//       </Button>
//     </div>
//   );
// }

import { useEffect, useState } from "react";
import { ArrowRight, LayoutGrid } from "lucide-react";

import { fetchNotionProjects } from "@/lib/notionProjects";
import type { Project } from "@/data/projects";

import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

import ProjectsError from "./ProjectsError";
import { ProjectLinks } from "./ProjectLinks";

interface ProjectsCardProps {
  onViewProjects: () => void;
}

type LoadStatus = "loading" | "loaded" | "error";

export function Projects({ onViewProjects }: ProjectsCardProps) {
  const [projects, setProjects] = useState<Project[]>([]);
  const [status, setStatus] = useState<LoadStatus>("loading");

  useEffect(() => {
    async function loadProjects() {
      try {
        const data = await fetchNotionProjects();

        const previewProjects = data
          .filter((project) => project.visibility && project.order != undefined)
          .sort((a, b) => {
            const orderA = a.order ?? Number.MAX_SAFE_INTEGER;
            const orderB = b.order ?? Number.MAX_SAFE_INTEGER;

            return orderA - orderB;
          });

        setProjects(previewProjects);
        setStatus("loaded");
      } catch {
        setStatus("error");
      }
    }

    loadProjects();
  }, []);

  if (status === "loading") {
    return <ProjectsSkeleton />;
  }

  if (status === "error") {
    return (
      <div className="flex justify-center">
        <ProjectsError />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h2 className="text-center text-xl font-semibold text-foreground">
        Projects
      </h2>

      <div className="overflow-hidden rounded-xl border border-border bg-card">
        <div className="divide-y divide-border">
          {projects.map((project) => (
            <ProjectRow
              key={project.name}
              project={project}
              onViewProjects={onViewProjects}
            />
          ))}
        </div>
      </div>

      <Button
        variant="outline"
        onClick={onViewProjects}
        className="group/view h-auto w-full justify-between border border-accent/50 px-6 py-3 transition-colors md:px-12"
      >
        <div className="flex items-center gap-3">
          <LayoutGrid className="size-6 text-primary" />

          <div className="text-left">
            <p className="text-lg font-semibold text-foreground">
              View all projects
            </p>

            <p className="text-sm text-foreground/70">
              Detailed write-ups behind each build
            </p>
          </div>
        </div>

        <ArrowRight className="size-5 text-foreground transition-transform duration-200 group-hover/view:translate-x-1" />
      </Button>
    </div>
  );
}

interface ProjectRowProps {
  project: Project;
  onViewProjects: () => void;
}

function ProjectRow({ project, onViewProjects }: ProjectRowProps) {
  return (
    <div className="group flex gap-4 p-5 transition-colors hover:bg-accent/5">
      {/* Index */}
      <div className="hidden pt-1 text-xs font-medium text-muted-foreground/50 sm:block">
        {String(project.order).padStart(2, "0")}
      </div>

      <div className="min-w-0 flex-1">
        {/* Header */}
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="text-base font-semibold text-foreground transition-colors group-hover:text-primary">
              {project.name}
            </h3>

            <div className="mt-1 flex flex-wrap">
              <span className="rounded-full border border-border bg-muted px-2 py-1 text-[11px] font-medium text-foreground">
                {project.type}
              </span>

              <span className="rounded-full border border-border bg-muted px-2 py-1 text-[11px] font-medium text-foreground">
                {project.status}
              </span>
            </div>
          </div>
        </div>

        {/* Description */}
        <p className="mt-4 line-clamp-2 text-sm leading-6 text-muted-foreground">
          {project.description}
        </p>

        {/* Footer */}
        <div className="mt-4 flex items-center justify-between">
          <ProjectLinks project={project} size={18} />

          <Button
            variant="ghost"
            size="icon"
            onClick={onViewProjects}
            aria-label={`View ${project.name}`}
            className="h-8 w-8 text-muted-foreground transition-all group-hover:translate-x-1 group-hover:text-foreground hover:bg-accent/10"
          >
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}

function ProjectsSkeleton() {
  return (
    <div className="space-y-4">
      <h2 className="text-center text-xl font-semibold text-foreground">
        Projects
      </h2>

      <div className="overflow-hidden rounded-xl border border-border bg-card">
        <div className="divide-y divide-border">
          {Array.from({ length: 3 }).map((_, index) => (
            <div key={index} className="flex gap-4 p-5">
              <div className="flex-1 space-y-3">
                <Skeleton className="h-4 w-40" />

                <div className="space-y-2">
                  <Skeleton className="h-3 w-full" />
                  <Skeleton className="h-3 w-4/5" />
                </div>

                <div className="flex gap-2">
                  <Skeleton className="h-8 w-8 rounded-md" />
                  <Skeleton className="h-8 w-8 rounded-md" />
                </div>
              </div>

              <Skeleton className="h-8 w-8 rounded-md" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
