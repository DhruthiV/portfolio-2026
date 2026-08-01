export interface ProfileContent {
  bio: {
    headline: string;
    summary: string[];
  };

  currentWork: {
    type:
      | "Building"
      | "Learning"
      | "Exploring"
      | "Collaborating"
      | "Contributing";
    title: string;
    description: string;
  };

  skills: string[];
}

let pendingRequest: Promise<ProfileContent> | null = null;

export const fallbackProfileContent: ProfileContent = {
  bio: {
    headline: "",
    summary: [],
  },

  currentWork: {
    type: "Building",
    title: "Web Apps",
    description: "Designing and building full-stack and frontend applications.",
  },

  skills: [],
};

export async function fetchProfileContent(): Promise<ProfileContent> {
  if (pendingRequest) return pendingRequest;

  pendingRequest = fetch("/api/notion-profile")
    .then(async (res) => {
      if (!res.ok) throw new Error();

      return res.json();
    })
    .catch(() => fallbackProfileContent)
    .finally(() => {
      pendingRequest = null;
    });

  return pendingRequest;
}
