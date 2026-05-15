import { Link } from 'react-router-dom';
import { landingFeatures } from '../utils/dummyData';

const featureIcons = {
  sparkles: (
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
  ),
  database: (
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4" />
  ),
  shield: (
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
  ),
  chart: (
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
  ),
  layers: (
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
  ),
  users: (
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
  ),
};

/** Marketing landing page with hero, features, and CTAs */
export default function LandingPage() {
  return (
    <div className="relative overflow-hidden">
      {/* Background orbs */}
      <div className="glow-orb -top-40 left-1/2 h-[500px] w-[500px] -translate-x-1/2 bg-accent-blue" />
      <div className="glow-orb top-1/3 right-0 h-72 w-72 bg-accent-purple" />

      {/* Hero section */}
      <section className="relative mx-auto max-w-7xl px-4 pt-20 pb-24 sm:px-6 lg:px-8 lg:pt-32">
        <div className="text-center animate-fade-in">
          <span className="inline-flex items-center gap-2 rounded-full border border-accent-blue/30 bg-accent-blue/10 px-4 py-1.5 text-sm font-medium text-accent-blue mb-6">
            <span className="h-2 w-2 rounded-full bg-accent-blue animate-pulse" />
            AI-powered Text-to-SQL
          </span>
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl lg:text-7xl">
            Turn questions into{' '}
            <span className="text-gradient">production SQL</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-400 sm:text-xl">
            QueryLens helps data teams write accurate, explainable SQL from natural language —
            with schema awareness, safety checks, and instant execution.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/signup" className="btn-primary w-full sm:w-auto text-base px-8 py-3">
              Start free trial
            </Link>
            <Link to="/workspace" className="btn-secondary w-full sm:w-auto text-base px-8 py-3">
              View demo workspace
            </Link>
          </div>
        </div>

        {/* Hero preview card */}
        <div className="mt-16 mx-auto max-w-4xl animate-slide-up opacity-0 [animation-fill-mode:forwards]">
          <div className="glass-card overflow-hidden shadow-2xl shadow-accent-purple/10">
            <div className="flex items-center gap-2 border-b border-surface-border bg-surface-raised px-4 py-3">
              <span className="h-3 w-3 rounded-full bg-red-500/80" />
              <span className="h-3 w-3 rounded-full bg-amber-500/80" />
              <span className="h-3 w-3 rounded-full bg-emerald-500/80" />
              <span className="ml-2 text-xs text-slate-500 font-mono">querylens — workspace</span>
            </div>
            <div className="grid md:grid-cols-2 gap-0">
              <div className="p-6 border-b md:border-b-0 md:border-r border-surface-border">
                <p className="text-xs uppercase text-slate-500 mb-2">Natural language</p>
                <p className="text-sm text-slate-300">
                  Show me the top 10 customers by revenue in 2024
                </p>
              </div>
              <div className="p-6 bg-slate-950/50">
                <p className="text-xs uppercase text-slate-500 mb-2">Generated SQL</p>
                <pre className="font-mono text-xs text-accent-cyan leading-relaxed">
{`SELECT c.name, SUM(o.total)
FROM customers c
JOIN orders o ON ...
ORDER BY revenue DESC
LIMIT 10;`}
                </pre>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features showcase */}
      <section id="features" className="relative py-24 border-t border-surface-border/50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="section-heading">Built for modern data teams</h2>
            <p className="mt-4 text-slate-400 max-w-2xl mx-auto">
              Everything you need to query faster, collaborate safely, and ship insights with confidence.
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {landingFeatures.map((feature, i) => (
              <article
                key={feature.title}
                className="glass-card p-6 transition-all duration-300 hover:border-accent-purple/40 hover:-translate-y-1 opacity-0 animate-slide-up"
                style={{ animationDelay: `${i * 80}ms`, animationFillMode: 'forwards' }}
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-gradient-to-br from-accent-blue/20 to-accent-purple/20 text-accent-blue">
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    {featureIcons[feature.icon]}
                  </svg>
                </span>
                <h3 className="mt-4 text-lg font-semibold text-white">{feature.title}</h3>
                <p className="mt-2 text-sm text-slate-400 leading-relaxed">{feature.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="py-24 bg-surface-raised/50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="section-heading text-center mb-16">How it works</h2>
          <div className="grid gap-8 md:grid-cols-3">
            {[
              { step: '01', title: 'Connect your database', desc: 'Securely link PostgreSQL, MySQL, or cloud warehouses.' },
              { step: '02', title: 'Ask in plain English', desc: 'Describe the data you need — no SQL required.' },
              { step: '03', title: 'Review, run, share', desc: 'Validate explanations, execute safely, save to history.' },
            ].map((item) => (
              <div key={item.step} className="text-center">
                <span className="text-4xl font-bold text-gradient">{item.step}</span>
                <h3 className="mt-4 text-xl font-semibold text-white">{item.title}</h3>
                <p className="mt-2 text-slate-400">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <div className="rounded-2xl border border-accent-purple/30 bg-gradient-to-br from-accent-blue/10 via-surface-card to-accent-purple/10 p-12">
            <h2 className="text-3xl font-bold text-white sm:text-4xl">
              Ready to query smarter?
            </h2>
            <p className="mt-4 text-slate-400">
              Join teams shipping insights 10x faster with AI-assisted SQL.
            </p>
            <Link to="/signup" className="btn-primary mt-8 inline-flex text-base px-8 py-3">
              Get started for free
            </Link>
          </div>
        </div>
      </section>

      <footer className="border-t border-surface-border py-8 text-center text-sm text-slate-500">
        © {new Date().getFullYear()} QueryLens. AI Text-to-SQL for developers.
      </footer>
    </div>
  );
}
