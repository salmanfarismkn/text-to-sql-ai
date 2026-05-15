import LoadingSpinner from './LoadingSpinner';

/** AI processing placeholder shown during SQL generation */
export default function AIProcessingAnimation({ message = 'Generating SQL from your question…' }) {
  return (
    <div className="flex flex-col items-center justify-center rounded-xl border border-accent-blue/20 bg-gradient-to-b from-accent-blue/5 to-accent-purple/5 p-8 ai-shimmer">
      <div className="relative mb-4">
        <div className="absolute inset-0 rounded-full bg-accent-purple/30 blur-xl animate-pulse-glow" />
        <LoadingSpinner size="lg" className="relative border-t-accent-purple" />
      </div>
      <p className="text-sm font-medium text-slate-300">{message}</p>
      <div className="mt-4 flex gap-1">
        <span className="h-1.5 w-1.5 rounded-full bg-accent-blue animate-pulse" />
        <span className="h-1.5 w-1.5 rounded-full bg-accent-blue animate-pulse delay-150" />
        <span className="h-1.5 w-1.5 rounded-full bg-accent-blue animate-pulse delay-300" />
      </div>
    </div>
  );
}
