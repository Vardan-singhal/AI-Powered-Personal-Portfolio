import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api';
import Loader from '../../components/common/Loader';

export default function Dashboard() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    api
      .get('/admin/dashboard')
      .then((r) => setStats(r.data))
      .catch(console.error);
  }, []);

  if (!stats) {
    return <Loader text="Loading dashboard..." />;
  }

  const cards = [
    ['Projects', stats.projects],
    ['Resume Reviews', stats.reviews],
    ['Job Matches', stats.matches],
    ['Chat Messages', stats.messages],
    ['Knowledge Chunks', stats.knowledgeChunks],
  ];

  const pages = [
    { name: 'Home', slug: 'home' },
    { name: 'About', slug: 'about' },
    { name: 'Experience', slug: 'experience' },
    { name: 'Skills', slug: 'skills' },
  ];

  return (
    <div>
      {/* Header */}
      <h1 className="text-3xl font-bold text-yellow-300 mb-8">
        Admin Dashboard
      </h1>

      {/* Stats */}
      <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
        {cards.map(([label, value]) => (
          <div
            key={label}
            className="
              rounded-2xl
              border
              border-yellow-500/15
              bg-neutral-950
              p-5
              shadow-lg
              hover:border-yellow-500/30
              transition
            "
          >
            <p className="text-sm text-zinc-500">
              {label}
            </p>

            <p className="text-4xl font-bold text-yellow-300 mt-3">
              {value}
            </p>
          </div>
        ))}
      </div>

      {/* Page Management */}
      <div
        className="
          rounded-2xl
          border
          border-yellow-500/15
          bg-neutral-950
          p-6
          shadow-lg
        "
      >
        <h2 className="text-xl font-bold text-yellow-300 mb-5">
          Manage Pages
        </h2>

        <div className="grid md:grid-cols-2 gap-3">
          {pages.map((page) => (
            <Link
              key={page.slug}
              to={`/admin/pages/${page.slug}`}
              className="
                p-4
                rounded-xl
                border
                border-yellow-500/10
                bg-black
                text-zinc-300
                text-center
                hover:text-yellow-300
                hover:border-yellow-500/30
                hover:bg-yellow-500/5
                transition-all
              "
            >
              {page.name}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}