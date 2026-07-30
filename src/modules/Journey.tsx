import { EXPERIENCE } from "../data/experience";
import { Card, CardTitle } from "@/components/ui/card";

export function Journey() {
  return (
    <Card className="group/card flex flex-col gap-3 p-6 bg-card backdrop-blur-sm border border-white/10 dark:border-white/5 w-full h-fit shadow-sm">
      <CardTitle className="text-xl font-semibold text-muted-foreground text-center transition-colors duration-300 group-hover/card:text-foreground">
        Engineering Journey
      </CardTitle>

      <div className="relative border-none sm:border-l-2 sm:border-border/70 sm:ml-2 pl-0 sm:pl-6 space-y-4 ">
        {EXPERIENCE.map((entry) => {
          return (
            <div key={entry.id} className="relative group p-2 ">
              <div className="relative flex items-center gap-4 mb-2">
                {/* 
                  Timeline Dot:
                  Mobile: Hidden entirely using `hidden`.
                  Desktop (sm+): Restored with `sm:block` using your exact original positions.
                */}
                <div className="hidden sm:block absolute -left-[31px] top-1/2 -translate-y-1/2 h-1.5 w-1.5 rounded-full bg-muted-foreground/40 border border-background transition-all duration-300 group-hover:bg-primary group-hover:scale-125" />

                {/* 
                  Logo Container:
                  Mobile: Sized down to h-10 w-10 with tight padding.
                  Desktop (sm+): Restored to your original h-12 w-12 sizes.
                */}
                {/* <div className="flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-xl border border-border/60 bg-muted/10 p-1.5 sm:p-1 shrink-0 shadow-sm">
                  {entry.icon && Icons[entry.icon as keyof typeof Icons] ? (
                    <img
                      src={Icons[entry.icon as keyof typeof Icons]}
                      alt={entry.org}
                      className="w-full h-full object-contain"
                    />
                  ) : (
                    <Code2 className="w-4 h-4 sm:w-5 sm:h-5 text-muted-foreground/80" />
                  )}
                </div> */}

                {/* 
                  Three-Row Metadata Stack */}
                <div className="flex flex-col min-w-0">
                  <h3 className="text-base sm:text-md font-bold tracking-tight text-primary break-words whitespace-normal">
                    {entry.title}
                  </h3>
                  <p className="text-sm sm:text-base font-semibold text-foreground/90 mt-0.5 break-words whitespace-normal sm:truncate">
                    {entry.org}
                  </p>
                  <span className="text-[10px] sm:text-sm font-mono font-medium text-muted-foreground/80 mt-0.5">
                    {entry.period}
                  </span>
                </div>
              </div>

              {/* Achievement Bullets */}
              <ul className="space-y-1 pl-1.5">
                {entry.bullets.map((bullet, index) => (
                  <li
                    key={index}
                    className="relative pl-4 text-sm leading-relaxed text-muted-foreground/95 transition-colors duration-200 hover:text-foreground hover:drop-shadow-[0_0_6px_rgba(from_var(--primary)_r_g_b_/_0.15)] flex items-start group/bullet"
                  >
                    <span className="absolute left-0 text-primary/70 font-bold select-none group-hover/bullet:text-primary transition-colors duration-200">
                      -
                    </span>
                    <p className="w-full break-words pl-1">{bullet}</p>
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
    </Card>
  );
}
