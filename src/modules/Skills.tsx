import { Card } from "@/components/ui/card";
import { SKILL_GROUPS } from "../data/skills";
import type { CurrentFocusType } from "../lib/notionCurrentFocus";

export function Skills(currentSkillFocus: CurrentFocusType) {
  const isActiveFocus = (skillName: string) => {
    return currentSkillFocus.skills?.includes(skillName) ?? false;
  };

  return (
    <Card className="flex flex-col gap-6 p-6  bg-card/30 backdrop-blur-sm border border-white/10 dark:border-white/5 w-full h-fit shadow-sm">
      {/* Centered Section Header */}
      <div className="flex items-center justify-center border-b border-border/40 pb-3 w-full">
        <h2 className="text-sm font-semibold  text-foreground text-center">
          Technical Expertise
        </h2>
      </div>

      <div className="flex flex-col w-full items-center my-1">
        <div className="flex flex-col gap-2 w-fit items-start">
          {SKILL_GROUPS.map((group) => {
            return (
              <div
                key={group.category}
                className="flex flex-wrap items-center gap-x-3 gap-y-2 text-sm py-0.5"
              >
                <span className="text-[10px] font-extrabold tracking-widest text-primary uppercase select-none shrink-0 transition-all duration-300 cursor-default hover:tracking-[0.15em] hover:drop-shadow-[0_0_8px_rgba(from_var(--primary)_r_g_b_/_0.4)] order-first mr-1">
                  {group.category} {">>"}
                </span>

                {/* Skills Stream */}
                {group.items.map((item, idx) => {
                  const active = isActiveFocus(item.name);
                  return (
                    <div
                      key={item.name}
                      className="inline-flex items-center gap-1"
                    >
                      {/* Typographic Tag */}
                      <span
                        className={`relative text-xs tracking-wide transition-all duration-300 cursor-default select-none py-0.5 ${
                          active
                            ? "text-primary font-bold tracking-tight bg-primary/5 px-2.5 py-0.5 rounded-md border border-primary/20 shadow-[0_0_12px_rgba(from_var(--primary)_r_g_b_/_0.15)]"
                            : "text-muted-foreground/75 font-medium hover:text-foreground hover:scale-105 hover:drop-shadow-[0_0_8px_rgba(from_var(--foreground)_r_g_b_/_0.3)]"
                        }`}
                      >
                        {item.name}
                        {active && (
                          <span className="text-[9px] font-mono uppercase tracking-wider text-primary/70 font-semibold ml-1.5 hidden sm:inline-block">
                            (Active)
                          </span>
                        )}
                      </span>

                      {idx < group.items.length - 1 && (
                        <span className="text-muted-foreground/25 font-bold select-none pointer-events-none text-[10px] tracking-tighter">
                          {">>"}
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>
    </Card>
  );
}
