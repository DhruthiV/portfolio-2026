import { Skeleton } from "@/components/ui/skeleton";

export function EmptyState() {
  return (
    <div className="overflow-hidden border border-border bg-card">
      {/* Header */}
      <div className="space-y-4 p-6">
        <Skeleton className="h-7 w-56" />

        <div className="flex gap-2">
          <Skeleton className="h-6 w-28 rounded-full" />
          <Skeleton className="h-6 w-28 rounded-full" />
          <Skeleton className="h-6 w-24 rounded-full" />
        </div>

        <div className="space-y-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />
          <Skeleton className="h-4 w-2/3" />
        </div>
      </div>

      {/* Sections */}
      {[...Array(3)].map((_, i) => (
        <div key={i} className="border-t border-border px-6 py-5">
          <Skeleton className="mb-4 h-4 w-32" />

          <div className="space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-4/5" />
            <Skeleton className="h-4 w-2/3" />
          </div>
        </div>
      ))}

      {/* Stack */}
      <div className="border-t border-border px-6 py-5">
        <Skeleton className="mb-4 h-4 w-16" />

        <div className="flex flex-wrap gap-2">
          <Skeleton className="h-7 w-20 rounded-full" />
          <Skeleton className="h-7 w-24 rounded-full" />
          <Skeleton className="h-7 w-16 rounded-full" />
          <Skeleton className="h-7 w-28 rounded-full" />
        </div>
      </div>

      {/* Footer */}
      <div className="border-t border-border p-6">
        <div className="flex gap-3">
          <Skeleton className="h-10 w-32 rounded-xl" />
          <Skeleton className="h-10 w-32 rounded-xl" />
          <Skeleton className="h-10 w-36 rounded-xl" />
        </div>
      </div>
    </div>
  );
}
