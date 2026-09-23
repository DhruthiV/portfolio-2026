import { Bio } from "@/modules/Bio";
import { ContactMe } from "@/modules/ContactMe";
import { CurrentWork } from "@/modules/CurrentWork";
import { Education } from "@/modules/Education";
import { Identity } from "@/modules/Identity";
import { Journey } from "@/modules/Journey";
import { Skills } from "@/modules/Skills";

import { usePortfolio } from "@/hooks/usePortfolio";
import { Projects } from "../projects/homepagesection/Projects";
import { Certifications } from "../certification/Certifications";

interface DashboardProps {
  onViewProjects: () => void;
}

export function Dashboard({ onViewProjects }: DashboardProps) {
  const { profile, profileLoading, projects, projectsLoading, error } =
    usePortfolio();

  return (
    <div id="dashboard-scroll" className="h-full overflow-y-auto">
      <div className="min-h-full flex justify-center p-4 md:p-8">
        <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-[250px_1fr] gap-8 md:gap-12">
          <aside className="flex flex-col justify-between gap-4 md:sticky md:top-8 md:h-[calc(100vh-4rem)] md:self-start order-1">
            <div className="w-full">
              <Identity />
            </div>
            <div className="w-full">
              <CurrentWork
                loading={profileLoading}
                type={profile.currentWork.type}
                title={profile.currentWork.title}
                description={profile.currentWork.description}
              />
            </div>
            <div className="w-full">
              <ContactMe />
            </div>
          </aside>

          <main className="flex flex-col gap-24 order-2 md:gap-28">
            <Bio
              loading={profileLoading}
              headline={profile.bio.headline}
              blocks={profile.bio.blocks}
            />

            <Projects
              projects={projects}
              loading={projectsLoading}
              error={error}
              onViewProjects={onViewProjects}
            />

            <Certifications />

            <Skills />

            <Journey />

            <Education />
          </main>
        </div>
      </div>
    </div>
  );
}
