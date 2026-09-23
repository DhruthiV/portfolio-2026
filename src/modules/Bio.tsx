/* eslint-disable @typescript-eslint/no-explicit-any */
import { Skeleton } from "@/components/ui/skeleton";
import { NotionRenderer } from "@/components/blocks/NotionRenderer";

interface BioProps {
  loading: boolean;
  headline: string;
  blocks: any[];
}

export function Bio({ loading, headline, blocks }: BioProps) {
  if (loading) {
    return <BioSkeleton />;
  }

  return (
    <section className="flex min-h-[calc(100vh-4rem)] flex-col gap-6">
      <h2 className="text-center text-xl font-semibold text-muted-foreground">
        About Me
      </h2>

      <div className="flex flex-col gap-3">
        <h3 className="text-center text-base font-bold leading-snug tracking-tight text-foreground/95">
          {headline}
        </h3>

        <NotionRenderer blocks={blocks} />
      </div>
    </section>
  );
}

function BioSkeleton() {
  return (
    <section className="flex min-h-[calc(100vh-4rem)] flex-col gap-6">
      <h2 className="text-center text-xl font-semibold text-muted-foreground">
        About Me
      </h2>

      <div className="flex flex-col gap-10">
        {/* Headline */}
        <div className="flex justify-center">
          <Skeleton className="h-5 w-3/4 max-w-[340px]" />
        </div>

        {/* Body */}
        <div className="space-y-8">
          <div className="space-y-4">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-4/5" />
          </div>

          <div className="space-y-4">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-11/12" />
            <Skeleton className="h-4 w-3/4" />
          </div>
        </div>
      </div>
    </section>
  );
}
