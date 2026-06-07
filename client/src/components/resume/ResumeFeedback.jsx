export default function ResumeFeedback({ review }) {
  if (!review) return null;

  return (
    <div className="grid md:grid-cols-2 gap-5">
      <Box
        title="Strengths"
        items={review.strengths}
        color="text-emerald-400"
        border="border-emerald-500/20"
      />

      <Box
        title="Weaknesses"
        items={review.weaknesses}
        color="text-red-400"
        border="border-red-500/20"
      />

      <Box
        title="Missing Keywords"
        items={review.missingKeywords}
        color="text-amber-400"
        border="border-amber-500/20"
      />

      <Box
        title="Suggestions"
        items={review.suggestions}
        color="text-yellow-300"
        border="border-yellow-500/20"
      />
    </div>
  );
}

function Box({
  title,
  items = [],
  color,
  border,
}) {
  return (
    <div
      className={`
        rounded-2xl
        border
        ${border}
        bg-neutral-950
        p-5
        shadow-lg
      `}
    >
      <h3 className={`font-semibold text-lg mb-4 ${color}`}>
        {title}
      </h3>

      {items?.length > 0 ? (
        <ul className="space-y-3 text-sm text-zinc-300">
          {items.map((item, index) => (
            <li
              key={index}
              className="flex gap-2 leading-relaxed"
            >
              <span className={color}>•</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-sm text-zinc-500">
          No items found.
        </p>
      )}
    </div>
  );
}