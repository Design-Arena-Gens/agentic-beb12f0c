"use client";

function MetaRow({ name, content }: { name: string; content: string }) {
  return (
    <div style={{display:'grid', gridTemplateColumns:'160px 1fr', gap:8}}>
      <div className="label">{name}</div>
      <div>{content || '?'}</div>
    </div>
  );
}

export default function TagPreview({ results }: { results: any | null }) {
  if (!results) return null;

  const suggestions = results.aiSuggestions ?? results.suggestions;
  const title = suggestions?.title || results.page.title || '';
  const description = suggestions?.description || results.page.description || '';
  const tags = [
    `<title>${title}</title>`,
    `<meta name="description" content="${description}">`,
    results.page.canonical ? `<link rel="canonical" href="${results.page.canonical}">` : ''
  ].filter(Boolean).join('\n');

  const copy = async () => {
    await navigator.clipboard.writeText(tags);
  };

  return (
    <div>
      <h3>Meta Tag Preview</h3>
      <MetaRow name="Suggested title" content={title} />
      <MetaRow name="Suggested description" content={description} />
      <div className="hr" />
      <pre style={{whiteSpace:'pre-wrap', background:'#0f172a', color:'#e2e8f0', padding:12, borderRadius:8}}>{tags}</pre>
      <button className="button" onClick={copy}>Copy tags</button>
    </div>
  );
}
