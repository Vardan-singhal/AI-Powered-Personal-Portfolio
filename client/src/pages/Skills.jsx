import { useState, useEffect } from 'react';
import { getPageContent } from '../services/pageContentService';

export default function Skills() {
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [q, setQ] = useState('');

  useEffect(() => {
    getPageContent('skills')
      .then((page) => setContent(page.content))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="max-w-5xl mx-auto px-6 py-16">Loading...</div>;
  if (!content) return null;

  const CATEGORIES = content.categories;

  return (
    <div className="max-w-5xl mx-auto px-6 py-16">
      <h1 className="text-4xl font-bold">Skills</h1>
      <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search skill…" className="input mt-6 max-w-xs" />
      <div className="grid md:grid-cols-2 gap-6 mt-8">
        {Object.entries(CATEGORIES).map(([cat, skills]) => {
          const filtered = skills.filter((s) => s.toLowerCase().includes(q.toLowerCase()));
          if (!filtered.length) return null;
          return (
            <div key={cat} className="card">
              <h3 className="font-semibold text-brand-500 mb-3">{cat}</h3>
              <div className="flex flex-wrap gap-2">
                {filtered.map((s) => <span key={s} className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-sm">{s}</span>)}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
