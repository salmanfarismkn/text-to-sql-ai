import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';

/** User menu in dashboard header */
export default function UserDropdown() {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const handleClick = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 rounded-lg border border-surface-border bg-surface-raised px-2 py-1.5 transition-colors hover:border-accent-blue/40"
      >
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-accent-blue to-accent-purple text-sm font-bold text-white">
          SF
        </span>
        <span className="hidden text-sm font-medium text-slate-200 sm:block">Salman</span>
        <svg className="h-4 w-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {open && (
        <div className="absolute right-0 z-50 mt-2 w-48 rounded-lg border border-surface-border bg-surface-card py-1 shadow-xl">
          <Link
            to="/dashboard"
            className="block px-4 py-2 text-sm text-slate-300 hover:bg-surface-raised hover:text-white"
            onClick={() => setOpen(false)}
          >
            Dashboard
          </Link>
          <Link
            to="/workspace"
            className="block px-4 py-2 text-sm text-slate-300 hover:bg-surface-raised hover:text-white"
            onClick={() => setOpen(false)}
          >
            Workspace
          </Link>
          <hr className="my-1 border-surface-border" />
          <Link
            to="/login"
            className="block px-4 py-2 text-sm text-red-400 hover:bg-surface-raised"
            onClick={() => setOpen(false)}
          >
            Sign out
          </Link>
        </div>
      )}
    </div>
  );
}
