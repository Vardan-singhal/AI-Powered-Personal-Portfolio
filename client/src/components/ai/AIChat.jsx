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
      {/* Floating Button */}
      <button
        onClick={() => setOpen(true)}
        className="
          fixed
          bottom-6
          right-6
          z-40
          w-14
          h-14
          rounded-full
          bg-grad-hero
          shadow-lg
          flex
          items-center
          justify-center
          hover:scale-105
          transition
        "
      >
        <FiMessageSquare className="text-black" size={22} />
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
              flex
              flex-col
              w-[min(420px,calc(100vw-2rem))]
              h-[min(640px,calc(100vh-3rem))]
              bg-black/95
              backdrop-blur-xl
              border
              border-yellow-500/15
              rounded-2xl
              overflow-hidden
              shadow-2xl
            "
          >
            {/* Header */}
            <div className="p-4 border-b border-yellow-500/10 flex justify-between items-center">
              <div>
                <p className="font-semibold text-yellow-300">
                  AI Recruiter Assistant
                </p>

                <p className="text-xs text-zinc-400">
                  Ask me about projects, skills, experience
                </p>
              </div>

              <button
                onClick={() => setOpen(false)}
                className="text-zinc-400 hover:text-yellow-300 transition"
              >
                <FiX />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3 min-h-0">
              {messages.length === 0 && (
                <SuggestedQuestions onPick={ask} />
              )}

              {messages.map((m, i) => (
                <ChatMessage key={i} {...m} />
              ))}

              {loading && (
                <ChatMessage
                  role="assistant"
                  content="…"
                />
              )}
            </div>

            {/* Input */}
            <ChatInput
              onSend={ask}
              disabled={loading}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}