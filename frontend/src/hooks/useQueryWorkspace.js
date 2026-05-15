import { useCallback, useState } from 'react';
import {
  defaultGeneratedSql,
  queryExplanation,
  sampleQueryResult,
} from '../utils/dummyData';

/** Simulates AI query generation and execution for the workspace UI */
export function useQueryWorkspace() {
  const [naturalLanguage, setNaturalLanguage] = useState(
    'Show me the top 10 customers by total order revenue in 2024'
  );
  const [generatedSql, setGeneratedSql] = useState(defaultGeneratedSql);
  const [explanation, setExplanation] = useState(queryExplanation);
  const [results, setResults] = useState(sampleQueryResult);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isExecuting, setIsExecuting] = useState(false);
  const [hasGenerated, setHasGenerated] = useState(true);

  const generateSql = useCallback(async () => {
    if (!naturalLanguage.trim()) return;
    setIsGenerating(true);
    setHasGenerated(false);
    await new Promise((r) => setTimeout(r, 1800));
    setGeneratedSql(defaultGeneratedSql);
    setExplanation(queryExplanation);
    setHasGenerated(true);
    setIsGenerating(false);
  }, [naturalLanguage]);

  const executeQuery = useCallback(async () => {
    setIsExecuting(true);
    await new Promise((r) => setTimeout(r, 1200));
    setResults(sampleQueryResult);
    setIsExecuting(false);
  }, []);

  const clearWorkspace = useCallback(() => {
    setNaturalLanguage('');
    setGeneratedSql('');
    setExplanation('');
    setResults(null);
    setHasGenerated(false);
  }, []);

  return {
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
  };
}
