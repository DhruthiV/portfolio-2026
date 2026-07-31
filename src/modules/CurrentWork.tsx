import { BookOpen, Compass, Hammer, Users } from "lucide-react";
import type { ProfileContent } from "@/lib/notionProfile";

type CurrentWorkType = ProfileContent["currentWork"]["type"];

const focusConfig = {
  Building: { label: "Building", icon: Hammer },
  Learning: { label: "Learning", icon: BookOpen },
  Exploring: { label: "Exploring", icon: Compass },
  Collaborating: { label: "Collaborating", icon: Users },
  Contributing: { label: "Contributing", icon: Users },
} satisfies Record<
  CurrentWorkType,
  {
    label: string;
    icon: React.ComponentType<{ size?: number; className?: string }>;
  }
>;

type CurrentWorkProps = ProfileContent["currentWork"];

export function CurrentWork({ type, title, description }: CurrentWorkProps) {
  const { icon: Icon, label: typeLabel } = focusConfig[type];

  return (
    <div className="flex flex-col gap-2 w-full border-t border-border/40 pt-4">
      <div className="flex items-start justify-between gap-2">
        <h3 className="text-sm font-bold text-foreground tracking-tight">
          {title}
        </h3>

        <div className="flex items-center gap-1 shrink-0 bg-primary/5 border border-primary/10 px-2 py-0.5 rounded-md">
          <Icon size={12} className="text-primary" />

          <span
            className="text-[10px] font-semibold text-primary tracking-wide uppercase"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            {typeLabel}
          </span>
        </div>
      </div>

      <p className="text-sm text-muted-foreground leading-relaxed">
        {description}
      </p>
    </div>
  );
}
