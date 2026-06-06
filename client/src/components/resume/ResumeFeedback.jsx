export default function ResumeFeedback({ review }) {
  if (!review) return null;
  return (
    <div className="grid md:grid-cols-2 gap-4">
      <Box title="Strengths" items={review.strengths} color="text-emerald-400" />
      <Box title="Weaknesses" items={review.weaknesses} color="text-rose-400" />
      <Box title="Missing Keywords" items={review.missingKeywords} color="text-amber-400" />
      <Box title="Suggestions" items={review.suggestions} color="text-brand-500" />
    </div>
  );
}
const Box = ({ title, items = [], color }) => (
  <div className="card">
    <h3 className={`font-semibold ${color} mb-3`}>{title}</h3>
    <ul className="space-y-2 text-sm text-slate-300">{items.map((x, i) => <li key={i}>• {x}</li>)}</ul>
  </div>
);
