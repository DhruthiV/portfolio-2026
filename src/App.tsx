import { AnimatePresence, motion } from "motion/react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";

import { AllProjects } from "./pages/projects/allprojects/AllProjects";
import { CaseStudyPage } from "./pages/projects/casestudy/CaseStudy";

import { About } from "./pages/portfolio/About";
import { AuroraBackground } from "./pages/portfolio/AuroraBackground";
import { PortfolioLayout } from "./pages/portfolio/PortfolioLayout";
import { Home } from "./pages/portfolio/Home";

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
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={PAGE_TRANSITION}
          >
            <Routes location={location}>
              <Route element={<PortfolioLayout />}>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
              </Route>

              <Route
                path="/projects"
                element={<AllProjects onBack={() => navigate("/")} />}
              />

              <Route
                path="/projects/case-study/:id"
                element={<CaseStudyPage />}
              />
            </Routes>
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}
