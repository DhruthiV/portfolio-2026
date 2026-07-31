import {
  type ProfileContent,
  fallbackProfileContent,
  fetchProfileContent,
} from "@/lib/notionProfile";
import { Bio } from "@/modules/Bio";
import { ContactMe } from "@/modules/ContactMe";
import { CurrentWork } from "@/modules/CurrentWork";
import { Education } from "@/modules/Education";
import { Identity } from "@/modules/Identity";
import { Journey } from "@/modules/Journey";
import { Skills } from "@/modules/Skills";
import { useState, useEffect } from "react";
import { ProjectsView } from "../projects/dashboardview/ProjectsView";

interface DashboardProps {
  onViewProjects: () => void;
}

export function Dashboard({ onViewProjects }: DashboardProps) {
  const [profile, setProfile] = useState<ProfileContent>(
    fallbackProfileContent,
  );

  useEffect(() => {
    fetchProfileContent()
      .then(setProfile)
      .catch((err) => {
        console.error(err);
      });
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
              <CurrentWork
                type={profile.currentWork.type}
                title={profile.currentWork.title}
                description={profile.currentWork.description}
              />
            </div>
            <div className="w-full">
              <ContactMe />
            </div>
          </aside>

          {/* Main content — experience, projects, skills, education */}
          <main className="flex flex-col gap-10 order-2">
            <Bio
              headline={profile.bio.headline}
              summary={profile.bio.summary}
            />
            <Journey />
            <ProjectsView onViewProjects={onViewProjects} />
            <Skills skills={profile.skills} />
            <Education />
          </main>
        </div>
      </div>
    </div>
  );
}
