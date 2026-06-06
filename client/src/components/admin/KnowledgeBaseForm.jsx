import api from '../../services/api';
import toast from 'react-hot-toast';
export default function KnowledgeBaseForm() {
  const reindex = async () => {
    const p = api.post('/admin/reindex');
    await toast.promise(p, { loading: 'Re-indexing…', success: 'Knowledge base re-indexed', error: 'Failed' });
  };
  return (
    <div className="card">
      <h3 className="font-semibold mb-2">Knowledge Base</h3>
      <p className="text-sm text-slate-400 mb-4">Re-ingests resume, projects, skills, experience from <code>server/knowledge-base/</code>.</p>
      <button onClick={reindex} className="btn-primary">Trigger Re-index</button>
    </div>
  );
}
