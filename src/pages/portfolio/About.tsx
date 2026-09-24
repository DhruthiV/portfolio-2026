import { Education } from "@/modules/Education";
import { Journey } from "@/modules/Journey";
import { Certifications } from "../certification/Certifications";
import { useNavigate } from "react-router-dom";
import { Events } from "@/modules/Events";

export function About() {
  const navigate = useNavigate();
  return (
    <>
      <Certifications />

      <Events />

      <Journey />

      <Education />

      <button
        type="button"
        onClick={() => navigate("/")}
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
        Back to Main Page
      </button>
    </>
  );
}
