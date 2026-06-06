import { useEffect, useState } from 'react';
import PageEditor from '../../components/admin/PageEditor';
import { getPageContent, updatePageContent } from '../../services/pageContentService';
import toast from 'react-hot-toast';

export default function ManageExperience() {
  const [page, setPage] = useState(null);
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getPageContent('experience').then((p) => {
      setPage(p);
      setContent(JSON.parse(JSON.stringify(p.content)));
      setLoading(false);
    });
  }, []);

  const handleSave = async () => {
    setLoading(true);
    try {
      await updatePageContent('experience', { title: page.title, content });
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
      items: [...content.items, { role: '', company: '', date: '', body: '' }],
    });
  };

  const removeExperienceItem = (index) => {
    setContent({
      ...content,
      items: content.items.filter((_, i) => i !== index),
    });
  };

  const updateExperienceItem = (index, field, value) => {
    setContent({
      ...content,
      items: content.items.map((item, i) =>
        i === index ? { ...item, [field]: value } : item
      ),
    });
  };

  if (loading) return <div>Loading...</div>;
  if (!content) return null;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Edit Experience</h2>
        <button onClick={handleSave} disabled={loading} className="btn-primary">
          {loading ? 'Saving...' : 'Save Changes'}
        </button>
      </div>

      <div className="bg-slate-800/50 rounded-lg p-6 space-y-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Work Experience</h3>
          <button onClick={addExperienceItem} className="btn-ghost text-sm">
            + Add Experience
          </button>
        </div>

        <div className="space-y-4">
          {content.items.map((item, i) => (
            <div key={i} className="bg-slate-700/30 p-4 rounded space-y-2">
              <input
                type="text"
                value={item.role}
                onChange={(e) => updateExperienceItem(i, 'role', e.target.value)}
                className="input"
                placeholder="Job role"
              />
              <input
                type="text"
                value={item.company}
                onChange={(e) => updateExperienceItem(i, 'company', e.target.value)}
                className="input"
                placeholder="Company name"
              />
              <input
                type="text"
                value={item.date}
                onChange={(e) => updateExperienceItem(i, 'date', e.target.value)}
                className="input"
                placeholder="Date/Period"
              />
              <textarea
                value={item.body}
                onChange={(e) => updateExperienceItem(i, 'body', e.target.value)}
                className="input"
                rows="3"
                placeholder="Job description"
              />
              <button
                onClick={() => removeExperienceItem(i)}
                className="text-rose-400 text-sm hover:text-rose-300"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
