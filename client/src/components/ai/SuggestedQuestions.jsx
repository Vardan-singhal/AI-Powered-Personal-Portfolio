const Q = [
  'What projects has the developer built?',
  'What AI experience do you have?',
  'What is your strongest skill?',
  'Tell me about your most impressive project.',
];

export default function SuggestedQuestions({ onPick }) {
  return (
    <div className="space-y-3">
      <p className="text-xs uppercase tracking-wider text-yellow-400/80">
        Try asking:
      </p>

      {Q.map((q) => (
        <button
          key={q}
          onClick={() => onPick(q)}
          className="
            w-full
            text-left
            text-sm
            p-3
            rounded-xl
            bg-neutral-900
            border
            border-yellow-500/10
            text-zinc-200
            hover:border-yellow-500/30
            hover:bg-neutral-800
            hover:text-yellow-300
            transition-all
            duration-200
          "
        >
          {q}
        </button>
      ))}
    </div>
  );
}