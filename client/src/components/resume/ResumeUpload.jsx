import { useState } from 'react';

export default function ResumeUpload({
  onUpload,
  loading,
}) {
  const [file, setFile] = useState(null);

  return (
    <div
      className="
        rounded-2xl
        border
        border-yellow-500/15
        bg-neutral-950
        p-6
        shadow-lg
      "
    >
      <label
        className="
          block
          mb-4
          text-sm
          font-medium
          text-yellow-300
        "
      >
        Upload Resume (PDF)
      </label>

      <input
        type="file"
        accept="application/pdf"
        onChange={(e) => setFile(e.target.files?.[0] || null)}
        className="
          block
          w-full
          text-sm
          text-zinc-400
          file:mr-4
          file:px-4
          file:py-2
          file:rounded-xl
          file:border-0
          file:bg-yellow-500/10
          file:text-yellow-300
          file:cursor-pointer
          hover:file:bg-yellow-500/20
        "
      />

      {file && (
        <div
          className="
            mt-4
            rounded-xl
            border
            border-yellow-500/10
            bg-black
            px-4
            py-3
          "
        >
          <p className="text-sm text-zinc-300">
            {file.name}
          </p>

          <p className="text-xs text-zinc-500 mt-1">
            {(file.size / 1024 / 1024).toFixed(2)} MB
          </p>
        </div>
      )}

      <button
        disabled={!file || loading}
        onClick={() => onUpload(file)}
        className="
          mt-5
          px-6
          py-3
          rounded-xl
          bg-brand-600
          text-black
          font-semibold
          transition
          hover:scale-105
          disabled:opacity-50
          disabled:cursor-not-allowed
          disabled:hover:scale-100
        "
      >
        {loading
          ? 'Analyzing Resume...'
          : 'Analyze Resume'}
      </button>
    </div>
  );
}