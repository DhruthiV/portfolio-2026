import { SKILL_GROUPS } from "../../data/skills";
import { BentoCard } from "./BentoCard";

const BADGE_COLOR = "var(--chart-4)";

export function SkillsCard() {
  return (
    <BentoCard className="gap-4">
      <h2
        className="text-sm font-semibold text-foreground"
        style={{ fontFamily: "var(--font-heading)" }}
      >
        Skills
      </h2>

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
                    className="rounded-full border px-2 py-1 text-xs font-medium transition-colors"
                    style={{
                      color: BADGE_COLOR,
                      borderColor: BADGE_COLOR,
                      backgroundColor: `oklch(from ${BADGE_COLOR} l c h / 0.08)`,
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
