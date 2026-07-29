import { useState, useEffect } from "react";
import { Bio } from "../../modules/Bio";
import { CurrentFocus } from "../../modules/CurrentFocus";
import { Education } from "../../modules/Education";
import { Identity } from "../../modules/Identity";

import {
  fallbackCurrentFocus,
  fetchCurrentFocus,
  type CurrentFocusType,
} from "../../lib/notionCurrentFocus";
import { Projects } from "../projects/Projects";
import { ContactMe } from "../../modules/ContactMe";
import { Journey } from "@/modules/Journey";
import { Skills } from "@/modules/Skills";

interface DashboardProps {
  onViewProjects: () => void;
}

export function Dashboard({ onViewProjects }: DashboardProps) {
  const [currentSkillFocus, setCurrentSkillFocus] =
    useState<CurrentFocusType>(fallbackCurrentFocus);

  useEffect(() => {
    fetchCurrentFocus()
      .then(setCurrentSkillFocus)
      .catch(() => {});
  }, []);

  return (
    <div id="dashboard-scroll" className="h-full overflow-y-auto">
      <div className="min-h-full flex justify-center p-4 md:p-8">
        <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-[250px_1fr] gap-8 md:gap-12">
          {/* Sidebar — identity, currently, contact */}
          <aside className="flex flex-col justify-between gap-4 md:sticky md:top-8 md:h-[calc(100vh-4rem)] md:self-start order-1">
            <div className="w-full">
              <Identity />
            </div>
            <div className="w-full">
              <CurrentFocus {...currentSkillFocus} />
            </div>
            <div className="w-full">
              <ContactMe />
            </div>
          </aside>

          {/* Main content — experience, projects, skills, education */}
          <main className="flex flex-col gap-10 order-2">
            <Bio />
            <Journey />
            <Projects onViewProjects={onViewProjects} />
            <Skills {...currentSkillFocus} />
            <Education />
          </main>
        </div>
      </div>
    </div>
  );
}
