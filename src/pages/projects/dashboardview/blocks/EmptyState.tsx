import { Skeleton } from "@/components/ui/skeleton";

export function EmptyState() {
  return (
    <div className="space-y-4">
      <h2 className="text-center text-xl font-semibold text-foreground">
        Projects
      </h2>

      <div className="overflow-hidden rounded-xl border border-border bg-card">
        <div className="divide-y divide-border">
          {Array.from({ length: 3 }).map((_, index) => (
            <div key={index} className="flex gap-4 p-5">
              <div className="flex-1 space-y-3">
                <Skeleton className="h-4 w-40" />

                <div className="space-y-2">
                  <Skeleton className="h-3 w-full" />
                  <Skeleton className="h-3 w-4/5" />
                </div>

                <div className="flex gap-2">
                  <Skeleton className="h-8 w-8 rounded-md" />
                  <Skeleton className="h-8 w-8 rounded-md" />
                </div>
              </div>

              <Skeleton className="h-8 w-8 rounded-md" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
