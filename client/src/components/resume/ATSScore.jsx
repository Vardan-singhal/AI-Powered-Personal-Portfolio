export default function ATSScore({ score }) {
  const color =
    score >= 80
      ? 'text-yellow-300'
      : score >= 60
      ? 'text-amber-300'
      : 'text-red-400';

  const borderColor =
    score >= 80
      ? 'border-yellow-500/20'
      : score >= 60
      ? 'border-amber-500/20'
      : 'border-red-500/20';

  return (
    <div
      className={`
        rounded-2xl
        border
        ${borderColor}
        bg-neutral-950
        p-6
        text-center
        shadow-lg
      `}
    >
      <p className="text-sm uppercase tracking-wider text-zinc-500">
        ATS Score
      </p>

      <div className="my-4 flex justify-center">
        <div
          className="
            w-32
            h-32
            rounded-full
            border-4
            border-yellow-500/10
            flex
            items-center
            justify-center
          "
        >
          <span className={`text-5xl font-bold ${color}`}>
            {score}
          </span>
        </div>
      </div>

      <p className="text-xs text-zinc-500">
        out of 100
      </p>

      <div className="mt-4">
        {score >= 80 && (
          <span className="text-xs text-yellow-300">
            Excellent ATS Compatibility
          </span>
        )}

        {score >= 60 && score < 80 && (
          <span className="text-xs text-amber-300">
            Good ATS Compatibility
          </span>
        )}

        {score < 60 && (
          <span className="text-xs text-red-400">
            Needs Improvement
          </span>
        )}
      </div>
    </div>
  );
}