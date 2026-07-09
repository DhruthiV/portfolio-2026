import { AnimatePresence, motion } from "motion/react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";

import { AuroraBackground } from "./components/AuroraBackground";
import { BentoDashboard } from "./components/BentoDashboard";
import { ProjectsPage } from "./components/ProjectsPage";

const PAGE_TRANSITION = {
  duration: 0.2,
  ease: [0.25, 0.46, 0.45, 0.94] as const,
};

export default function App() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="relative h-screen bg-background">
      <AuroraBackground />

      <main className="relative z-10 h-full overflow-y-auto">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={location.pathname}
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={PAGE_TRANSITION}
          >
            <Routes location={location}>
              <Route
                path="/"
                element={
                  <BentoDashboard
                    onViewProjects={() => navigate("/projects")}
                  />
                }
              />
              <Route
                path="/projects"
                element={<ProjectsPage onBack={() => navigate("/")} />}
              />
            </Routes>
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}
