import { useState } from 'react';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  agent?: string;
  timestamp: Date;
}

export function useChat(userId: string) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [conversationId, setConversationId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [currentAgent, setCurrentAgent] = useState<string>('');
  const [reasoning, setReasoning] = useState<string>('');

  const sendMessage = async (content: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);
    setIsTyping(true);
    setReasoning('Processing...');

    try {
      const response = await fetch('http://localhost:5000/api/chat/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          conversationId: conversationId,
          message: content,
          userId,
        }),
      });

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();
      let assistantContent = '';
      let tempAgent = '';

      if (reader) {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          const chunk = decoder.decode(value);
          const lines = chunk.split('\n').filter(Boolean);

          for (const line of lines) {
            try {
              const data = JSON.parse(line);

              if (data.type === 'conversation_id') {
                setConversationId(data.data);
              } else if (data.type === 'agent') {
                tempAgent = data.data;
                setCurrentAgent(data.data);
              } else if (data.type === 'reasoning') {
                setReasoning(data.data);
              } else if (data.type === 'text') {
                assistantContent += data.data;
                setMessages((prev) => {
                  const lastMsg = prev[prev.length - 1];
                  if (lastMsg && lastMsg.role === 'assistant' && !lastMsg.id.startsWith('final-')) {
                    return [
                      ...prev.slice(0, -1),
                      { ...lastMsg, content: assistantContent },
                    ];
                  }
                  return [
                    ...prev,
                    {
                      id: 'temp-' + Date.now(),
                      role: 'assistant',
                      content: assistantContent,
                      agent: tempAgent,
                      timestamp: new Date(),
                    },
                  ];
                });
              } else if (data.type === 'done') {
                setIsTyping(false);
                setMessages((prev) => {
                  const lastMsg = prev[prev.length - 1];
                  if (lastMsg && lastMsg.role === 'assistant') {
                    return [
                      ...prev.slice(0, -1),
                      { ...lastMsg, id: 'final-' + Date.now() },
                    ];
                  }
                  return prev;
                });
              }
            } catch (e) {
              console.error('Parse error:', e);
            }
          }
        }
      }
    } catch (error) {
      console.error('Error sending message:', error);
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          role: 'assistant',
          content: 'Sorry, there was an error processing your request.',
          timestamp: new Date(),
        },
      ]);
    } finally {
      setIsLoading(false);
      setIsTyping(false);
      setReasoning('');
    }
  };

  return {
    messages,
    isLoading,
    isTyping,
    currentAgent,
    reasoning,
    sendMessage,
  };
}