const Q = [
  'What projects has the developer built?',
  'What AI experience do you have?',
  'What is your strongest skill?',
  'Tell me about your most impressive project.',
];
export default function SuggestedQuestions({ onPick }) {
  return (
    <div className="space-y-2">
      <p className="text-xs text-slate-400">Try asking:</p>
      {Q.map((q) => (
        <button key={q} onClick={() => onPick(q)} className="w-full text-left text-sm p-3 rounded-lg bg-white/5 hover:bg-white/10 transition">{q}</button>
      ))}
    </div>
  );
}
