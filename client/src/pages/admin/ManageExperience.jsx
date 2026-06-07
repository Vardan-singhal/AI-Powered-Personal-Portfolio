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
          description: '',
          technologies: '',
          achievements: '',
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
        {/* Header */}
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
        <div className="space-y-6">
          {content.items.map((item, i) => (
            <div
              key={i}
              className="
                rounded-xl
                border
                border-yellow-500/10
                bg-black
                p-5
                space-y-4
              "
            >
              {/* Role */}
              <div>
                <label className="block text-sm font-medium text-yellow-300 mb-2">
                  Role
                </label>

                <input
                  type="text"
                  value={item.role || ''}
                  onChange={(e) =>
                    updateExperienceItem(
                      i,
                      'role',
                      e.target.value
                    )
                  }
                  className="input"
                  placeholder="Frontend Developer Intern"
                />
              </div>

              {/* Company */}
              <div>
                <label className="block text-sm font-medium text-yellow-300 mb-2">
                  Company
                </label>

                <input
                  type="text"
                  value={item.company || ''}
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
              </div>

              {/* Date */}
              <div>
                <label className="block text-sm font-medium text-yellow-300 mb-2">
                  Duration
                </label>

                <input
                  type="text"
                  value={item.date || ''}
                  onChange={(e) =>
                    updateExperienceItem(
                      i,
                      'date',
                      e.target.value
                    )
                  }
                  className="input"
                  placeholder="September 2025 – March 2026"
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-yellow-300 mb-2">
                  Description
                </label>

                <textarea
                  value={item.description || ''}
                  onChange={(e) =>
                    updateExperienceItem(
                      i,
                      'description',
                      e.target.value
                    )
                  }
                  className="input"
                  rows={3}
                  placeholder="Brief summary of your role and responsibilities"
                />
              </div>

              {/* Technologies */}
              <div>
                <label className="block text-sm font-medium text-yellow-300 mb-2">
                  Technologies Used
                </label>

                <input
                  type="text"
                  value={item.technologies || ''}
                  onChange={(e) =>
                    updateExperienceItem(
                      i,
                      'technologies',
                      e.target.value
                    )
                  }
                  className="input"
                  placeholder="React.js, JavaScript, HTML5, CSS3, Bootstrap"
                />
              </div>

              {/* Achievements */}
              <div>
                <label className="block text-sm font-medium text-yellow-300 mb-2">
                  Key Achievements
                </label>

                <textarea
                  value={item.achievements || ''}
                  onChange={(e) =>
                    updateExperienceItem(
                      i,
                      'achievements',
                      e.target.value
                    )
                  }
                  className="input"
                  rows={6}
                  placeholder={`Enter one achievement per line

Developed responsive web interfaces
Integrated backend APIs
Converted Figma designs into reusable components
Improved page performance and UX`}
                />

                <p className="text-xs text-zinc-500 mt-2">
                  Each new line will be displayed as a bullet point on the Experience page.
                </p>
              </div>

              {/* Remove */}
              <button
                onClick={() => removeExperienceItem(i)}
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