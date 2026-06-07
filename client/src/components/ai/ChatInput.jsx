import { useState } from 'react';

export default function ChatInput({ onSend, disabled }) {
  const [v, setV] = useState('');

  const submit = (e) => {
    e.preventDefault();

    if (!v.trim() || disabled) return;

    onSend(v.trim());
    setV('');
  };

  return (
    <form
      onSubmit={submit}
      className="
        p-3
        border-t
        border-yellow-500/10
        flex
        gap-2
        bg-black
      "
    >
      <input
        value={v}
        onChange={(e) => setV(e.target.value)}
        placeholder="Ask anything..."
        className="
          flex-1
          px-4
          py-2.5
          rounded-xl
          bg-neutral-900
          border
          border-yellow-500/15
          text-zinc-100
          placeholder:text-zinc-500
          outline-none
          transition
          focus:border-yellow-400
          focus:ring-1
          focus:ring-yellow-400/30
        "
      />

      <button
        type="submit"
        disabled={disabled}
        className="
          px-5
          py-2.5
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
        Send
      </button>
    </form>
  );
}