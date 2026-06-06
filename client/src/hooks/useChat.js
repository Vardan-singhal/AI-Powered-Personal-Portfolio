import { useState } from 'react';
import { sendChat } from '../services/aiService';
import { useChatContext } from '../context/ChatContext';

export default function useChat() {
  const {
    messages,
    setMessages,
    sessionId,
    setSessionId,
  } = useChatContext();

  const [loading, setLoading] = useState(false);

  const ask = async (question) => {
    setMessages((m) => [
      ...m,
      {
        role: 'user',
        content: question,
      },
    ]);

    setLoading(true);

    try {
      const res = await sendChat(sessionId, question);

      if (res.sessionId && !sessionId) {
        setSessionId(res.sessionId);
      }

      // Project response
      if (res.type === 'projects') {
        setMessages((m) => [
          ...m,
          {
            role: 'assistant',
            type: 'projects',
            projects: res.projects,
          },
        ]);

        return;
      }

      // Normal AI response
      setMessages((m) => [
        ...m,
        {
          role: 'assistant',
          content: res.answer,
          sources: res.sources,
        },
      ]);
    } catch (err) {
      setMessages((m) => [
        ...m,
        {
          role: 'assistant',
          content: 'Error reaching AI service.',
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return {
    messages,
    loading,
    ask,
  };
}