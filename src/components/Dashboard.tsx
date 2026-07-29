import { IdentityCard } from "./bento/IdentityCard";
import { ContactCard } from "./bento/ContactCard";
import { EducationCard } from "./bento/EducationCard";
import { JourneyCard } from "./bento/JourneyCard";
import { ProjectsCard } from "./bento/ProjectsCard";
import { SkillsCard } from "./bento/SkillsCard";
import { useEffect, useState } from "react";
import { CurrentFocusCard } from "./bento/CurrentFocusCard";
import {
  fallbackCurrentFocus,
  fetchCurrentFocus,
  type CurrentFocus,
} from "../lib/notionCurrentFocus";
import { BioCard } from "./bento/BioCard";

interface DashboardProps {
  onViewProjects: () => void;
}

export function Dashboard({ onViewProjects }: DashboardProps) {
  const [currentSkillFocus, setCurrentSkillFocus] =
    useState<CurrentFocus>(fallbackCurrentFocus);

  useEffect(() => {
    fetchCurrentFocus()
      .then(setCurrentSkillFocus)
      .catch(() => {});
  }, []);

  return (
    <div id="dashboard-scroll" className="h-full overflow-y-auto">
      <div className="min-h-full flex justify-center p-4 md:p-8">
        <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-[300px_1fr] gap-8 md:gap-12">
          {/* Sidebar — identity, currently, contact */}
          <aside className="flex flex-col gap-4 md:sticky md:top-8 md:self-start order-1">
            <IdentityCard />
            <CurrentFocusCard {...currentSkillFocus} />
            <ContactCard />
          </aside>

          {/* Main content — experience, projects, skills, education */}
          <main className="flex flex-col gap-10 order-2">
            <BioCard />
            <JourneyCard />
            <ProjectsCard onViewProjects={onViewProjects} />
            <SkillsCard {...currentSkillFocus} />
            <EducationCard />
          </main>
        </div>
      </div>
    </div>
  );
}
