import { createContext, useContext, useState } from 'react';
const ChatContext = createContext(null);
export function ChatProvider({ children }) {
  const [messages, setMessages] = useState([]);
  const [sessionId, setSessionId] = useState(null);
  return <ChatContext.Provider value={{ messages, setMessages, sessionId, setSessionId }}>{children}</ChatContext.Provider>;
}
export const useChatContext = () => useContext(ChatContext);
