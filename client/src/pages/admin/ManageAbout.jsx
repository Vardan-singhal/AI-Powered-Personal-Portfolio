import { useEffect, useState } from 'react';
import PageEditor from '../../components/admin/PageEditor';
import { getPageContent, updatePageContent } from '../../services/pageContentService';
import toast from 'react-hot-toast';

export default function ManageAbout() {
  const [page, setPage] = useState(null);
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getPageContent('about').then((p) => {
      setPage(p);
      setContent(JSON.parse(JSON.stringify(p.content)));
      setLoading(false);
    });
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

  if (loading) return <div>Loading...</div>;
  if (!content) return null;

  const eduSection = content.sections.find(
    (s) => s.heading === 'Education'
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Edit About</h2>

        <button
          onClick={handleSave}
          disabled={loading}
          className="btn-primary"
        >
          {loading ? 'Saving...' : 'Save Changes'}
        </button>
      </div>

      <div className="bg-slate-800/50 rounded-lg p-6 space-y-4">
        {/* Introduction */}
        <div>
          <label className="block text-sm font-medium mb-2">
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
            rows="4"
            placeholder="Your introduction"
          />
        </div>

        {/* Resume URL */}
        <div>
          <label className="block text-sm font-medium mb-2">
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
            placeholder="e.g., /resume.pdf"
          />
        </div>

        {/* Education */}
        <div className="border-t border-slate-700 pt-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">
              Education
            </h3>

            <button
              onClick={addEducationItem}
              className="btn-ghost text-sm"
            >
              + Add Education
            </button>
          </div>

          <div className="space-y-3">
            {eduSection?.items.map((item, i) => (
              <div
                key={i}
                className="bg-slate-700/30 p-4 rounded space-y-3"
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

                {/* College / University */}
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
                  className="text-rose-400 text-sm hover:text-rose-300"
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