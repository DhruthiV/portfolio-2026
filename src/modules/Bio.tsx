import { SITE_CONFIG } from "../config";
import { CardTitle, CardDescription, Card } from "@/components/ui/card";

interface BioProps {
  headline?: string;
  summary?: string[];
}

export function Bio({ headline, summary }: BioProps) {
  const bioHeadline = headline ?? SITE_CONFIG.headline;

  const bioSummary = summary ?? SITE_CONFIG.summary;

  return (
    <Card className="group/card flex flex-col gap-6 p-6 bg-card/50 ...">
      <CardTitle className="text-xl font-semibold text-muted-foreground text-center transition-colors duration-300 group-hover/card:text-foreground">
        About Me
      </CardTitle>

      <div className="flex flex-col gap-3 ">
        <h3 className="text-base font-bold leading-snug text-foreground/95 tracking-tight hover:text-primary text-center">
          {bioHeadline}
        </h3>

        <div className="space-y-3">
          <CardDescription className="text-sm md:text-sm leading-relaxed text-muted-foreground/90 font-medium">
            <div className="space-y-3">
              {bioSummary.map((paragraph: string, index: number) => (
                <CardDescription
                  key={index}
                  className="text-sm md:text-sm leading-relaxed text-muted-foreground/90 font-medium"
                >
                  {paragraph}
                </CardDescription>
              ))}
            </div>
          </CardDescription>
        </div>
      </div>
    </Card>
  );
}
