import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { updatePageContent, resetPageContent } from '../../services/pageContentService';

export default function PageEditor({ slug, title, children }) {
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    setLoading(true);
    try {
      await updatePageContent(slug, { title, content });
      toast.success('Page updated');
    } catch (error) {
      toast.error('Failed to update page');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = async () => {
    if (window.confirm('Reset this page to defaults? This cannot be undone.')) {
      setLoading(true);
      try {
        await resetPageContent(slug);
        toast.success('Page reset to defaults');
        window.location.reload();
      } catch (error) {
        toast.error('Failed to reset page');
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Edit {title}</h2>
        <div className="flex gap-2">
          <button
            onClick={handleReset}
            disabled={loading}
            className="btn-ghost"
          >
            Reset
          </button>
          <button
            onClick={handleSave}
            disabled={loading}
            className="btn-primary"
          >
            {loading ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </div>

      <div className="bg-slate-800/50 rounded-lg p-6 space-y-4">
        {children({ content, setContent })}
      </div>
    </div>
  );
}
