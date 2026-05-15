import { useState } from 'react';
import { cn } from '../utils/cn';

/** Syntax-styled SQL display with copy-to-clipboard */
export default function SQLCodeBlock({ sql, className, compact = false }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    if (!sql) return;
    await navigator.clipboard.writeText(sql);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!sql) {
    return (
      <div
        className={cn(
          'rounded-lg border border-dashed border-surface-border bg-surface-raised/50 p-4 text-sm text-slate-500',
          className
        )}
      >
        Generated SQL will appear here…
      </div>
    );
  }

  return (
    <div className={cn('relative group', className)}>
      <pre
        className={cn(
          'overflow-x-auto rounded-lg border border-surface-border bg-slate-950/80 font-mono text-sm text-slate-200',
          compact ? 'p-3 max-h-32' : 'p-4 max-h-64'
        )}
      >
        <code>{sql}</code>
      </pre>
      <button
        type="button"
        onClick={handleCopy}
        className="absolute right-2 top-2 rounded-md border border-surface-border bg-surface-card px-2.5 py-1 text-xs font-medium text-slate-300 opacity-0 transition-all hover:border-accent-blue/50 hover:text-white group-hover:opacity-100"
      >
        {copied ? 'Copied!' : 'Copy'}
      </button>
    </div>
  );
}
