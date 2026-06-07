import { useEffect, useState } from 'react';
import { getPageContent } from '../services/pageContentService';
import Loader from '../components/common/Loader';

export default function Experience() {
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getPageContent('experience')
      .then((page) => setContent(page.content))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <Loader text="Loading Experience..." />;
  }

  if (!content) return null;

  return (
    <section className="max-w-5xl mx-auto px-6 py-16">
      {/* Heading */}
      <div className="mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-yellow-300">
          Experience
        </h1>

        <p className="mt-3 text-zinc-400">
          Professional experience, internships, freelance work,
          and major contributions.
        </p>
      </div>

      {/* Timeline */}
      <div className="relative border-l border-yellow-500/20 pl-8 space-y-10">
        {content.items.map((item, index) => (
          <div
            key={index}
            className="relative"
          >
            {/* Timeline Dot */}
            <div
              className="
                absolute
                -left-[42px]
                top-1
                w-4
                h-4
                rounded-full
                bg-yellow-400
                border-4
                border-black
              "
            />

            {/* Card */}
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
              <h3 className="text-xl font-semibold text-yellow-300">
                {item.role}
              </h3>

              <p className="mt-1 text-zinc-300">
                {item.company}
              </p>

              <p className="mt-1 text-sm text-zinc-500">
                {item.date}
              </p>

              {/* Bullet Points */}
              <ul className="mt-4 space-y-2">
                {item.body
                  ?.split('\n')
                  .filter((point) => point.trim())
                  .map((point, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-3 text-zinc-300"
                    >
                      <span className="text-yellow-400 mt-1">
                        •
                      </span>

                      <span>{point}</span>
                    </li>
                  ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}