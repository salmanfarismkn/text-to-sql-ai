import { Link, Outlet } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';

/** Centered auth layout for login and signup */
export default function AuthLayout() {
  const { toggleTheme, isDark } = useTheme();

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center bg-surface px-4 py-12">
      <div className="glow-orb -top-32 left-1/4 h-96 w-96 bg-accent-blue" />
      <div className="glow-orb bottom-0 right-1/4 h-80 w-80 bg-accent-purple" />

      <div className="absolute top-4 right-4 flex items-center gap-3">
        <button
          type="button"
          onClick={toggleTheme}
          className="rounded-lg p-2 text-slate-400 hover:bg-surface-raised hover:text-white"
          aria-label="Toggle theme"
        >
          {isDark ? '☀️' : '🌙'}
        </button>
        <Link to="/" className="text-sm text-slate-400 hover:text-white transition-colors">
          ← Back to home
        </Link>
      </div>

      <Link to="/" className="mb-8 flex items-center gap-2">
        <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-accent-blue to-accent-purple font-bold text-white">
          QL
        </span>
        <span className="text-xl font-bold text-white">
          Query<span className="text-gradient">Lens</span>
        </span>
      </Link>

      <div className="w-full max-w-md">
        <Outlet />
      </div>
    </div>
  );
}
