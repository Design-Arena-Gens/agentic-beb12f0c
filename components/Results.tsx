"use client";

export default function Results({ results }: { results: any | null }) {
  if (!results) return <p>Results will appear here after analysis.</p>;
  const { page, checks, externals, diagnostics, aiSuggestions } = results;

  return (
    <div>
      <h3 style={{marginTop:0}}>Audit</h3>
      <div className="kv">
        <div>Title</div>
        <div>
          <span className="badge" style={{marginRight:8}}>{checks.titleLengthOk ? 'OK' : 'Check length'}</span>
          {page.title || '?'}
        </div>
        <div>Meta description</div>
        <div>
          <span className="badge" style={{marginRight:8}}>{checks.descriptionLengthOk ? 'OK' : 'Check length'}</span>
          {page.description || '?'}
        </div>
        <div>H1 count</div>
        <div>{page.h1.length} {checks.multipleH1 ? <span className="badge warn">Multiple H1s</span> : ''}</div>
        <div>Canonical</div>
        <div>{page.canonical || '?'}</div>
        <div>Robots meta</div>
        <div>{page.robotsMeta || '?'}</div>
        <div>Language</div>
        <div>{page.lang || '?'}</div>
        <div>Word count (sample)</div>
        <div>{page.wordCount}</div>
        <div>Links</div>
        <div>{checks.internalLinks} internal / {checks.externalLinks} external</div>
        <div>Structured data blocks</div>
        <div>{checks.structuredDataBlocks}</div>
      </div>

      {checks.brokenAlts.length > 0 && (
        <div style={{marginTop:12}}>
          <strong className="warn">Images missing alt ({checks.brokenAlts.length}):</strong>
          <ul className="list">
            {checks.brokenAlts.slice(0,10).map((img: any, i: number) => (
              <li key={i}>{img.src || '(no src)'}</li>
            ))}
            {checks.brokenAlts.length > 10 && <li>?and {checks.brokenAlts.length - 10} more</li>}
          </ul>
        </div>
      )}

      <div className="hr" />

      <div className="kv">
        <div>robots.txt</div>
        <div>
          {externals?.robotsTxt ? (
            externals.robotsTxt.ok ? <span className="success">OK</span> : <span className="warn">Missing</span>
          ) : '?'}
          {externals?.robotsTxt?.disallowCount !== undefined && (
            <span style={{marginLeft:8}} className="badge">Disallow: {externals.robotsTxt.disallowCount}</span>
          )}
        </div>
        <div>sitemap.xml</div>
        <div>
          {externals?.sitemapXml ? (
            externals.sitemapXml.ok ? <span className="success">OK</span> : <span className="warn">Missing</span>
          ) : '?'}
        </div>
        <div>Fetch</div>
        <div>
          {diagnostics?.fetchStatus ? `Status ${diagnostics.fetchStatus}` : '?'}
          {diagnostics?.fetchedBytes ? <span className="badge" style={{marginLeft:8}}>{Math.round(diagnostics.fetchedBytes/1024)} KB</span> : null}
        </div>
      </div>

      {aiSuggestions && (
        <div style={{marginTop:12}}>
          <strong>AI Suggestions</strong>
          <div className="kv" style={{marginTop:8}}>
            <div>Title</div>
            <div>{aiSuggestions.title}</div>
            <div>Description</div>
            <div>{aiSuggestions.description}</div>
            <div>Keywords</div>
            <div>{aiSuggestions.keywords.join(', ')}</div>
          </div>
        </div>
      )}
    </div>
  );
}
