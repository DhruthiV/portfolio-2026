import { BookOpen, Compass, Hammer, Users } from "lucide-react";
import type { CurrentFocusType } from "@/lib/notionCurrentFocus";

const focusConfig = {
  Building: { label: "Building", icon: Hammer },
  Learning: { label: "Learning", icon: BookOpen },
  Exploring: { label: "Exploring", icon: Compass },
  Collaborating: { label: "Collaborating", icon: Users },
  Contributing: { label: "Contributing", icon: Users },
} satisfies Record<
  CurrentFocusType["type"],
  {
    label: string;
    icon: React.ComponentType<{ size?: number; className?: string }>;
  }
>;

export function CurrentFocus(focus: CurrentFocusType) {
  const config = focusConfig[focus.type] ?? focusConfig.Learning;
  const Icon = config.icon;

  return (
    <div className="flex flex-col gap-2 w-full border-t border-border/40 pt-4">
      <div className="flex items-start justify-between gap-2">
        <h3 className="text-sm font-bold text-foreground tracking-tight">
          {focus.title}
        </h3>

        <div className="flex items-center gap-1 shrink-0 bg-primary/5 border border-primary/10 px-2 py-0.5 rounded-md">
          <Icon size={12} className="text-primary" />
          <span
            className="text-[10px] font-semibold text-primary tracking-wide uppercase"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            {config.label}
          </span>
        </div>
      </div>

      {/* Description Body */}
      <p className="text-sm text-muted-foreground leading-relaxed">
        {focus.description}
      </p>
    </div>
  );
}
