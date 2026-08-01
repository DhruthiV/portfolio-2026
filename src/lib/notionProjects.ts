import type { Project } from "@/data/projects";

let pendingRequest: Promise<Project[]> | null = null;

export async function fetchNotionProjects(): Promise<Project[]> {
  // Prevent duplicate requests if multiple components request at once
  if (pendingRequest) {
    return pendingRequest;
  }

  pendingRequest = fetch("/api/notion-projects")
    .then(async (res) => {
      if (!res.ok) {
        throw new Error("Failed to fetch projects");
      }

      return res.json();
    })
    .then((projects: Project[]) => {
      pendingRequest = null;
      return projects;
    })
    .catch((err) => {
      pendingRequest = null;
      throw err;
    });

  return pendingRequest;
}
