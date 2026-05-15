import { Link } from 'react-router-dom';
import { cn } from '../utils/cn';

/** Compact card for recent/saved queries on dashboard */
export default function QueryCard({ query, variant = 'recent' }) {
  const statusColors = {
    success: 'bg-emerald-500/20 text-emerald-400',
    warning: 'bg-amber-500/20 text-amber-400',
    error: 'bg-red-500/20 text-red-400',
  };

  return (
    <article className="glass-card group p-4 transition-all duration-200 hover:border-accent-purple/40 hover:shadow-lg hover:shadow-accent-purple/5">
      <div className="flex items-start justify-between gap-2">
        <h3 className="font-semibold text-white group-hover:text-accent-blue transition-colors line-clamp-1">
          {query.title}
        </h3>
        {query.status && (
          <span
            className={cn(
              'shrink-0 rounded-full px-2 py-0.5 text-xs font-medium capitalize',
              statusColors[query.status] || statusColors.success
            )}
          >
            {query.status}
          </span>
        )}
      </div>
      <p className="mt-2 text-sm text-slate-400 line-clamp-2">{query.naturalLanguage}</p>
      {variant === 'recent' && (
        <div className="mt-3 flex items-center gap-3 text-xs text-slate-500">
          <span>{query.executedAt}</span>
          {query.rowCount != null && <span>{query.rowCount} rows</span>}
        </div>
      )}
      {variant === 'saved' && query.tags && (
        <div className="mt-3 flex flex-wrap gap-1.5">
          {query.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-md bg-accent-purple/10 px-2 py-0.5 text-xs text-accent-purple"
            >
              {tag}
            </span>
          ))}
        </div>
      )}
      <Link
        to="/workspace"
        className="mt-3 inline-flex text-xs font-medium text-accent-blue hover:text-accent-cyan transition-colors"
      >
        Open in workspace →
      </Link>
    </article>
  );
}
