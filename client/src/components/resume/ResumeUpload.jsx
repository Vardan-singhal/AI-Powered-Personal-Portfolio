import { useState } from 'react';
export default function ResumeUpload({ onUpload, loading }) {
  const [file, setFile] = useState(null);
  return (
    <div className="card">
      <input type="file" accept="application/pdf" onChange={(e) => setFile(e.target.files[0])} className="block mb-4 text-sm" />
      <button disabled={!file || loading} onClick={() => onUpload(file)} className="btn-primary disabled:opacity-50">
        {loading ? 'Analyzing…' : 'Analyze Resume'}
      </button>
    </div>
  );
}
