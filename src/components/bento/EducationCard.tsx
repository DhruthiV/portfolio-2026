import { GraduationCap } from "lucide-react";
import { EDUCATION } from "../../data/education";
import { BentoCard } from "./BentoCard";

export function EducationCard() {
  return (
    <BentoCard className="gap-4">
      <div className="flex items-center gap-2">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
          <GraduationCap size={15} className="text-primary" />
        </div>

        <h2
          className="text-sm font-semibold text-foreground"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          Education
        </h2>
      </div>

      <div className="space-y-4">
        {EDUCATION.map((edu, index) => (
          <div
            key={edu.id}
            className={
              index !== EDUCATION.length - 1
                ? "border-b border-border pb-4"
                : ""
            }
          >
            <h3 className="text-sm font-semibold leading-snug text-foreground">
              {edu.degree}
            </h3>

            <p className="mt-1 text-xs text-muted-foreground">{edu.school}</p>

            <p className="text-xs text-muted-foreground">{edu.period}</p>
          </div>
        ))}
      </div>
    </BentoCard>
  );
}
