import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import api from '../../services/api';
import Loader from '../../components/common/Loader';
import KnowledgeBaseForm from '../../components/admin/KnowledgeBaseForm';

export default function ManageKnowledge() {
  const [docs, setDocs] = useState([]);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    try {
      const { data } = await api.get('/admin/knowledge');
      setDocs(data);
    } catch (error) {
      console.error(error);
      toast.error('Failed to load knowledge base');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const del = async (id) => {
    try {
      await api.delete(`/admin/knowledge/${id}`);

      toast.success('Chunk deleted');

      load();
    } catch (error) {
      console.error(error);
      toast.error('Failed to delete chunk');
    }
  };

  if (loading) {
    return <Loader text="Loading Knowledge Base..." />;
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <h1 className="text-3xl font-bold text-yellow-300">
        Knowledge Base
      </h1>

      {/* Reindex Section */}
      <KnowledgeBaseForm />

      {/* Chunks */}
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
        <h3 className="font-semibold text-yellow-300 mb-4">
          Knowledge Chunks ({docs.length})
        </h3>

        <div className="space-y-3 max-h-[500px] overflow-y-auto pr-2">
          {docs.length === 0 ? (
            <div className="text-center py-8 text-zinc-500">
              No knowledge chunks found.
            </div>
          ) : (
            docs.map((d) => (
              <div
                key={d._id}
                className="
                  flex
                  justify-between
                  gap-4
                  rounded-xl
                  border
                  border-yellow-500/10
                  bg-black
                  p-4
                  transition
                  hover:border-yellow-500/20
                "
              >
                <div className="min-w-0 flex-1">
                  <p className="text-xs text-yellow-300 mb-1">
                    {d.source} / {d.title} #{d.chunkIndex}
                  </p>

                  <p className="text-sm text-zinc-400 truncate">
                    {d.content}
                  </p>
                </div>

                <button
                  onClick={() => del(d._id)}
                  className="
                    text-red-400
                    text-lg
                    hover:text-red-300
                    transition
                    flex-shrink-0
                  "
                  title="Delete chunk"
                >
                  ×
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}