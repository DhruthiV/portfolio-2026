import { BookOpen, Compass, Hammer, Users } from "lucide-react";
import { BentoCard } from "./BentoCard";
import type { CurrentFocus } from "../../lib/notionCurrentFocus";

const focusConfig = {
  Building: {
    label: "Building",
    icon: Hammer,
  },
  Learning: {
    label: "Learning",
    icon: BookOpen,
  },
  Exploring: {
    label: "Exploring",
    icon: Compass,
  },
  Collaboration: {
    label: "Collaboration",
    icon: Users,
  },
} satisfies Record<
  CurrentFocus["type"],
  {
    label: string;
    icon: React.ComponentType<{ size?: number; className?: string }>;
  }
>;

export function CurrentFocusCard(focus: CurrentFocus) {
  const config = focusConfig[focus.type] ?? focusConfig.Learning;
  const Icon = config.icon;

  return (
    <BentoCard className="gap-2">
      <div className="flex items-center gap-2">
        <h2
          className="text-sm font-semibold text-foreground"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          Current Focus
        </h2>

        <Icon size={12} className="text-primary" />

        <p
          className="text-sm font-medium text-primary"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          {config.label}
        </p>
      </div>

      <h3
        className="text-xs font-semibold text-foreground"
        style={{ fontFamily: "var(--font-heading)" }}
      >
        {focus.title}
      </h3>

      <p className="text-xs text-muted-foreground leading-relaxed">
        {focus.description}
      </p>
    </BentoCard>
  );
}
