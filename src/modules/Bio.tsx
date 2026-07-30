import { SITE_CONFIG } from "../config";
import { CardTitle, CardDescription, Card } from "@/components/ui/card";

interface BioProps {
  notionBio?: {
    headline?: string;
    paragraphs?: string[];
  };
}

export function Bio({ notionBio }: BioProps) {
  const bioHeadline =
    notionBio?.headline ||
    "Building scalable full-stack applications & engineering intuitive digital ecosystems.";

  const bioParagraphs = notionBio?.paragraphs || [SITE_CONFIG.summary];

  return (
    <Card className="group/card flex flex-col gap-6 p-6 bg-card/50 ...">
      <CardTitle className="text-xl font-semibold text-muted-foreground text-center transition-colors duration-300 group-hover/card:text-foreground">
        About Me
      </CardTitle>

      <div className="flex flex-col gap-3">
        <h3 className="text-sm font-bold leading-snug text-foreground/95 tracking-tight">
          {bioHeadline}
        </h3>

        <div className="space-y-3">
          {bioParagraphs.map((paragraph, index) => (
            <CardDescription
              key={index}
              className="text-xs md:text-sm leading-relaxed text-muted-foreground/90 font-medium font-sans"
            >
              {paragraph}
            </CardDescription>
          ))}
        </div>
      </div>
    </Card>
  );
}
