export default function ATSScore({ score }) {
  const color = score >= 80 ? 'text-emerald-400' : score >= 60 ? 'text-amber-400' : 'text-rose-400';
  return (
    <div className="card text-center">
      <p className="text-sm text-slate-400">ATS Score</p>
      <p className={`text-6xl font-bold mt-2 ${color}`}>{score}</p>
      <p className="text-xs text-slate-400 mt-1">/ 100</p>
    </div>
  );
}
