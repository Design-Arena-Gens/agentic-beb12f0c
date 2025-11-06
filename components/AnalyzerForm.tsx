"use client";
import { useState } from 'react';

export default function AnalyzerForm({ onAnalyze, loading }: { onAnalyze: (payload: any) => void; loading: boolean; }) {
  const [mode, setMode] = useState<'url'|'html'>('url');
  const [url, setUrl] = useState('');
  const [html, setHtml] = useState('');
  const [keywords, setKeywords] = useState('');
  const [useAi, setUseAi] = useState(true);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const kw = keywords.split(',').map(s => s.trim()).filter(Boolean);
    if (mode === 'url') {
      onAnalyze({ url, keywords: kw, useAi });
    } else {
      onAnalyze({ html, keywords: kw, useAi });
    }
  };

  return (
    <form onSubmit={submit}>
      <div style={{display:'flex', gap:8, marginBottom:12}}>
        <button type="button" className="button" onClick={() => setMode('url')} disabled={mode==='url'}>URL</button>
        <button type="button" className="button" onClick={() => setMode('html')} disabled={mode==='html'}>HTML</button>
      </div>

      {mode === 'url' ? (
        <div style={{display:'grid', gap:12}}>
          <label className="label" htmlFor="url">Page URL</label>
          <input id="url" className="input" placeholder="https://example.com/page" value={url} onChange={e=>setUrl(e.target.value)} required />
        </div>
      ) : (
        <div style={{display:'grid', gap:12}}>
          <label className="label" htmlFor="html">Paste HTML</label>
          <textarea id="html" className="textarea" rows={8} placeholder="<!doctype html>..." value={html} onChange={e=>setHtml(e.target.value)} required />
        </div>
      )}

      <div className="hr" />

      <div style={{display:'grid', gap:8}}>
        <label className="label" htmlFor="kw">Target keywords (comma separated)</label>
        <input id="kw" className="input" placeholder="e.g. crm software, small business" value={keywords} onChange={e=>setKeywords(e.target.value)} />
      </div>

      <div style={{marginTop:8, display:'flex', alignItems:'center', gap:8}}>
        <input id="ai" type="checkbox" checked={useAi} onChange={e=>setUseAi(e.target.checked)} />
        <label htmlFor="ai">Use AI (if available)</label>
      </div>

      <div style={{marginTop:12, display:'flex', gap:8}}>
        <button className="button" disabled={loading}>{loading ? 'Analyzing?' : 'Analyze'}</button>
      </div>
    </form>
  );
}
