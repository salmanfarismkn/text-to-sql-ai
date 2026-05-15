import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { cn } from '../utils/cn';

/** Public marketing navbar — landing and auth pages */
export default function Navbar({ transparent = false }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { isDark, toggleTheme } = useTheme();

  const navLinkClass = ({ isActive }) =>
    cn(
      'text-sm font-medium transition-colors',
      isActive ? 'text-accent-blue' : 'text-slate-300 hover:text-white'
    );

  return (
    <header
      className={cn(
        'sticky top-0 z-50 w-full transition-all duration-300',
        transparent
          ? 'border-transparent bg-transparent'
          : 'border-b border-surface-border/60 bg-surface/90 backdrop-blur-lg'
      )}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        {/* Brand */}
        <Link to="/" className="flex items-center gap-2 group">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-accent-blue to-accent-purple text-sm font-bold text-white shadow-lg shadow-accent-purple/30">
            QL
          </span>
          <span className="text-lg font-bold text-white">
            Query<span className="text-gradient">Lens</span>
          </span>
        </Link>

        {/* Desktop links */}
        <div className="hidden items-center gap-8 md:flex">
          <a href="#features" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">
            Features
          </a>
          <a href="#how-it-works" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">
            How it works
          </a>
          <NavLink to="/login" className={navLinkClass}>
            Log in
          </NavLink>
          <Link to="/signup" className="btn-primary text-sm py-2 px-4">
            Get started
          </Link>
          <button
            type="button"
            onClick={toggleTheme}
            className="rounded-lg p-2 text-slate-400 hover:bg-surface-raised hover:text-white transition-colors"
            aria-label="Toggle theme"
          >
            {isDark ? (
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            ) : (
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile menu button */}
        <button
          type="button"
          className="md:hidden rounded-lg p-2 text-slate-300 hover:bg-surface-raised"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            {mobileOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </nav>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="border-t border-surface-border bg-surface-card px-4 py-4 md:hidden animate-fade-in">
          <div className="flex flex-col gap-3">
            <a href="#features" className="py-2 text-slate-300" onClick={() => setMobileOpen(false)}>
              Features
            </a>
            <Link to="/login" className="py-2 text-slate-300" onClick={() => setMobileOpen(false)}>
              Log in
            </Link>
            <Link to="/signup" className="btn-primary text-center" onClick={() => setMobileOpen(false)}>
              Get started
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
