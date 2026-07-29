import { GraduationCap } from "lucide-react";
import { EDUCATION } from "@/data/education";
import { Card, CardTitle, CardDescription } from "@/components/ui/card";
import { Icons } from "@/assets";

export function Education() {
  return (
    <Card className="flex flex-col gap-4 p-5 bg-card/30 backdrop-blur-sm border-white/10 dark:border-white/5 shadow-sm items-center">
      {/* Header Container */}
      <div className="flex items-center gap-2 ">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 shrink-0">
          <GraduationCap size={15} className="text-primary" />
        </div>
        <CardTitle className="text-sm font-semibold text-foreground">
          Education
        </CardTitle>
      </div>

      {/* Timeline List */}
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
            <div className="flex items-start gap-3">
              <img
                src={Icons[edu.icon as keyof typeof Icons]}
                alt={edu.school}
                className="w-8 h-8 object-contain shrink-0 mt-0.5"
              />
              <div className="flex flex-col gap-0.5">
                <h3 className="text-sm font-semibold leading-snug text-foreground">
                  {edu.degree}
                </h3>
                <CardDescription className="text-sm leading-snug text-muted-foreground">
                  {edu.desc}
                </CardDescription>
                <p className="mt-1 text-xs font-semibold text-muted-foreground/80">
                  {edu.school}
                </p>
                <p className="text-xs text-muted-foreground/60">{edu.period}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
