import { useEffect, useState } from 'react';
import { getPageContent } from '../services/pageContentService';

export default function Experience() {
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getPageContent('experience')
      .then((page) => setContent(page.content))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="max-w-4xl mx-auto px-6 py-16">Loading...</div>;
  if (!content) return null;

  return (
    <div className="max-w-4xl mx-auto px-6 py-16">
      <h1 className="text-4xl font-bold">Experience</h1>
      <div className="mt-8 space-y-6 border-l border-white/15 pl-6">
        {content.items.map((item, i) => (
          <div key={i}>
            <p className="font-semibold">{item.role} — {item.company}</p>
            <p className="text-sm text-slate-400">{item.date}</p>
            <p className="text-slate-300 mt-2">{item.body}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
