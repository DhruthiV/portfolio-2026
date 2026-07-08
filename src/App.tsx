import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";

import { AuroraBackground } from "./components/AuroraBackground";
import { BentoDashboard } from "./components/BentoDashboard";
import { ProjectsPage } from "./components/ProjectsPage";

type View = "dashboard" | "projects";

const PAGE_TRANSITION = {
  duration: 0.2,
  ease: [0.25, 0.46, 0.45, 0.94] as const,
};

export default function App() {
  const [view, setView] = useState<View>("dashboard");

  const scrollToSection = (id: string) => {
    const dashboard = document.getElementById("dashboard-scroll");

    if (id === "home") {
      dashboard?.scrollTo({
        top: 0,
        behavior: "smooth",
      });
      return;
    }

    document.getElementById(id)?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  const handleNavigate = (id: string) => {
    if (id === "projects") {
      setView("projects");
      return;
    }

    if (view === "dashboard") {
      scrollToSection(id);
      return;
    }

    setView("dashboard");

    requestAnimationFrame(() => {
      scrollToSection(id);
    });
  };

  return (
    <div className="relative h-screen bg-background">
      <AuroraBackground />

      <main className="relative z-10 h-full overflow-y-auto pb-24 lg:pb-0 lg:pl-24">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={view}
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={PAGE_TRANSITION}
          >
            {view === "dashboard" ? (
              <BentoDashboard
                onViewProjects={() => handleNavigate("projects")}
              />
            ) : (
              <ProjectsPage onBack={() => setView("dashboard")} />
            )}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}
