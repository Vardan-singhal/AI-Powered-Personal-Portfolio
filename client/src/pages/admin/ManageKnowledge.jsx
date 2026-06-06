import { useEffect, useState } from 'react';
import api from '../../services/api';
import KnowledgeBaseForm from '../../components/admin/KnowledgeBaseForm';
import toast from 'react-hot-toast';

export default function ManageKnowledge() {
  const [docs, setDocs] = useState([]);
  const load = () => api.get('/admin/knowledge').then((r) => setDocs(r.data));
  useEffect(() => { load(); }, []);
  const del = async (id) => { await api.delete(`/admin/knowledge/${id}`); toast.success('Deleted'); load(); };
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Knowledge Base</h1>
      <KnowledgeBaseForm />
      <div className="card">
        <h3 className="font-semibold mb-3">Chunks ({docs.length})</h3>
        <div className="space-y-2 max-h-[500px] overflow-y-auto">
          {docs.map((d) => (
            <div key={d._id} className="p-3 border border-white/10 rounded-lg flex justify-between gap-3">
              <div className="min-w-0">
                <p className="text-xs text-brand-500">{d.source} / {d.title} #{d.chunkIndex}</p>
                <p className="text-sm text-slate-400 truncate">{d.content}</p>
              </div>
              <button onClick={() => del(d._id)} className="text-rose-400 text-sm">×</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
