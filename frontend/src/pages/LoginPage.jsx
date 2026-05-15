import { Link } from 'react-router-dom';

/** Login page — auth UI placeholder */
export default function LoginPage() {
  return (
    <div className="glass-card p-8 animate-fade-in">
      <h1 className="text-2xl font-bold text-white">Welcome back</h1>
      <p className="mt-2 text-sm text-slate-400">Sign in to your QueryLens account</p>

      <form className="mt-8 space-y-5" onSubmit={(e) => e.preventDefault()}>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-slate-300 mb-1.5">
            Email
          </label>
          <input id="email" type="email" className="input-field" placeholder="you@company.com" />
        </div>
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-slate-300 mb-1.5">
            Password
          </label>
          <input id="password" type="password" className="input-field" placeholder="••••••••" />
        </div>
        <div className="flex items-center justify-between text-sm">
          <label className="flex items-center gap-2 text-slate-400">
            <input type="checkbox" className="rounded border-surface-border" />
            Remember me
          </label>
          <a href="#forgot" className="text-accent-blue hover:text-accent-cyan transition-colors">
            Forgot password?
          </a>
        </div>
        <Link to="/dashboard" className="btn-primary w-full text-center block">
          Sign in
        </Link>
      </form>

      <p className="mt-6 text-center text-sm text-slate-400">
        Don&apos;t have an account?{' '}
        <Link to="/signup" className="text-accent-blue hover:text-white font-medium">
          Sign up
        </Link>
      </p>
    </div>
  );
}
