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
    <Card className="flex flex-col gap-4 bg-card/30 backdrop-blur-md border border-white/10 dark:border-white/5 w-full h-fit shadow-sm p-(--card-spacing) p-4">
      <div className="flex items-center justify-between border-b border-border/40 pb-2">
        <CardTitle className="text-xs font-bold tracking-widest text-foreground">
          About Me
        </CardTitle>
      </div>

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
