import api from '../../services/api';
import toast from 'react-hot-toast';

export default function KnowledgeBaseForm() {
  const reindex = async () => {
    const p = api.post('/admin/reindex');

    await toast.promise(p, {
      loading: 'Re-indexing...',
      success: 'Knowledge base re-indexed',
      error: 'Failed',
    });
  };

  return (
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
      <h3 className="font-semibold text-lg text-yellow-300 mb-3">
        Knowledge Base
      </h3>

      <p className="text-sm text-zinc-400 mb-5 leading-relaxed">
        Re-ingests resume, projects, skills, and experience from{' '}
        <code className="px-2 py-1 rounded bg-black border border-yellow-500/10 text-yellow-300">
          server/knowledge-base/
        </code>
        .
      </p>

      <button
        onClick={reindex}
        className="
          px-5
          py-2.5
          rounded-xl
          bg-brand-600
          text-black
          font-semibold
          transition
          hover:scale-105
          hover:shadow-md
        "
      >
        Trigger Re-index
      </button>
    </div>
  );
}