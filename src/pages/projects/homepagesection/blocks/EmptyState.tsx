import { Skeleton } from "@/components/ui/skeleton";

export function EmptyState() {
  return (
    <div className="space-y-4">
      <h2 className="text-cent er text-xl font-semibold text-foreground">
        Projects
      </h2>

      <div className="grid gap-4 md:grid-cols-2">
        {Array.from({ length: 2 }).map((_, index) => (
          <div
            key={index}
            className="overflow-hidden border border-border bg-card"
          >
            <Skeleton className="aspect-[16/9] w-full rounded-none" />

            <div className="space-y-4 p-5">
              <div className="space-y-2">
                <Skeleton className="h-5 w-36" />

                <div className="flex gap-2">
                  <Skeleton className="h-6 w-20 rounded-full" />
                  <Skeleton className="h-6 w-20 rounded-full" />
                </div>
              </div>

              <div className="space-y-2">
                <Skeleton className="h-3 w-full" />
                <Skeleton className="h-3 w-5/6" />
                <Skeleton className="h-3 w-2/3" />
              </div>

              <div className="flex justify-between">
                <div className="flex gap-2">
                  <Skeleton className="h-8 w-8 rounded-md" />
                  <Skeleton className="h-8 w-8 rounded-md" />
                </div>

                <Skeleton className="h-8 w-8 rounded-md" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
