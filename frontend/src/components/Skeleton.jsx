import { cn } from '../utils/cn';

/** Loading skeleton placeholder */
export function Skeleton({ className }) {
  return (
    <div
      className={cn(
        'animate-pulse rounded-lg bg-surface-border/40',
        className
      )}
    />
  );
}

/** Card-shaped skeleton for dashboard grids */
export function CardSkeleton() {
  return (
    <div className="glass-card p-5 space-y-3">
      <Skeleton className="h-4 w-1/3" />
      <Skeleton className="h-8 w-1/2" />
      <Skeleton className="h-3 w-2/3" />
    </div>
  );
}
