import { Card, CardTitle } from "@/components/ui/card";
import { SKILL_GROUPS } from "../data/skills";
import type { CurrentFocusType } from "../lib/notionCurrentFocus";

export function Skills(currentSkillFocus: CurrentFocusType) {
  const isActiveFocus = (skillName: string) => {
    return currentSkillFocus.skills?.includes(skillName) ?? false;
  };

  return (
    <Card className="group/card flex flex-col gap-6 p-6 bg-card/80 ...">
      <CardTitle className="text-xl font-semibold text-muted-foreground text-center transition-colors duration-300 group-hover/card:text-foreground">
        Technical Expertise
      </CardTitle>

      <div className="flex flex-col w-full my-1">
        <div className="flex flex-col gap-3 w-full">
          {SKILL_GROUPS.map((group) => (
            <div
              key={group.category}
              className="grid grid-cols-[80px_1fr] gap-4 items-center"
            >
              {/* Category */}
              <div className="text-xs font-extrabold tracking-widest text-primary uppercase select-none transition-all duration-300 cursor-default hover:tracking-[0.15em] hover:drop-shadow-[0_0_8px_rgba(from_var(--primary)_r_g_b_/_0.4)] font-heading">
                {group.category}
              </div>

              {/* Skills */}
              <div className="flex flex-wrap items-center">
                {group.items.map((item, idx) => {
                  const active = isActiveFocus(item.name);

                  return (
                    <div
                      key={item.name}
                      className="inline-flex items-center space-y-1"
                    >
                      <span
                        className={`relative text-sm tracking-wide transition-all duration-300 cursor-default select-none py-0.5 px-2 ${
                          active
                            ? "text-foreground hover:text-primary font-bold tracking-tight"
                            : "text-muted-foreground font-medium hover:text-foreground hover:scale-105 hover:drop-shadow-[0_0_8px_rgba(from_var(--foreground)_r_g_b_/_0.3)]"
                        }`}
                      >
                        {item.name}
                      </span>

                      {idx < group.items.length - 1 && (
                        <span className="text-muted-foreground/25 font-bold select-none pointer-events-none text-[10px] mx-1">
                          |
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}
