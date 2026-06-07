import { useState } from 'react';
import toast from 'react-hot-toast';
import {
  updatePageContent,
  resetPageContent,
} from '../../services/pageContentService';

export default function PageEditor({ slug, title, children }) {
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    setLoading(true);

    try {
      await updatePageContent(slug, {
        title,
        content,
      });

      toast.success('Page updated');
    } catch (error) {
      toast.error('Failed to update page');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = async () => {
    if (
      window.confirm(
        'Reset this page to defaults? This cannot be undone.'
      )
    ) {
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
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <h2 className="text-2xl font-bold text-yellow-300">
          Edit {title}
        </h2>

        <div className="flex gap-3">
          <button
            onClick={handleReset}
            disabled={loading}
            className="
              px-4
              py-2
              rounded-xl
              border
              border-yellow-500/20
              text-yellow-300
              hover:bg-yellow-500/10
              transition
              disabled:opacity-50
            "
          >
            Reset
          </button>

          <button
            onClick={handleSave}
            disabled={loading}
            className="
              px-5
              py-2
              rounded-xl
              bg-brand-600
              text-black
              font-semibold
              transition
              hover:scale-105
              disabled:opacity-50
              disabled:hover:scale-100
            "
          >
            {loading ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </div>

      {/* Editor Content */}
      <div
        className="
          rounded-2xl
          border
          border-yellow-500/15
          bg-neutral-950
          p-6
          space-y-4
          shadow-lg
        "
      >
        {children({
          content,
          setContent,
        })}
      </div>
    </div>
  );
}