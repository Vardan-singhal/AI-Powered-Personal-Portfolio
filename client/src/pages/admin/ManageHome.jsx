import { useEffect, useState } from 'react';
import { getPageContent, updatePageContent } from '../../services/pageContentService';
import toast from 'react-hot-toast';

export default function ManageHome() {
  const [page, setPage] = useState(null);
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getPageContent('home').then((p) => {
      setPage(p);
      setContent(JSON.parse(JSON.stringify(p.content)));
      setLoading(false);
    });
  }, []);

  const handleSave = async () => {
    setLoading(true);
    try {
      await updatePageContent('home', { title: page.title, content });
      toast.success('Home page updated');
    } catch (error) {
      toast.error('Failed to update');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const addFeature = () => {
    setContent({
      ...content,
      features: [
        ...content.features,
        { icon: 'FiCpu', title: 'New Feature', body: 'Feature description' },
      ],
    });
  };

  const removeFeature = (index) => {
    setContent({
      ...content,
      features: content.features.filter((_, i) => i !== index),
    });
  };

  const updateFeature = (index, field, value) => {
    setContent({
      ...content,
      features: content.features.map((feature, i) =>
        i === index ? { ...feature, [field]: value } : feature
      ),
    });
  };

  const addCTA = () => {
    setContent({
      ...content,
      hero: {
        ...content.hero,
        ctas: [...content.hero.ctas, { text: 'New Button', link: '/', variant: 'ghost' }],
      },
    });
  };

  const removeCTA = (index) => {
    setContent({
      ...content,
      hero: {
        ...content.hero,
        ctas: content.hero.ctas.filter((_, i) => i !== index),
      },
    });
  };

  const updateCTA = (index, field, value) => {
    setContent({
      ...content,
      hero: {
        ...content.hero,
        ctas: content.hero.ctas.map((cta, i) =>
          i === index ? { ...cta, [field]: value } : cta
        ),
      },
    });
  };

  if (loading) return <div>Loading...</div>;
  if (!content) return null;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Edit Home</h2>
        <button onClick={handleSave} disabled={loading} className="btn-primary">
          {loading ? 'Saving...' : 'Save Changes'}
        </button>
      </div>

      <div className="bg-slate-800/50 rounded-lg p-6 space-y-4">
        {/* Hero Section */}
        <div className="border-b border-slate-700 pb-6">
          <h3 className="text-lg font-semibold mb-4">Hero Section</h3>
          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium mb-2">Main Title</label>
              <input
                type="text"
                value={content.hero.title}
                onChange={(e) =>
                  setContent({
                    ...content,
                    hero: { ...content.hero, title: e.target.value },
                  })
                }
                className="input"
                placeholder="Main title"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Subtitle</label>
              <textarea
                value={content.hero.subtitle}
                onChange={(e) =>
                  setContent({
                    ...content,
                    hero: { ...content.hero, subtitle: e.target.value },
                  })
                }
                className="input"
                rows="3"
                placeholder="Hero subtitle"
              />
            </div>

            {/* CTAs */}
            <div className="border-t border-slate-700 pt-4 mt-4">
              <div className="flex justify-between items-center mb-3">
                <label className="block text-sm font-medium">Call-to-Action Buttons</label>
                <button onClick={addCTA} className="btn-ghost text-sm">
                  + Add CTA
                </button>
              </div>
              <div className="space-y-2">
                {content.hero.ctas.map((cta, i) => (
                  <div key={i} className="bg-slate-800 p-3 rounded space-y-2">
                    <input
                      type="text"
                      value={cta.text}
                      onChange={(e) => updateCTA(i, 'text', e.target.value)}
                      className="input"
                      placeholder="Button text"
                    />
                    <input
                      type="text"
                      value={cta.link}
                      onChange={(e) => updateCTA(i, 'link', e.target.value)}
                      className="input"
                      placeholder="Link (e.g., /projects)"
                    />
                    <select
                      value={cta.variant}
                      onChange={(e) => updateCTA(i, 'variant', e.target.value)}
                      className="input"
                    >
                      <option value="primary">Primary</option>
                      <option value="ghost">Ghost</option>
                    </select>
                    <button
                      onClick={() => removeCTA(i)}
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

        {/* Features */}
        <div className="border-t border-slate-700 pt-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">Features</h3>
            <button onClick={addFeature} className="btn-ghost text-sm">
              + Add Feature
            </button>
          </div>
          <div className="space-y-4">
            {content.features.map((feature, i) => (
              <div key={i} className="bg-slate-700/30 p-4 rounded space-y-2">
                <input
                  type="text"
                  value={feature.title}
                  onChange={(e) => updateFeature(i, 'title', e.target.value)}
                  className="input"
                  placeholder="Feature title"
                />
                <textarea
                  value={feature.body}
                  onChange={(e) => updateFeature(i, 'body', e.target.value)}
                  className="input"
                  rows="2"
                  placeholder="Feature description"
                />
                <button
                  onClick={() => removeFeature(i)}
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
