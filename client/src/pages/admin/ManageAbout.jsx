import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import Loader from '../../components/common/Loader';
import {
  getPageContent,
  updatePageContent,
} from '../../services/pageContentService';

export default function ManageAbout() {
  const [page, setPage] = useState(null);
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getPageContent('about')
      .then((p) => {
        setPage(p);
        setContent(JSON.parse(JSON.stringify(p.content)));
      })
      .finally(() => setLoading(false));
  }, []);

  const handleSave = async () => {
    setLoading(true);

    try {
      await updatePageContent('about', {
        title: page.title,
        content,
      });

      toast.success('About page updated');
    } catch (error) {
      toast.error('Failed to update');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const addEducationItem = () => {
    setContent({
      ...content,
      sections: content.sections.map((s) =>
        s.heading === 'Education'
          ? {
              ...s,
              items: [
                ...s.items,
                {
                  title: '',
                  institution: '',
                  date: '',
                },
              ],
            }
          : s
      ),
    });
  };

  const removeEducationItem = (index) => {
    setContent({
      ...content,
      sections: content.sections.map((s) =>
        s.heading === 'Education'
          ? {
              ...s,
              items: s.items.filter((_, i) => i !== index),
            }
          : s
      ),
    });
  };

  const updateEducationItem = (index, field, value) => {
    setContent({
      ...content,
      sections: content.sections.map((s) =>
        s.heading === 'Education'
          ? {
              ...s,
              items: s.items.map((item, i) =>
                i === index
                  ? {
                      ...item,
                      [field]: value,
                    }
                  : item
              ),
            }
          : s
      ),
    });
  };

  if (loading) {
    return <Loader text="Loading About Page..." />;
  }

  if (!content) return null;

  const eduSection = content.sections.find(
    (s) => s.heading === 'Education'
  );

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
        <h2 className="text-3xl font-bold text-yellow-300">
          Edit About Page
        </h2>

        <button
          onClick={handleSave}
          disabled={loading}
          className="btn-primary"
        >
          {loading ? 'Saving...' : 'Save Changes'}
        </button>
      </div>

      {/* Content */}
      <div
        className="
          rounded-2xl
          border
          border-yellow-500/15
          bg-neutral-950
          p-6
          space-y-6
          shadow-lg
        "
      >
        {/* Introduction */}
        <div>
          <label className="block text-sm font-medium text-yellow-300 mb-2">
            Introduction
          </label>

          <textarea
            value={content.intro}
            onChange={(e) =>
              setContent({
                ...content,
                intro: e.target.value,
              })
            }
            className="input"
            rows={5}
            placeholder="Your introduction"
          />
        </div>

        {/* Resume URL */}
        <div>
          <label className="block text-sm font-medium text-yellow-300 mb-2">
            Resume URL
          </label>

          <input
            type="text"
            value={content.resumeUrl}
            onChange={(e) =>
              setContent({
                ...content,
                resumeUrl: e.target.value,
              })
            }
            className="input"
            placeholder="e.g. /resume.pdf"
          />
        </div>

        {/* Education */}
        <div className="border-t border-yellow-500/10 pt-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-yellow-300">
              Education
            </h3>

            <button
              onClick={addEducationItem}
              className="btn-ghost text-sm"
            >
              + Add Education
            </button>
          </div>

          <div className="space-y-4">
            {eduSection?.items.map((item, i) => (
              <div
                key={i}
                className="
                  rounded-xl
                  border
                  border-yellow-500/10
                  bg-black
                  p-4
                  space-y-3
                "
              >
                {/* Degree */}
                <input
                  type="text"
                  value={item.title}
                  onChange={(e) =>
                    updateEducationItem(
                      i,
                      'title',
                      e.target.value
                    )
                  }
                  className="input"
                  placeholder="Degree / Certificate"
                />

                {/* Institution */}
                <input
                  type="text"
                  value={item.institution || ''}
                  onChange={(e) =>
                    updateEducationItem(
                      i,
                      'institution',
                      e.target.value
                    )
                  }
                  className="input"
                  placeholder="College / University / School"
                />

                {/* Duration */}
                <input
                  type="text"
                  value={item.date}
                  onChange={(e) =>
                    updateEducationItem(
                      i,
                      'date',
                      e.target.value
                    )
                  }
                  className="input"
                  placeholder="2021 — 2025"
                />

                <button
                  onClick={() => removeEducationItem(i)}
                  className="
                    text-red-400
                    text-sm
                    hover:text-red-300
                    transition
                  "
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}