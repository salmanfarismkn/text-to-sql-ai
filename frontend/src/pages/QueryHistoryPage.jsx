import { useState } from 'react';
import { Link } from 'react-router-dom';
import SQLCodeBlock from '../components/SQLCodeBlock';
import EmptyState from '../components/EmptyState';
import { queryHistory } from '../utils/dummyData';
import { cn } from '../utils/cn';

/** Query history list with expandable SQL details */
export default function QueryHistoryPage() {
  const [expandedId, setExpandedId] = useState(null);
  const [filter, setFilter] = useState('all');

  const filtered = queryHistory.filter((q) => {
    if (filter === 'all') return true;
    return q.status === filter;
  });

  const formatDate = (iso) =>
    new Date(iso).toLocaleString(undefined, {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white sm:text-3xl">Query history</h1>
        <p className="mt-1 text-slate-400">Browse and revisit past natural language queries</p>
      </div>

      <div className="flex flex-wrap gap-2">
        {['all', 'success', 'error'].map((f) => (
          <button
            key={f}
            type="button"
            onClick={() => setFilter(f)}
            className={cn(
              'rounded-lg px-4 py-2 text-sm font-medium capitalize transition-colors',
              filter === f
                ? 'bg-accent-blue/20 text-accent-blue border border-accent-blue/40'
                : 'bg-surface-raised text-slate-400 border border-surface-border hover:text-white'
            )}
          >
            {f}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <EmptyState
          title="No queries found"
          description="Try a different filter or run a query in the workspace."
          action={
            <Link to="/workspace" className="btn-primary">
              Go to workspace
            </Link>
          }
        />
      ) : (
        <div className="space-y-3">
          {filtered.map((item) => (
            <article key={item.id} className="glass-card overflow-hidden transition-all hover:border-accent-blue/30">
              <button
                type="button"
                className="w-full text-left p-4"
                onClick={() => setExpandedId(expandedId === item.id ? null : item.id)}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="flex items-center gap-3 min-w-0">
                    <span
                      className={cn(
                        'shrink-0 h-2 w-2 rounded-full',
                        item.status === 'success' ? 'bg-emerald-400' : 'bg-red-400'
                      )}
                    />
                    <div className="min-w-0">
                      <h3 className="font-semibold text-white truncate">{item.title}</h3>
                      <p className="text-sm text-slate-400 truncate">{item.naturalLanguage}</p>
                    </div>
                  </div>
                  <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 shrink-0">
                    <span>{formatDate(item.executedAt)}</span>
                    <span>{item.duration}</span>
                    <span>{item.rowCount} rows</span>
                    <span className="hidden sm:inline">{item.database}</span>
                  </div>
                </div>
              </button>
              {expandedId === item.id && (
                <div className="border-t border-surface-border p-4 bg-surface-raised/50 space-y-3">
                  {item.error && (
                    <p className="text-sm text-red-400 font-mono">{item.error}</p>
                  )}
                  <SQLCodeBlock sql={item.sql} compact />
                  <Link to="/workspace" className="text-sm text-accent-blue hover:text-accent-cyan">
                    Open in workspace →
                  </Link>
                </div>
              )}
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
