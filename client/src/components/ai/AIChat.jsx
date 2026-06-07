import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMessageSquare, FiX } from 'react-icons/fi';
import ChatInput from './ChatInput';
import ChatMessage from './ChatMessage';
import SuggestedQuestions from './SuggestedQuestions';
import useChat from '../../hooks/useChat';

export default function AIChat() {
  const [open, setOpen] = useState(false);
  const { messages, loading, ask } = useChat();
  return (
    <>
      <button onClick={() => setOpen(true)} className="fixed bottom-6 right-6 z-40 w-14 h-14 rounded-full bg-grad-hero shadow-lg flex items-center justify-center">
        <FiMessageSquare className="text-white" size={22} />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
  initial={{ opacity: 0, y: 40 }}
  animate={{ opacity: 1, y: 0 }}
  exit={{ opacity: 0, y: 40 }}
  className="
fixed
bottom-6
right-6
z-50
isolate
flex flex-col
w-[min(420px,calc(100vw-2rem))]
h-[min(640px,calc(100vh-3rem))]
bg-slate-950/95
backdrop-blur-xl
border border-white/10
rounded-2xl
overflow-hidden
shadow-2xl
"
>
            <div className="p-4 border-b border-white/10 flex justify-between items-center">
              <div>
                <p className="font-semibold">AI Recruiter Assistant</p>
                <p className="text-xs text-slate-400">Ask me about projects, skills, experience</p>
              </div>
              <button onClick={() => setOpen(false)}><FiX /></button>
            </div>
            <div className="flex-1 overflow-y-auto p-4 space-y-3 min-h-0">
              {messages.length === 0 && <SuggestedQuestions onPick={ask} />}
              {messages.map((m, i) => <ChatMessage key={i} {...m} />)}
              {loading && <ChatMessage role="assistant" content="…" />}
            </div>
            <ChatInput onSend={ask} disabled={loading} />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
