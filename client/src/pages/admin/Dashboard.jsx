import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api';

export default function Dashboard() {
  const [s, setS] = useState(null);
  useEffect(() => { api.get('/admin/dashboard').then((r) => setS(r.data)); }, []);
  if (!s) return null;
  const cards = [
    ['Projects', s.projects],['Resume Reviews', s.reviews],['Job Matches', s.matches],
    ['Chat Messages', s.messages],['Knowledge Chunks', s.knowledgeChunks],
  ];
  const pages = [
    { name: 'Home', slug: 'home' },
    { name: 'About', slug: 'about' },
    { name: 'Experience', slug: 'experience' },
    { name: 'Skills', slug: 'skills' },
  ];
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
      <div className="grid md:grid-cols-3 gap-4 mb-8">
        {cards.map(([l, v]) => (
          <div key={l} className="card"><p className="text-sm text-slate-400">{l}</p><p className="text-4xl font-bold mt-2">{v}</p></div>
        ))}
      </div>

      <div className="card">
        <h2 className="text-xl font-bold mb-4">Manage Pages</h2>
        <div className="grid md:grid-cols-2 gap-3">
          {pages.map((page) => (
            <Link
              key={page.slug}
              to={`/admin/pages/${page.slug}`}
              className="p-3 rounded bg-slate-700/50 hover:bg-slate-700 transition text-center"
            >
              {page.name}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
