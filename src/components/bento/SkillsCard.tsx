import { Zap } from "lucide-react";
import { SKILL_GROUPS } from "../../data/skills";
import { BentoCard } from "./BentoCard";
import type { CurrentFocus } from "../../lib/notionCurrentFocus";

const BADGE_COLOR = "var(--chart-4)";

export function SkillsCard(currentSkillFocus: CurrentFocus) {
  return (
    <BentoCard className="gap-4">
      <h2
        className="text-sm font-semibold text-foreground"
        style={{ fontFamily: "var(--font-heading)" }}
      >
        Skills
      </h2>

      <div className="flex flex-wrap gap-1">
        {currentSkillFocus.skills && (
          <div className="flex items-center gap-1 text-[11px] text-muted-foreground mr-1">
            <Zap size={18} className="text-primary" />
          </div>
        )}

        {currentSkillFocus?.skills?.map((skill) => (
          <span
            key={skill}
            className="
              rounded-full
              border
              px-2
              py-0.5
              text-[11px]
              font-medium
              transition-all
              duration-200
              hover:-translate-y-0.5
              hover:shadow-md
            "
            style={{
              color: "var(--chart-4)",
              borderColor: "var(--chart-4)",
              backgroundColor: "oklch(from var(--chart-4) l c h / 0.08)",
              boxShadow: "0 1px 2px rgb(0 0 0 / 0.02)",
            }}
            title={`Currently using ${skill}`}
          >
            {skill}
          </span>
        ))}
      </div>

      <div className="flex-1 overflow-y-auto pr-5">
        <div className="space-y-5">
          {SKILL_GROUPS.map((group) => (
            <section key={group.category}>
              <div className="mb-2 flex items-center gap-2">
                <span
                  className="h-1.5 w-1.5 rounded-full"
                  style={{ backgroundColor: BADGE_COLOR }}
                />

                <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                  {group.category}
                </span>
              </div>

              <div className="flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <span
                    key={item.name}
                    className="
                        rounded-full
                        border
                        px-2
                        py-1
                        text-xs
                        font-medium
                        transition-all  
                        duration-200
                        hover:-translate-y-0.5
                        hover:shadow-md
                      "
                    style={{
                      color: BADGE_COLOR,
                      borderColor: BADGE_COLOR,
                      backgroundColor: `oklch(from ${BADGE_COLOR} l c h / 0.08)`,
                      boxShadow: "0 1px 2px rgb(0 0 0 / 0.02)",
                    }}
                  >
                    {item.name}
                  </span>
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    </BentoCard>
  );
}
