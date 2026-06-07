import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import Loader from '../../components/common/Loader';
import {
  getPageContent,
  updatePageContent,
} from '../../services/pageContentService';

export default function ManageHome() {
  const [page, setPage] = useState(null);
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getPageContent('home')
      .then((p) => {
        setPage(p);
        setContent(JSON.parse(JSON.stringify(p.content)));
      })
      .finally(() => setLoading(false));
  }, []);

  const handleSave = async () => {
    setLoading(true);

    try {
      await updatePageContent('home', {
        title: page.title,
        content,
      });

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
        {
          icon: 'FiCpu',
          title: 'New Feature',
          body: 'Feature description',
        },
      ],
    });
  };

  const removeFeature = (index) => {
    setContent({
      ...content,
      features: content.features.filter(
        (_, i) => i !== index
      ),
    });
  };

  const updateFeature = (
    index,
    field,
    value
  ) => {
    setContent({
      ...content,
      features: content.features.map(
        (feature, i) =>
          i === index
            ? {
                ...feature,
                [field]: value,
              }
            : feature
      ),
    });
  };

  const addCTA = () => {
    setContent({
      ...content,
      hero: {
        ...content.hero,
        ctas: [
          ...content.hero.ctas,
          {
            text: 'New Button',
            link: '/',
            variant: 'ghost',
          },
        ],
      },
    });
  };

  const removeCTA = (index) => {
    setContent({
      ...content,
      hero: {
        ...content.hero,
        ctas: content.hero.ctas.filter(
          (_, i) => i !== index
        ),
      },
    });
  };

  const updateCTA = (
    index,
    field,
    value
  ) => {
    setContent({
      ...content,
      hero: {
        ...content.hero,
        ctas: content.hero.ctas.map((cta, i) =>
          i === index
            ? {
                ...cta,
                [field]: value,
              }
            : cta
        ),
      },
    });
  };

  if (loading) {
    return <Loader text="Loading Home Page..." />;
  }

  if (!content) return null;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
        <h2 className="text-3xl font-bold text-yellow-300">
          Edit Home Page
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
          space-y-8
          shadow-lg
        "
      >
        {/* Hero Section */}
        <div className="border-b border-yellow-500/10 pb-8">
          <h3 className="text-xl font-semibold text-yellow-300 mb-5">
            Hero Section
          </h3>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-yellow-300 mb-2">
                Main Title
              </label>

              <input
                type="text"
                value={content.hero.title}
                onChange={(e) =>
                  setContent({
                    ...content,
                    hero: {
                      ...content.hero,
                      title: e.target.value,
                    },
                  })
                }
                className="input"
                placeholder="Main title"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-yellow-300 mb-2">
                Subtitle
              </label>

              <textarea
                value={content.hero.subtitle}
                onChange={(e) =>
                  setContent({
                    ...content,
                    hero: {
                      ...content.hero,
                      subtitle: e.target.value,
                    },
                  })
                }
                className="input"
                rows={4}
                placeholder="Hero subtitle"
              />
            </div>

            {/* CTA Buttons */}
            <div className="border-t border-yellow-500/10 pt-5 mt-5">
              <div className="flex justify-between items-center mb-4">
                <label className="text-sm font-medium text-yellow-300">
                  Call-to-Action Buttons
                </label>

                <button
                  onClick={addCTA}
                  className="btn-ghost text-sm"
                >
                  + Add CTA
                </button>
              </div>

              <div className="space-y-3">
                {content.hero.ctas.map((cta, i) => (
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
                    <input
                      type="text"
                      value={cta.text}
                      onChange={(e) =>
                        updateCTA(
                          i,
                          'text',
                          e.target.value
                        )
                      }
                      className="input"
                      placeholder="Button text"
                    />

                    <input
                      type="text"
                      value={cta.link}
                      onChange={(e) =>
                        updateCTA(
                          i,
                          'link',
                          e.target.value
                        )
                      }
                      className="input"
                      placeholder="/projects"
                    />

                    <select
                      value={cta.variant}
                      onChange={(e) =>
                        updateCTA(
                          i,
                          'variant',
                          e.target.value
                        )
                      }
                      className="input"
                    >
                      <option value="primary">
                        Primary
                      </option>

                      <option value="ghost">
                        Ghost
                      </option>
                    </select>

                    <button
                      onClick={() =>
                        removeCTA(i)
                      }
                      className="
                        text-red-400
                        text-sm
                        hover:text-red-300
                        transition
                      "
                    >
                      Remove CTA
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Features */}
        <div>
          <div className="flex justify-between items-center mb-5">
            <h3 className="text-xl font-semibold text-yellow-300">
              Features
            </h3>

            <button
              onClick={addFeature}
              className="btn-ghost text-sm"
            >
              + Add Feature
            </button>
          </div>

          <div className="space-y-4">
            {content.features.map(
              (feature, i) => (
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
                  <input
                    type="text"
                    value={feature.title}
                    onChange={(e) =>
                      updateFeature(
                        i,
                        'title',
                        e.target.value
                      )
                    }
                    className="input"
                    placeholder="Feature title"
                  />

                  <textarea
                    value={feature.body}
                    onChange={(e) =>
                      updateFeature(
                        i,
                        'body',
                        e.target.value
                      )
                    }
                    className="input"
                    rows={3}
                    placeholder="Feature description"
                  />

                  <button
                    onClick={() =>
                      removeFeature(i)
                    }
                    className="
                      text-red-400
                      text-sm
                      hover:text-red-300
                      transition
                    "
                  >
                    Remove Feature
                  </button>
                </div>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
}