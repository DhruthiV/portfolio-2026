export interface CurrentFocus {
  type: "Building" | "Learning" | "Exploring" | "Collaboration";
  title: string;
  description: string;
  link?: string;
  skills?: string[];
}

let pendingRequest: Promise<CurrentFocus> | null = null;

export const fallbackCurrentFocus: CurrentFocus = {
  type: "Learning",
  title: "System Design",
  description:
    "Learning scalable backend architecture and distributed systems.",
};

export async function fetchCurrentFocus(): Promise<CurrentFocus> {
  if (pendingRequest) return pendingRequest;

  pendingRequest = fetch("/api/notion-current-focus")
    .then(async (res) => {
      if (!res.ok) throw new Error();

      return res.json();
    })
    .catch(() => fallbackCurrentFocus)
    .finally(() => {
      pendingRequest = null;
    });

  return pendingRequest;
}
