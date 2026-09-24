import { useState } from "react";
import { EXPERIENCE } from "../data/experience";

export function Journey() {
  // Oldest → newest
  const sortedExperience = [...EXPERIENCE].sort((a, b) => {
    const getStartDate = (period: string) => {
      const match = period.match(/([A-Za-z]{3})\s+(\d{4})/);
      if (!match) return 0;
      return new Date(`${match[1]} 1, ${match[2]}`).getTime();
    };

    return getStartDate(b.period) - getStartDate(a.period);
  });

  // Present role is selected by default
  const currentExperience =
    sortedExperience.find((entry) =>
      entry.period.toLowerCase().includes("present"),
    ) ?? sortedExperience[sortedExperience.length - 1];

  const [selectedId, setSelectedId] = useState(currentExperience?.id);

  return (
    <div className="w-full max-w-2xl mx-auto px-4 py-6">
      <h2 className="mb-8 text-2xl font-bold text-foreground text-center font-heading">
        Journey
      </h2>

      {/* Unified Timeline Container */}
      <div className="relative flex flex-col pl-2">
        {/* Continuous Vertical Tracking Line */}
        <div className="absolute bottom-4 left-[15px] top-4 w-px bg-border/80" />

        {sortedExperience.map((entry) => {
          const isActive = entry.id === selectedId;

          return (
            <div
              key={entry.id}
              className="relative flex flex-col pb-8 last:pb-2"
            >
              {/* Node Button Row */}
              <div className="relative flex items-start gap-4">
                {/* Interactive Dot Node */}
                <button
                  type="button"
                  onClick={() => setSelectedId(entry.id)}
                  aria-label={`Select ${entry.title}`}
                  className="relative z-10 mt-1.5 outline-none shrink-0"
                >
                  <span
                    className={`
                      block h-3.5 w-3.5 rounded-full border-2 transition-all duration-300
                      ${
                        isActive
                          ? "scale-110 border-primary bg-primary"
                          : "border-muted-foreground/40 bg-background"
                      }
                    `}
                  />
                </button>

                {/* Metadata Interactive Column */}
                <button
                  type="button"
                  onClick={() => setSelectedId(entry.id)}
                  className="flex flex-col items-start text-left outline-none group w-full"
                >
                  <span
                    className={`text-md font-semibold leading-tight transition-colors duration-200 ${
                      isActive
                        ? "text-primary"
                        : "text-foreground group-hover:text-primary/80"
                    }`}
                  >
                    {entry.title}
                  </span>

                  <span className="text-sm font-medium text-muted-foreground/80 mt-0.5">
                    {entry.org}
                  </span>

                  <span
                    className={`mt-1 font-mono text-sm transition-colors duration-200 ${
                      isActive ? "text-primary/80" : "text-foreground/60"
                    }`}
                  >
                    {entry.period}
                  </span>
                </button>
              </div>

              {/* 
                SMOOTH EXPANDING CONTAINER 
                Uses Tailwind grid rows transition trick to smoothly animate from height 0 -> auto
              */}
              <div
                className={`
                  grid transition-all duration-300 ease-in-out pl-7 pr-2
                  ${isActive ? "grid-rows-[1fr] opacity-100 mt-4" : "grid-rows-[0fr] opacity-0 mt-0"}
                `}
              >
                <div className="overflow-hidden">
                  <ul className="space-y-2.5 border-l-2 border-primary/20 pl-4 py-1">
                    {entry.bullets.map((bullet, index) => (
                      <li
                        key={index}
                        className="text-md leading-relaxed text-foreground/90 transition-colors duration-200"
                      >
                        {bullet}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
