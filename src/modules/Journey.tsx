import { useRef, useState } from "react";
import { EXPERIENCE } from "../data/experience";
import { Card, CardTitle } from "@/components/ui/card";

export function Journey() {
  // Oldest → newest
  const sortedExperience = [...EXPERIENCE].sort((a, b) => {
    const getStartDate = (period: string) => {
      const match = period.match(/([A-Za-z]{3})\s+(\d{4})/);

      if (!match) return 0;

      return new Date(`${match[1]} 1, ${match[2]}`).getTime();
    };

    return getStartDate(a.period) - getStartDate(b.period);
  });

  // Present role is selected by default
  const currentExperience =
    sortedExperience.find((entry) =>
      entry.period.toLowerCase().includes("present"),
    ) ?? sortedExperience[sortedExperience.length - 1];

  const [selectedId, setSelectedId] = useState(currentExperience?.id);
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const hoverTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Start hover preview after a short delay
  const handleMouseEnter = (id: string) => {
    if (hoverTimeout.current) {
      clearTimeout(hoverTimeout.current);
    }

    hoverTimeout.current = setTimeout(() => {
      setHoveredId(id);
    }, 200);
  };

  // Immediately return to selected experience
  const handleMouseLeave = () => {
    if (hoverTimeout.current) {
      clearTimeout(hoverTimeout.current);
      hoverTimeout.current = null;
    }

    setHoveredId(null);
  };

  // Hover temporarily controls the displayed content.
  // When there is no hover, the selected experience is shown.
  const displayedId = hoveredId ?? selectedId;

  const displayedExperience = sortedExperience.find(
    (entry) => entry.id === displayedId,
  );

  return (
    <Card className="group/card flex h-[500px] w-full flex-col gap-6 bg-card p-6 shadow-sm backdrop-blur-sm sm:h-[520px]">
      {/* Heading */}
      <CardTitle className="text-center text-xl font-semibold text-muted-foreground transition-colors duration-300 group-hover/card:text-foreground">
        Engineering Journey
      </CardTitle>

      {/* Timeline */}
      <div
        className="
          w-full overflow-x-auto
          [scrollbar-width:none]
          [-ms-overflow-style:none]
          [&::-webkit-scrollbar]:hidden
        "
      >
        <div className="relative w-full px-3 py-2">
          {/* Roles */}
          <div className="grid grid-cols-3">
            {sortedExperience.map((entry) => {
              const isSelected = entry.id === selectedId;
              const isHovered = entry.id === hoveredId;

              return (
                <button
                  key={entry.id}
                  type="button"
                  onClick={() => setSelectedId(entry.id)}
                  onMouseEnter={() => handleMouseEnter(entry.id)}
                  onMouseLeave={handleMouseLeave}
                  className="px-2 text-center outline-none"
                >
                  <span
                    className={`
                      mx-auto block max-w-[180px]
                      text-sm font-semibold leading-tight font-heading
                      transition-colors duration-200
                      ${
                        isHovered || isSelected
                          ? "text-primary"
                          : "text-foreground"
                      }
                    `}
                  >
                    {entry.title}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Dots + line */}
          <div className="relative mt-4 grid grid-cols-3">
            {/* Timeline line */}
            <div
              className="
                pointer-events-none
                absolute
                left-0 right-0
                top-1/2
                h-px
                -translate-y-1/2
                bg-border
              "
            />

            {sortedExperience.map((entry) => {
              const isSelected = entry.id === selectedId;
              const isHovered = entry.id === hoveredId;

              return (
                <div
                  key={entry.id}
                  className="relative z-10 flex justify-center"
                >
                  <button
                    type="button"
                    onClick={() => setSelectedId(entry.id)}
                    onMouseEnter={() => handleMouseEnter(entry.id)}
                    onMouseLeave={handleMouseLeave}
                    aria-label={`Select ${entry.title}`}
                    className="outline-none"
                  >
                    <span
                      className={`
                        block h-3.5 w-3.5 rounded-full border-2
                        transition-all duration-200
                        ${
                          isHovered || isSelected
                            ? "scale-110 border-primary bg-primary"
                            : "border-muted-foreground/50 bg-background"
                        }
                      `}
                    />
                  </button>
                </div>
              );
            })}
          </div>

          {/* Periods */}
          <div className="grid grid-cols-3">
            {sortedExperience.map((entry) => {
              const isSelected = entry.id === selectedId;
              const isHovered = entry.id === hoveredId;

              return (
                <div key={entry.id} className="px-2 text-center">
                  <span
                    className={`
                      mt-3 block text-xs font-mono
                      transition-colors duration-200
                      ${
                        isHovered || isSelected
                          ? "text-primary"
                          : "text-muted-foreground"
                      }
                    `}
                  >
                    {entry.period}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Selected / Hovered Experience */}
      <div className="h-[200px] shrink-0 overflow-y-auto border-t border-border/60 pt-5">
        {displayedExperience && (
          <>
            <div className="mb-4">
              <p className="text-sm font-semibold text-primary">
                {displayedExperience.org}
              </p>

              <p className="mt-1 text-sm text-muted-foreground">
                {displayedExperience.title}
              </p>
            </div>

            <ul className="space-y-2">
              {displayedExperience.bullets.map((bullet, index) => (
                <li
                  key={index}
                  className="relative pl-5 text-sm leading-relaxed text-muted-foreground/95"
                >
                  <span className="absolute left-0 text-primary/70">-</span>

                  {bullet}
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
    </Card>
  );
}
