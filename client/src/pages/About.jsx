import { useEffect, useState } from 'react';
import { getPageContent } from '../services/pageContentService';

export default function About() {
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getPageContent('about')
      .then((page) => setContent(page.content))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="max-w-4xl mx-auto px-6 py-16">Loading...</div>;
  if (!content) return null;
  

  return (
    <div className="max-w-4xl mx-auto px-6 py-16">
      <h1 className="text-4xl font-bold">About Me</h1>
      <p className="text-slate-300 mt-4">{content.intro}</p>
      <a href={content.resumeUrl} download className="btn-primary inline-block mt-6">Download Resume</a>
      
      {content.sections.map((section, i) => (
        <div key={i}>
          <h2 className="text-2xl font-bold mt-12">{section.heading}</h2>
          <ul className="mt-4 space-y-3 border-l border-white/15 pl-6">
            {section.items.map((item, j) => (
              <li key={j}>
                <p className="font-semibold">{item.title}</p>
                <p className="text-primary font-medium">
    {item.institution}
  </p>
                <p className="text-sm text-slate-400">{item.date}</p>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
