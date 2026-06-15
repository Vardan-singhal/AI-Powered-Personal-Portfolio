import { useState } from 'react';
import { explainProject } from '../../services/aiService';
import Loader from '../common/Loader';

export default function AIProjectExplainer({ projectId }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  const run = async () => {
    setLoading(true);

    try {
      setData(await explainProject(projectId));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="
        mt-8
        pt-6
        border-t
        border-yellow-500/10
      "
    >
      {!data && !loading && (
        <button
          onClick={run}
          className="
            px-5
            py-3
            rounded-xl
            bg-brand-600
            text-black
            font-semibold
            hover:scale-105
            transition-all
            duration-200
          "
        >
          ✨ Explain This Project
        </button>
      )}

      {loading && <Loader />}

      {data && (
        <div className="space-y-5">
          <Section
            title="Summary"
            body={data.summary}
          />

          <Section
            title="Business Value"
            body={data.businessValue}
          />

          <Section
            title="Technical Challenges"
            body={data.technicalChallenges}
          />

          <Section
            title="Architecture"
            body={data.architecture}
          />

          <Section
            title="Suggested Improvements"
            body={data.improvements}
          />
        </div>
      )}
    </div>
  );
}

function Section({ title, body }) {
  const renderContent = () => {
    // Arrays
    if (Array.isArray(body)) {
      return body.map((item, index) => (
        <div key={index} className="mb-2">
          • {typeof item === 'object'
            ? JSON.stringify(item, null, 2)
            : item}
        </div>
      ));
    }

    // Objects like { nonTechnical, technical }
    if (typeof body === 'object' && body !== null) {
      return (
        <div className="space-y-4">
          {body.nonTechnical && (
            <div>
              <h5 className="font-medium text-yellow-200 mb-1">
                Non-Technical
              </h5>
              <p>{body.nonTechnical}</p>
            </div>
          )}

          {body.technical && (
            <div>
              <h5 className="font-medium text-yellow-200 mb-1">
                Technical
              </h5>
              <p>{body.technical}</p>
            </div>
          )}

          {!body.nonTechnical &&
            !body.technical &&
            Object.entries(body).map(([key, value]) => (
              <div key={key}>
                <h5 className="font-medium text-yellow-200 mb-1 capitalize">
                  {key}
                </h5>
                <p>
                  {typeof value === 'object'
                    ? JSON.stringify(value, null, 2)
                    : String(value)}
                </p>
              </div>
            ))}
        </div>
      );
    }

    // Strings, numbers, null, undefined
    return body ?? 'No data available';
  };

  return (
    <div
      className="
        rounded-xl
        border
        border-yellow-500/10
        bg-neutral-950
        p-4
      "
    >
      <h4 className="font-semibold text-yellow-300 mb-2">
        {title}
      </h4>

      <div className="text-zinc-300 text-sm leading-relaxed whitespace-pre-wrap">
        {renderContent()}
      </div>
    </div>
  );
}