import { useEffect, useState } from "react";

import type { ReactNode } from "react";

import {
  fallbackProfileContent,
  fetchProfileContent,
} from "@/lib/notionProfile";

import type { ProfileContent } from "@/lib/notionProfile";

import { fetchNotionProjects } from "@/lib/notionProjects";

import { PortfolioContext } from "./PortfolioContext";
import type { Project } from "@/data/projects";

export function PortfolioProvider({ children }: { children: ReactNode }) {
  const [profile, setProfile] = useState<ProfileContent>(
    fallbackProfileContent,
  );

  const [projects, setProjects] = useState<Project[]>([]);

  const [profileLoading, setProfileLoading] = useState(true);

  const [projectsLoading, setProjectsLoading] = useState(true);

  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadPortfolio() {
      const [profileResult, projectsResult] = await Promise.allSettled([
        fetchProfileContent(),
        fetchNotionProjects(),
      ]);

      if (profileResult.status === "fulfilled") {
        setProfile(profileResult.value);
      } else {
        console.error("Profile loading failed", profileResult.reason);

        setError("Failed to load profile");
      }

      if (projectsResult.status === "fulfilled") {
        setProjects(projectsResult.value);
      } else {
        console.error("Projects loading failed", projectsResult.reason);

        setError("Failed to load projects");
      }

      setProfileLoading(false);
      setProjectsLoading(false);
    }

    loadPortfolio();
  }, []);

  return (
    <PortfolioContext.Provider
      value={{
        profile,
        projects,

        profileLoading,
        projectsLoading,

        error,
      }}
    >
      {children}
    </PortfolioContext.Provider>
  );
}
