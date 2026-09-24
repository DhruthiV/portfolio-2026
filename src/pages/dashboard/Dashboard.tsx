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
        <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-8 lg:gap-12">
          <aside
            className="
            order-1
            flex
            flex-col
            gap-4
            self-start
            lg:sticky
            lg:top-8
            lg:h-[calc(100vh-4rem)]
            lg:justify-between
          "
          >
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

          <main className="order-2 flex flex-col gap-16 lg:gap-28">
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
