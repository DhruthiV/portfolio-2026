import { Outlet } from "react-router-dom";

import { ContactMe } from "@/modules/ContactMe";
import { CurrentWork } from "@/modules/CurrentWork";
import { Identity } from "@/modules/Identity";

import { usePortfolio } from "@/hooks/usePortfolio";

export function PortfolioLayout() {
  const { profile, profileLoading } = usePortfolio();

  return (
    <div id="dashboard-scroll" className="h-full overflow-y-auto">
      {/* <div className="min-h-full flex justify-center p-4 md:p-8"> */}
      <div className="min-h-full flex justify-center px-4 pt-4 md:px-8 md:pt-8 pb-0">
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
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
}
