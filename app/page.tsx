"use client";
import { useState } from 'react';
import AnalyzerForm from '../components/AnalyzerForm';
import Results from '../components/Results';
import TagPreview from '../components/TagPreview';

export default function Page() {
  const [results, setResults] = useState<any | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleAnalyze = async (payload: any) => {
    setLoading(true);
    setError(null);
    setResults(null);
    try {
      const res = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      if (!res.ok) {
        const t = await res.text();
        throw new Error(t || 'Request failed');
      }
      const data = await res.json();
      setResults(data);
    } catch (e: any) {
      setError(e.message || 'Unknown error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h1>SEO Optimize AI Agent</h1>
      <p>Analyze a URL or paste HTML to get actionable SEO recommendations, meta tag suggestions, and a live preview.</p>
      <div className="row" style={{marginTop: 16}}>
        <div>
          <div className="card">
            <AnalyzerForm onAnalyze={handleAnalyze} loading={loading} />
            {error && <p className="error" style={{marginTop:12}}>{error}</p>}
          </div>
        </div>
        <div>
          <div className="card">
            <Results results={results} />
            <div className="hr" />
            <TagPreview results={results} />
          </div>
        </div>
      </div>
    </div>
  );
}
