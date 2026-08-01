import { EDUCATION } from "@/data/education";
import { Card, CardTitle, CardDescription } from "@/components/ui/card";

export function Education() {
  return (
    <Card className="group/card flex flex-col gap-6 p-6 bg-card/80 ...">
      <CardTitle className="text-xl font-semibold text-muted-foreground text-center transition-colors duration-300 group-hover/card:text-foreground">
        Education
      </CardTitle>

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
            <div className="grid grid-cols-[1fr_auto] gap-6 items-start">
              <div>
                <h3 className="text-base font-semibold text-foreground font-heading">
                  {edu.degree}
                </h3>

                <CardDescription className="mt-1 text-sm text-muted-foreground hover:text-primary  transition-colors duration-300">
                  {edu.desc}
                </CardDescription>

                <p className="mt-2 text-sm text-primary/75 font-semibold font-heading">
                  {edu.school}
                </p>
              </div>

              <p className="text-sm text-muted-foreground whitespace-nowrap ">
                {edu.period}
              </p>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
