import { Link } from 'react-router-dom';
import AnalyticsCard from '../components/AnalyticsCard';
import QueryCard from '../components/QueryCard';
import { analyticsOverview, recentQueries, savedQueries, databaseConnection } from '../utils/dummyData';
import { cn } from '../utils/cn';

/** Main dashboard — analytics, recent queries, DB status */
export default function DashboardPage() {
  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      <div>
        <h1 className="text-2xl font-bold text-white sm:text-3xl">Dashboard</h1>
        <p className="mt-1 text-slate-400">Overview of your queries and database activity</p>
      </div>

      {/* Analytics overview cards */}
      <section aria-label="Analytics overview">
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {analyticsOverview.map((metric) => (
            <AnalyticsCard key={metric.id} {...metric} />
          ))}
        </div>
      </section>

      {/* Database connection banner */}
      <section className="glass-card flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5">
        <div className="flex items-center gap-4">
          <span
            className={cn(
              'flex h-12 w-12 items-center justify-center rounded-xl',
              databaseConnection.status === 'connected'
                ? 'bg-emerald-500/20 text-emerald-400'
                : 'bg-red-500/20 text-red-400'
            )}
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4" />
            </svg>
          </span>
          <div>
            <p className="font-semibold text-white">{databaseConnection.name}</p>
            <p className="text-sm text-slate-400">
              {databaseConnection.host} · Last sync {databaseConnection.lastSync}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3 text-sm">
          <span className="flex items-center gap-2 text-emerald-400">
            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            Connected · {databaseConnection.latency}
          </span>
          <Link to="/workspace" className="btn-secondary text-xs py-2">
            Open workspace
          </Link>
        </div>
      </section>

      <div className="grid gap-8 lg:grid-cols-2">
        {/* Recent queries */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-white">Recent queries</h2>
            <Link to="/history" className="text-sm text-accent-blue hover:text-accent-cyan">
              View all
            </Link>
          </div>
          <div className="space-y-3">
            {recentQueries.map((q) => (
              <QueryCard key={q.id} query={q} variant="recent" />
            ))}
          </div>
        </section>

        {/* Saved queries */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-white">Saved queries</h2>
            <Link to="/workspace" className="text-sm text-accent-blue hover:text-accent-cyan">
              New query
            </Link>
          </div>
          <div className="space-y-3">
            {savedQueries.length > 0 ? (
              savedQueries.map((q) => (
                <QueryCard key={q.id} query={q} variant="saved" />
              ))
            ) : (
              <p className="text-sm text-slate-500 py-8 text-center border border-dashed border-surface-border rounded-xl">
                No saved queries yet
              </p>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
