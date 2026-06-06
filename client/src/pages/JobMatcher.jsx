import { useState } from 'react';
import { matchJob } from '../services/jobMatcherService';
import toast from 'react-hot-toast';

export default function JobMatcher() {
  const [file, setFile] = useState(null);
  const [jd, setJd] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const run = async () => {
    if (!file || !jd) return toast.error('Resume and JD required');
    setLoading(true);
    try { setResult(await matchJob({ file, jobDescription: jd })); }
    catch (e) { toast.error('Failed'); } finally { setLoading(false); }
  };
  return (
    <div className="max-w-5xl mx-auto px-6 py-16 space-y-6">
      <h1 className="text-4xl font-bold">Job Description Matcher</h1>
      <div className="card space-y-3">
        <input type="file" accept="application/pdf" onChange={(e) => setFile(e.target.files[0])} className="text-sm" />
        <textarea className="input min-h-[200px]" placeholder="Paste job description…" value={jd} onChange={(e) => setJd(e.target.value)} />
        <button onClick={run} disabled={loading} className="btn-primary disabled:opacity-50">{loading ? 'Matching…' : 'Match Resume to JD'}</button>
      </div>
      {result && (
        <div className="space-y-4">
          <div className="card text-center">
            <p className="text-sm text-slate-400">Match Score</p>
            <p className="text-6xl font-bold text-brand-500 mt-2">{result.matchPercentage}%</p>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <Box title="Matching Skills" items={result.matchingSkills} color="text-emerald-400" />
            <Box title="Missing Skills" items={result.missingSkills} color="text-rose-400" />
            <Box title="Suggestions" items={result.suggestions} color="text-brand-500" />
            <Box title="ATS Advice" items={result.atsAdvice} color="text-amber-400" />
          </div>
        </div>
      )}
    </div>
  );
}
const Box = ({ title, items = [], color }) => (
  <div className="card"><h3 className={`font-semibold ${color} mb-3`}>{title}</h3>
    <ul className="space-y-2 text-sm text-slate-300">{items.map((x, i) => <li key={i}>• {x}</li>)}</ul>
  </div>
);
