import { useState } from 'react';
import AIProcessingAnimation from '../components/AIProcessingAnimation';
import ResultTable from '../components/ResultTable';
import SQLCodeBlock from '../components/SQLCodeBlock';
import SchemaViewer from '../components/SchemaViewer';
import LoadingSpinner from '../components/LoadingSpinner';
import { useQueryWorkspace } from '../hooks/useQueryWorkspace';
import { databaseSchema } from '../utils/dummyData';

/** Core query workspace — NL input, SQL generation, results, schema */
export default function QueryWorkspacePage() {
  const [schemaOpen, setSchemaOpen] = useState(true);
  const {
    naturalLanguage,
    setNaturalLanguage,
    generatedSql,
    explanation,
    results,
    isGenerating,
    isExecuting,
    hasGenerated,
    generateSql,
    executeQuery,
    clearWorkspace,
  } = useQueryWorkspace();

  const formatExplanation = (text) => {
    if (!text) return null;
    const parts = text.split(/(\*\*[^*]+\*\*)/g);
    return parts.map((part, i) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return <strong key={i} className="text-white font-medium">{part.slice(2, -2)}</strong>;
      }
      return part;
    });
  };

  return (
    <div className="flex flex-col lg:flex-row gap-4 h-[calc(100vh-7rem)] min-h-[600px]">
      {/* Schema viewer sidebar */}
      <aside
        className={`shrink-0 overflow-y-auto transition-all duration-300 ${
          schemaOpen ? 'w-full lg:w-64' : 'w-0 lg:w-0 overflow-hidden'
        }`}
      >
        <div className="glass-card p-4 h-full lg:sticky lg:top-0">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-semibold text-white">Database schema</h2>
            <button
              type="button"
              onClick={() => setSchemaOpen(!schemaOpen)}
              className="lg:hidden text-xs text-slate-400"
            >
              {schemaOpen ? 'Hide' : 'Show'}
            </button>
          </div>
          <SchemaViewer schema={databaseSchema} />
        </div>
      </aside>

      {/* Main workspace */}
      <div className="flex-1 flex flex-col gap-4 min-w-0 overflow-hidden">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h1 className="text-xl font-bold text-white sm:text-2xl">Query workspace</h1>
            <p className="text-sm text-slate-400">Describe your data question in natural language</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <button type="button" onClick={() => setSchemaOpen(!schemaOpen)} className="btn-secondary text-xs py-2 lg:hidden">
              Schema
            </button>
            <button type="button" onClick={clearWorkspace} className="btn-secondary text-xs py-2">
              Clear workspace
            </button>
          </div>
        </div>

        <div className="grid flex-1 gap-4 lg:grid-cols-2 min-h-0 overflow-auto">
          {/* Left column: input + SQL + explanation */}
          <div className="flex flex-col gap-4 min-h-0">
            <section className="glass-card p-4 flex flex-col">
              <label htmlFor="nl-input" className="text-sm font-medium text-slate-300 mb-2">
                Natural language query
              </label>
              <textarea
                id="nl-input"
                rows={4}
                className="input-field resize-none font-sans"
                placeholder="e.g. Show top 10 customers by revenue in 2024"
                value={naturalLanguage}
                onChange={(e) => setNaturalLanguage(e.target.value)}
              />
              <button
                type="button"
                onClick={generateSql}
                disabled={isGenerating || !naturalLanguage.trim()}
                className="btn-primary mt-3 w-full sm:w-auto disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isGenerating ? (
                  <span className="flex items-center gap-2">
                    <LoadingSpinner size="sm" />
                    Generating…
                  </span>
                ) : (
                  'Generate SQL'
                )}
              </button>
            </section>

            <section className="glass-card p-4 flex-1 flex flex-col min-h-[200px]">
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-sm font-semibold text-white">Generated SQL</h2>
                {hasGenerated && generatedSql && (
                  <button
                    type="button"
                    onClick={() => navigator.clipboard.writeText(generatedSql)}
                    className="text-xs text-accent-blue hover:text-accent-cyan"
                  >
                    Copy SQL
                  </button>
                )}
              </div>
              {isGenerating ? (
                <AIProcessingAnimation />
              ) : (
                <SQLCodeBlock sql={generatedSql} className="flex-1" />
              )}
              {hasGenerated && (
                <button
                  type="button"
                  onClick={executeQuery}
                  disabled={isExecuting || isGenerating}
                  className="btn-primary mt-4 w-full disabled:opacity-50"
                >
                  {isExecuting ? (
                    <span className="flex items-center justify-center gap-2">
                      <LoadingSpinner size="sm" />
                      Executing…
                    </span>
                  ) : (
                    'Execute query'
                  )}
                </button>
              )}
            </section>

            <section className="glass-card p-4">
              <h2 className="text-sm font-semibold text-white mb-2">Query explanation</h2>
              {explanation ? (
                <p className="text-sm text-slate-400 leading-relaxed whitespace-pre-wrap">
                  {formatExplanation(explanation)}
                </p>
              ) : (
                <p className="text-sm text-slate-500">Explanation will appear after SQL is generated.</p>
              )}
            </section>
          </div>

          {/* Right column: results table */}
          <section className="glass-card flex flex-col min-h-[300px] overflow-hidden">
            <div className="flex items-center justify-between border-b border-surface-border px-4 py-3">
              <h2 className="text-sm font-semibold text-white">Query results</h2>
              {results && (
                <span className="text-xs text-slate-500">{results.rows.length} rows</span>
              )}
            </div>
            <div className="flex-1 overflow-auto">
              <ResultTable data={results} loading={isExecuting} />
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
