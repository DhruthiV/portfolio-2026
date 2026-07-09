import { useState } from "react";
import { EXPERIENCE } from "../../data/experience";
import { BentoCard } from "./BentoCard";

export function JourneyCard() {
  const [openId, setOpenId] = useState<string | null>(
    EXPERIENCE[0]?.id ?? null,
  );

  return (
    <BentoCard className="gap-4">
      <h2
        className="text-sm font-semibold text-foreground"
        style={{ fontFamily: "var(--font-heading)" }}
      >
        Journey
      </h2>

      <div className="flex-1 overflow-y-auto pr-5">
        <ol className="relative ml-4 border-l border-border">
          {EXPERIENCE.map((entry, i) => {
            const isOpen = openId === entry.id;

            return (
              <li
                key={entry.id}
                className={i === EXPERIENCE.length - 1 ? "" : "pb-8"}
              >
                <span
                  className={`absolute -left-[6px] mt-2 h-2 w-2 rounded-full ring-4 ring-card ${isOpen ? "bg-chart-3" : "bg-chart-1"}`}
                />

                <button
                  type="button"
                  onClick={() => setOpenId(isOpen ? null : entry.id)}
                  className="w-full pl-7 text-left cursor-pointer"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <h3 className="text-sm font-semibold leading-snug text-foreground">
                        {entry.title}
                      </h3>
                    </div>
                    <div className="flex gap-1.5 items-center">
                      {entry.icon && (
                        <img
                          src={`../../assets/${entry.icon}.png`}
                          alt={entry.org}
                          style={{ opacity: 0.75 }}
                          className="w-8 h-8 object-contain shrink-0"
                        />
                      )}
                      <div className="flex-col">
                        <p className="text-xs text-muted-foreground">
                          {entry.org}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {entry.period}
                        </p>
                      </div>
                    </div>
                  </div>

                  {isOpen && (
                    <ul className="mt-4 space-y-2">
                      {entry.bullets.map((bullet, index) => (
                        <li
                          key={index}
                          className="relative pl-4 text-sm leading-6 text-muted-foreground"
                        >
                          <span className="absolute left-0 top-[11px] h-1 w-1 rounded-full bg-muted-foreground/60" />
                          {bullet}
                        </li>
                      ))}
                    </ul>
                  )}
                </button>
              </li>
            );
          })}
        </ol>
      </div>
    </BentoCard>
  );
}
