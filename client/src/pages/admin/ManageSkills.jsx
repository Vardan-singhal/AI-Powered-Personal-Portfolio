import { useEffect, useState } from 'react';
import PageEditor from '../../components/admin/PageEditor';
import { getPageContent, updatePageContent } from '../../services/pageContentService';
import toast from 'react-hot-toast';

export default function ManageSkills() {
  const [page, setPage] = useState(null);
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getPageContent('skills').then((p) => {
      setPage(p);
      setContent(JSON.parse(JSON.stringify(p.content)));
      setLoading(false);
    });
  }, []);

  const handleSave = async () => {
    setLoading(true);
    try {
      await updatePageContent('skills', { title: page.title, content });
      toast.success('Skills page updated');
    } catch (error) {
      toast.error('Failed to update');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const addSkillCategory = () => {
    const categoryName = prompt('Enter category name:');
    if (categoryName) {
      setContent({
        ...content,
        categories: { ...content.categories, [categoryName]: [] },
      });
    }
  };

  const removeSkillCategory = (category) => {
    const updated = { ...content.categories };
    delete updated[category];
    setContent({ ...content, categories: updated });
  };

  const updateSkills = (category, skillsText) => {
    const skills = skillsText
      .split(',')
      .map((s) => s.trim())
      .filter((s) => s);
    setContent({
      ...content,
      categories: { ...content.categories, [category]: skills },
    });
  };

  if (loading) return <div>Loading...</div>;
  if (!content) return null;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Edit Skills</h2>
        <div className="flex gap-2">
          <button onClick={addSkillCategory} className="btn-ghost text-sm">
            + Add Category
          </button>
          <button onClick={handleSave} disabled={loading} className="btn-primary">
            {loading ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </div>

      <div className="bg-slate-800/50 rounded-lg p-6 space-y-4">
        <h3 className="text-lg font-semibold">Skill Categories</h3>
        <div className="space-y-4">
          {Object.entries(content.categories).map(([category, skills]) => (
            <div key={category} className="bg-slate-700/30 p-4 rounded">
              <div className="flex justify-between items-center mb-3">
                <label className="block text-sm font-medium">{category}</label>
                <button
                  onClick={() => removeSkillCategory(category)}
                  className="text-rose-400 text-sm hover:text-rose-300"
                >
                  Remove Category
                </button>
              </div>
              <textarea
                value={skills.join(', ')}
                onChange={(e) => updateSkills(category, e.target.value)}
                className="input"
                rows="3"
                placeholder="Enter skills separated by comma"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
