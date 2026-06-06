import { useState } from 'react';
import { explainProject } from '../../services/aiService';
import Loader from '../common/Loader';

export default function AIProjectExplainer({ projectId }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const run = async () => { setLoading(true); try { setData(await explainProject(projectId)); } finally { setLoading(false); } };
  return (
    <div className="mt-6 pt-6 border-t border-white/10">
      {!data && !loading && <button onClick={run} className="btn-primary">✨ Explain This Project</button>}
      {loading && <Loader />}
      {data && (
        <div className="space-y-4 text-sm">
          <Section title="Summary" body={data.summary} />
          <Section title="Business Value" body={data.businessValue} />
          <Section title="Technical Challenges" body={data.technicalChallenges} />
          <Section title="Architecture" body={data.architecture} />
          <Section title="Suggested Improvements" body={data.improvements} />
        </div>
      )}
    </div>
  );
}
function Section({ title, body }) {
  return <div><h4 className="font-semibold text-brand-500">{title}</h4><p className="text-slate-300 mt-1 whitespace-pre-wrap">{Array.isArray(body) ? body.join('\n• ') : body}</p></div>;
}
