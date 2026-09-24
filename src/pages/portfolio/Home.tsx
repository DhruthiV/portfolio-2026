import { usePortfolio } from "@/hooks/usePortfolio";
import { Bio } from "@/modules/Bio";
import { Skills } from "@/modules/Skills";
import { Projects } from "../projects/homepagesection/Projects";
import { useNavigate } from "react-router-dom";

export function Home() {
  const { profile, profileLoading, projects, projectsLoading, error } =
    usePortfolio();
  const navigate = useNavigate();
  return (
    <>
      <Bio
        loading={profileLoading}
        headline={profile.bio.headline}
        blocks={profile.bio.blocks}
      />

      <Projects projects={projects} loading={projectsLoading} error={error} />

      <Skills />

      <button
        type="button"
        onClick={() => navigate("/about")}
        className="
          w-full
          h-16
          mt-16
          rounded-t-3xl
          bg-primary
          text-primary-foreground
          flex
          items-center
          justify-center
           text-md
          font-regular
          font-heading
          transition-transform
          duration-200
          hover:-translate-y-1
          cursor-pointer
        "
      >
        More About Me
      </button>
    </>
  );
}
