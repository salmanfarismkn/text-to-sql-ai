import { NavLink } from 'react-router-dom';
import { cn } from '../utils/cn';
import { databaseConnection } from '../utils/dummyData';

const navItems = [
  { to: '/dashboard', label: 'Dashboard', icon: 'home' },
  { to: '/workspace', label: 'Query Workspace', icon: 'terminal' },
  { to: '/history', label: 'Query History', icon: 'history' },
];

const icons = {
  home: (
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
  ),
  terminal: (
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
  ),
  history: (
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
  ),
};

/** Dashboard sidebar navigation with DB connection status */
export default function Sidebar({ mobileOpen, onClose }) {
  return (
    <>
      {mobileOpen && (
        <button
          type="button"
          className="fixed inset-0 z-40 bg-black/60 lg:hidden"
          onClick={onClose}
          aria-label="Close sidebar"
        />
      )}
      <aside
        className={cn(
          'fixed inset-y-0 left-0 z-50 flex w-64 flex-col border-r border-surface-border bg-surface-raised transition-transform duration-300 lg:static lg:translate-x-0',
          mobileOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        <div className="flex h-16 items-center gap-2 border-b border-surface-border px-4">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-accent-blue to-accent-purple text-xs font-bold">
            QL
          </span>
          <span className="font-bold text-white">QueryLens</span>
        </div>

        <nav className="flex-1 space-y-1 p-3">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              onClick={onClose}
              className={({ isActive }) =>
                cn(
                  'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200',
                  isActive
                    ? 'bg-gradient-to-r from-accent-blue/20 to-accent-purple/20 text-white border border-accent-blue/30'
                    : 'text-slate-400 hover:bg-surface-card hover:text-white'
                )
              }
            >
              <svg className="h-5 w-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {icons[item.icon]}
              </svg>
              {item.label}
            </NavLink>
          ))}
        </nav>

        {/* Database connection status */}
        <div className="border-t border-surface-border p-4">
          <p className="text-xs font-medium uppercase tracking-wider text-slate-500">
            Database
          </p>
          <div className="mt-2 rounded-lg border border-surface-border bg-surface-card p-3">
            <div className="flex items-center gap-2">
              <span
                className={cn(
                  'h-2 w-2 rounded-full',
                  databaseConnection.status === 'connected'
                    ? 'bg-emerald-400 animate-pulse'
                    : 'bg-red-400'
                )}
              />
              <span className="text-sm font-medium text-white truncate">
                {databaseConnection.name}
              </span>
            </div>
            <p className="mt-1 text-xs text-slate-500">
              {databaseConnection.latency} · {databaseConnection.tables} tables
            </p>
          </div>
        </div>
      </aside>
    </>
  );
}
