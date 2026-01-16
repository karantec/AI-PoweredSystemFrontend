import { useEffect, useRef } from "react";
import { useChat } from "../hooks/useChat";
import MessageList from "./MessageList";
import TypingIndicator from "./TypingIndicator";
import MessageInput from "./MessageInput";

interface ChatInterfaceProps {
  userId: string;
}

export default function ChatInterface({ userId }: ChatInterfaceProps) {
  const {
    messages,
    isLoading,
    isTyping,
    currentAgent,
    reasoning,
    sendMessage,
  } = useChat(userId);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const quickActions = [
    {
      icon: "📦",
      text: "Check Order Status",
      query: "What is the status of order ORD-001?",
    },
    { icon: "💰", text: "View Invoice", query: "Check invoice INV-001" },
    {
      icon: "🔄",
      text: "Refund Status",
      query: "What's the status of refund REF-001?",
    },
    { icon: "❓", text: "Get Help", query: "How do I reset my password?" },
  ];

  const agentColors: Record<
    string,
    { bg: string; text: string; badge: string }
  > = {
    ORDER: {
      bg: "from-blue-500 to-cyan-500",
      text: "text-blue-600",
      badge: "bg-blue-100",
    },
    BILLING: {
      bg: "from-green-500 to-emerald-500",
      text: "text-green-600",
      badge: "bg-green-100",
    },
    SUPPORT: {
      bg: "from-purple-500 to-pink-500",
      text: "text-purple-600",
      badge: "bg-purple-100",
    },
  };

  const currentAgentColor = currentAgent ? agentColors[currentAgent] : null;

  return (
    <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100">
      {/* Enhanced Header */}
      <div
        className={`bg-gradient-to-r ${
          currentAgentColor?.bg || "from-blue-600 to-indigo-600"
        } text-white p-6 transition-all duration-500`}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
              <span className="text-2xl">🤖</span>
            </div>
            <div>
              <h2 className="text-2xl font-bold">AI Support Assistant</h2>
              {currentAgent ? (
                <div className="flex items-center gap-2 mt-1 animate-fadeIn">
                  <div className="w-2 h-2 bg-green-300 rounded-full animate-pulse"></div>
                  <p className="text-white/90 text-sm font-medium">
                    {currentAgent} Agent Active
                  </p>
                </div>
              ) : (
                <p className="text-white/80 text-sm mt-1">
                  How can I help you today?
                </p>
              )}
            </div>
          </div>
          <div className="flex flex-col items-end gap-1">
            <div className="flex items-center gap-2 bg-white/20 px-3 py-1.5 rounded-full backdrop-blur-sm">
              <div className="w-2 h-2 bg-green-300 rounded-full animate-pulse"></div>
              <span className="text-xs font-medium">Online</span>
            </div>
            <span className="text-xs text-white/60">
              {messages.length} messages
            </span>
          </div>
        </div>
      </div>

      {/* Quick Actions - Only show when no messages */}
      {messages.length === 0 && (
        <div className="px-6 pt-6 pb-4 bg-gradient-to-b from-gray-50 to-white">
          <p className="text-sm text-gray-600 mb-3 font-medium">
            Quick Actions:
          </p>
          <div className="grid grid-cols-2 gap-2">
            {quickActions.map((action, index) => (
              <button
                key={index}
                onClick={() => sendMessage(action.query)}
                disabled={isLoading}
                className="flex items-center gap-2 p-3 bg-white border-2 border-gray-200 rounded-xl hover:border-blue-400 hover:shadow-md transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed group"
              >
                <span className="text-2xl group-hover:scale-110 transition-transform">
                  {action.icon}
                </span>
                <span className="text-sm font-medium text-gray-700 group-hover:text-blue-600 text-left">
                  {action.text}
                </span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Status Bar with Reasoning */}
      {reasoning && (
        <div className="px-6 py-3 bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-blue-100">
          <div className="flex items-center gap-2">
            <div className="flex gap-1">
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
              <div
                className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"
                style={{ animationDelay: "0.1s" }}
              ></div>
              <div
                className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"
                style={{ animationDelay: "0.2s" }}
              ></div>
            </div>
            <span className="text-sm text-blue-700 font-medium animate-pulse">
              {reasoning}
            </span>
          </div>
        </div>
      )}

      {/* Messages Container */}
      <div className="h-[500px] overflow-y-auto p-6 bg-gradient-to-b from-gray-50 to-white scroll-smooth">
        <MessageList messages={messages} />
        {isTyping && <TypingIndicator reasoning={reasoning} />}
        <div ref={messagesEndRef} />
      </div>

      {/* Enhanced Input */}
      <div className="border-t border-gray-200 p-4 bg-white">
        <MessageInput onSend={sendMessage} disabled={isLoading} />
        <div className="flex items-center justify-between mt-2 px-1">
          <p className="text-xs text-gray-500">
            💡 Try asking about orders, billing, or support
          </p>
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-400">Powered by Claude</span>
            <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
