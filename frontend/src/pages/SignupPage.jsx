import { Link } from 'react-router-dom';

/** Signup page — registration UI placeholder */
export default function SignupPage() {
  return (
    <div className="glass-card p-8 animate-fade-in">
      <h1 className="text-2xl font-bold text-white">Create your account</h1>
      <p className="mt-2 text-sm text-slate-400">Start building SQL with AI in minutes</p>

      <form className="mt-8 space-y-5" onSubmit={(e) => e.preventDefault()}>
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-slate-300 mb-1.5">
            Full name
          </label>
          <input id="name" type="text" className="input-field" placeholder="Jane Doe" />
        </div>
        <div>
          <label htmlFor="signup-email" className="block text-sm font-medium text-slate-300 mb-1.5">
            Work email
          </label>
          <input id="signup-email" type="email" className="input-field" placeholder="you@company.com" />
        </div>
        <div>
          <label htmlFor="signup-password" className="block text-sm font-medium text-slate-300 mb-1.5">
            Password
          </label>
          <input id="signup-password" type="password" className="input-field" placeholder="Min. 8 characters" />
        </div>
        <label className="flex items-start gap-2 text-sm text-slate-400">
          <input type="checkbox" className="mt-1 rounded border-surface-border" />
          I agree to the Terms of Service and Privacy Policy
        </label>
        <Link to="/dashboard" className="btn-primary w-full text-center block">
          Create account
        </Link>
      </form>

      <p className="mt-6 text-center text-sm text-slate-400">
        Already have an account?{' '}
        <Link to="/login" className="text-accent-blue hover:text-white font-medium">
          Sign in
        </Link>
      </p>
    </div>
  );
}
