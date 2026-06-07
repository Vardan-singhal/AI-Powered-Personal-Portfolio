import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

import Loader from '../../components/common/Loader';
import {
  getPageContent,
  updatePageContent,
} from '../../services/pageContentService';

export default function ManageSkills() {
  const [page, setPage] = useState(null);
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getPageContent('skills')
      .then((p) => {
        setPage(p);
        setContent(JSON.parse(JSON.stringify(p.content)));
      })
      .finally(() => setLoading(false));
  }, []);

  const handleSave = async () => {
    setLoading(true);

    try {
      await updatePageContent('skills', {
        title: page.title,
        content,
      });

      toast.success('Skills page updated');
    } catch (error) {
      toast.error('Failed to update');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const addSkillCategory = () => {
    const categoryName = prompt(
      'Enter category name:'
    );

    if (categoryName) {
      setContent({
        ...content,
        categories: {
          ...content.categories,
          [categoryName]: [],
        },
      });
    }
  };

  const removeSkillCategory = (category) => {
    const updated = {
      ...content.categories,
    };

    delete updated[category];

    setContent({
      ...content,
      categories: updated,
    });
  };

  const updateSkills = (
    category,
    skillsText
  ) => {
    const skills = skillsText
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);

    setContent({
      ...content,
      categories: {
        ...content.categories,
        [category]: skills,
      },
    });
  };

  if (loading) {
    return <Loader text="Loading Skills Page..." />;
  }

  if (!content) return null;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
        <h2 className="text-3xl font-bold text-yellow-300">
          Edit Skills Page
        </h2>

        <div className="flex gap-3">
          <button
            onClick={addSkillCategory}
            className="btn-ghost text-sm"
          >
            + Add Category
          </button>

          <button
            onClick={handleSave}
            disabled={loading}
            className="btn-primary"
          >
            {loading
              ? 'Saving...'
              : 'Save Changes'}
          </button>
        </div>
      </div>

      {/* Content */}
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
        <h3 className="text-xl font-semibold text-yellow-300 mb-6">
          Skill Categories
        </h3>

        <div className="space-y-4">
          {Object.entries(
            content.categories
          ).map(([category, skills]) => (
            <div
              key={category}
              className="
                rounded-xl
                border
                border-yellow-500/10
                bg-black
                p-4
                transition
                hover:border-yellow-500/20
              "
            >
              <div className="flex justify-between items-center mb-4">
                <label className="font-medium text-yellow-300">
                  {category}
                </label>

                <button
                  onClick={() =>
                    removeSkillCategory(
                      category
                    )
                  }
                  className="
                    text-red-400
                    text-sm
                    hover:text-red-300
                    transition
                  "
                >
                  Remove Category
                </button>
              </div>

              <textarea
                value={skills.join(', ')}
                onChange={(e) =>
                  updateSkills(
                    category,
                    e.target.value
                  )
                }
                className="input"
                rows={4}
                placeholder="React, Node.js, Express, MongoDB..."
              />

              <p className="text-xs text-zinc-500 mt-2">
                Separate skills using commas.
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}