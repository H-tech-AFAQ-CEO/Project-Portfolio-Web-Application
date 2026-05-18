'use client';

export function SkeletonCard() {
  return (
    <div className="space-y-4 rounded-lg border border-border bg-card p-6">
      <div className="h-4 w-1/3 rounded bg-muted animate-pulse-subtle" />
      <div className="h-8 w-1/2 rounded bg-muted animate-pulse-subtle" />
      <div className="h-3 w-2/3 rounded bg-muted animate-pulse-subtle" />
    </div>
  );
}

export function SkeletonTable() {
  return (
    <div className="space-y-3">
      {Array.from({ length: 5 }).map((_, i) => (
        <div key={i} className="h-12 rounded border border-border bg-card animate-pulse-subtle" />
      ))}
    </div>
  );
}

export function SkeletonGrid({ cols = 3 }: { cols?: number }) {
  return (
    <div className={`grid gap-4 md:grid-cols-${cols}`}>
      {Array.from({ length: cols }).map((_, i) => (
        <SkeletonCard key={i} />
      ))}
    </div>
  );
}
