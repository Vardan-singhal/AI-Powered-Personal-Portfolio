export default function Loader({
  size = 'md',
  text,
}) {
  const sizes = {
    sm: 'w-5 h-5',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
  };

  return (
    <div className="flex flex-col items-center justify-center gap-3 p-8">
      <div
        className={`
          ${sizes[size]}
          border-[3px]
          border-yellow-500/20
          border-t-yellow-400
          rounded-full
          animate-spin
        `}
      />

      {text && (
        <p className="text-sm text-zinc-400">
          {text}
        </p>
      )}
    </div>
  );
}