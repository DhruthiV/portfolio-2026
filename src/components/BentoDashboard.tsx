import { AboutCard } from "./bento/AboutCard";
import { ContactCard } from "./bento/ContactCard";
import { EducationCard } from "./bento/EducationCard";
import { JourneyCard } from "./bento/JourneyCard";
import { ProjectsCard } from "./bento/ProjectsCard";
import { SkillsCard } from "./bento/SkillsCard";
import { useEffect } from "react";
import { fetchNotionProjects } from "../lib/notionProjects";
interface BentoDashboardProps {
  onViewProjects: () => void;
}

export function BentoDashboard({ onViewProjects }: BentoDashboardProps) {
  useEffect(() => {
    fetchNotionProjects().catch(() => {});
  }, []);
  return (
    <div id="dashboard-scroll" className="h-full overflow-y-auto">
      <div className="min-h-full flex items-center justify-center p-4 md:p-8">
        <div className="w-full max-w-5xl">
          <div
            className="
              grid
              grid-cols-1
              md:grid-cols-8
              gap-4
              auto-rows-auto
              md:auto-rows-[160px]
              lg:auto-rows-[110px]
            "
          >
            {/* About */}
            <div className="order-1 md:order-none md:col-span-4 md:row-span-2">
              <AboutCard />
            </div>

            {/* Projects */}
            <div className="order-4 md:order-none md:col-span-2 md:row-span-2">
              <ProjectsCard onViewProjects={onViewProjects} />
            </div>

            {/* Contact */}
            <div className="order-5 md:order-none md:col-span-2 md:row-span-2">
              <ContactCard />
            </div>

            {/* Journey */}
            <div className="order-2 md:order-none md:col-span-3 md:row-span-3">
              <JourneyCard />
            </div>

            {/* Skills */}
            <div className="order-3 md:order-none md:col-span-3 md:row-span-3">
              <SkillsCard />
            </div>

            {/* Education */}
            <div className="order-6 md:order-none md:col-span-2 md:row-span-3">
              <EducationCard />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
