import EmptyState from './EmptyState';
import { Skeleton } from './Skeleton';

/** Renders database query results in a responsive table */
export default function ResultTable({ data, loading = false }) {
  if (loading) {
    return (
      <div className="space-y-2 p-4">
        <Skeleton className="h-8 w-full" />
        <Skeleton className="h-8 w-full" />
        <Skeleton className="h-8 w-full" />
        <Skeleton className="h-8 w-3/4" />
      </div>
    );
  }

  if (!data?.columns?.length) {
    return (
      <EmptyState
        title="No results yet"
        description="Generate SQL and execute the query to see results here."
        icon={
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
          </svg>
        }
      />
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[400px] text-left text-sm">
        <thead>
          <tr className="border-b border-surface-border bg-surface-raised/80">
            {data.columns.map((col) => (
              <th
                key={col}
                className="px-4 py-3 font-semibold text-slate-300 whitespace-nowrap"
              >
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.rows.map((row, i) => (
            <tr
              key={i}
              className="border-b border-surface-border/50 transition-colors hover:bg-accent-blue/5"
            >
              {data.columns.map((col) => (
                <td key={col} className="px-4 py-2.5 text-slate-200 whitespace-nowrap">
                  {row[col]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <p className="px-4 py-2 text-xs text-slate-500">
        {data.rows.length} row{data.rows.length !== 1 ? 's' : ''} returned
      </p>
    </div>
  );
}
