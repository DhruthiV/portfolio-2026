export interface Project {
  name: string;
  emoji: string;
  desc: string;
  category: string;
  kind: string;
  tech: string[];
  github: string;
  live?: string;
}

const CACHE_KEY = "portfolio-projects";

let memoryCache: Project[] | null = null;
let pendingRequest: Promise<Project[]> | null = null;

export async function fetchNotionProjects(): Promise<Project[]> {
  // Memory cache (fastest)
  if (memoryCache) {
    return memoryCache;
  }

  // Session cache
  const cached = sessionStorage.getItem(CACHE_KEY);

  if (cached) {
    const projects = JSON.parse(cached) as Project[];

    memoryCache = projects;

    return projects;
  }

  // Avoid duplicate requests
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
      memoryCache = projects;

      sessionStorage.setItem(CACHE_KEY, JSON.stringify(projects));

      pendingRequest = null;

      return projects;
    })
    .catch((err) => {
      pendingRequest = null;
      throw err;
    });

  return pendingRequest;
}
