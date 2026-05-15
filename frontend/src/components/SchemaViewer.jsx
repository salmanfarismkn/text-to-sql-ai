import { useState } from 'react';
import { cn } from '../utils/cn';

/** Collapsible database schema sidebar for workspace */
export default function SchemaViewer({ schema }) {
  const [expanded, setExpanded] = useState({});

  const toggle = (name) => {
    setExpanded((prev) => ({ ...prev, [name]: !prev[name] }));
  };

  return (
    <div className="space-y-2">
      <p className="text-xs font-medium uppercase tracking-wider text-slate-500 px-1">
        Schema
      </p>
      {schema.map((table) => (
        <div
          key={table.name}
          className="rounded-lg border border-surface-border bg-surface-raised overflow-hidden"
        >
          <button
            type="button"
            onClick={() => toggle(table.name)}
            className="flex w-full items-center justify-between px-3 py-2 text-left text-sm font-medium text-slate-200 hover:bg-surface-card transition-colors"
          >
            <span className="font-mono text-accent-cyan">{table.name}</span>
            <svg
              className={cn('h-4 w-4 text-slate-500 transition-transform', expanded[table.name] && 'rotate-180')}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          {expanded[table.name] && (
            <ul className="border-t border-surface-border px-3 py-2 space-y-1">
              {table.columns.map((col) => (
                <li key={col.name} className="flex items-center justify-between text-xs font-mono">
                  <span className="text-slate-300">
                    {col.pk && <span className="text-amber-400 mr-1">PK</span>}
                    {col.name}
                  </span>
                  <span className="text-slate-500">{col.type}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      ))}
    </div>
  );
}
