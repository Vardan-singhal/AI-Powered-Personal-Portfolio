import { useState } from 'react';
export default function ChatInput({ onSend, disabled }) {
  const [v, setV] = useState('');
  const submit = (e) => { e.preventDefault(); if (!v.trim() || disabled) return; onSend(v.trim()); setV(''); };
  return (
    <form onSubmit={submit} className="p-3 border-t border-white/10 flex gap-2">
      <input value={v} onChange={(e) => setV(e.target.value)} placeholder="Ask anything…" className="input" />
      <button className="btn-primary" disabled={disabled}>Send</button>
    </form>
  );
}
