import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import Loader from '../../components/common/Loader';
import {
  getPageContent,
  updatePageContent,
} from '../../services/pageContentService';

export default function ManageExperience() {
  const [page, setPage] = useState(null);
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getPageContent('experience')
      .then((p) => {
        setPage(p);
        setContent(JSON.parse(JSON.stringify(p.content)));
      })
      .finally(() => setLoading(false));
  }, []);

  const handleSave = async () => {
    setLoading(true);

    try {
      await updatePageContent('experience', {
        title: page.title,
        content,
      });

      toast.success('Experience page updated');
    } catch (error) {
      toast.error('Failed to update');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const addExperienceItem = () => {
    setContent({
      ...content,
      items: [
        ...content.items,
        {
          role: '',
          company: '',
          date: '',
          body: '',
        },
      ],
    });
  };

  const removeExperienceItem = (index) => {
    setContent({
      ...content,
      items: content.items.filter((_, i) => i !== index),
    });
  };

  const updateExperienceItem = (
    index,
    field,
    value
  ) => {
    setContent({
      ...content,
      items: content.items.map((item, i) =>
        i === index
          ? {
              ...item,
              [field]: value,
            }
          : item
      ),
    });
  };

  if (loading) {
    return <Loader text="Loading Experience Page..." />;
  }

  if (!content) return null;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
        <h2 className="text-3xl font-bold text-yellow-300">
          Edit Experience Page
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
        {/* Experience Header */}
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold text-yellow-300">
            Work Experience
          </h3>

          <button
            onClick={addExperienceItem}
            className="btn-ghost text-sm"
          >
            + Add Experience
          </button>
        </div>

        {/* Experience Items */}
        <div className="space-y-4">
          {content.items.map((item, i) => (
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
              {/* Role */}
              <input
                type="text"
                value={item.role}
                onChange={(e) =>
                  updateExperienceItem(
                    i,
                    'role',
                    e.target.value
                  )
                }
                className="input"
                placeholder="Job Role"
              />

              {/* Company */}
              <input
                type="text"
                value={item.company}
                onChange={(e) =>
                  updateExperienceItem(
                    i,
                    'company',
                    e.target.value
                  )
                }
                className="input"
                placeholder="Company Name"
              />

              {/* Date */}
              <input
                type="text"
                value={item.date}
                onChange={(e) =>
                  updateExperienceItem(
                    i,
                    'date',
                    e.target.value
                  )
                }
                className="input"
                placeholder="Jan 2024 — Present"
              />

              {/* Description */}
              <textarea
                value={item.body}
                onChange={(e) =>
                  updateExperienceItem(
                    i,
                    'body',
                    e.target.value
                  )
                }
                className="input"
                rows={4}
                placeholder="Describe responsibilities, achievements, technologies used..."
              />

              <button
                onClick={() =>
                  removeExperienceItem(i)
                }
                className="
                  text-red-400
                  text-sm
                  hover:text-red-300
                  transition
                "
              >
                Remove Experience
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}