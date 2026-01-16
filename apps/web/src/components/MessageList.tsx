interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  agent?: string;
  timestamp: Date;
}

interface MessageListProps {
  messages: Message[];
}

export default function MessageList({ messages }: MessageListProps) {
  if (messages.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="relative inline-block">
          <div className="absolute inset-0 bg-blue-500 opacity-20 blur-3xl rounded-full animate-pulse"></div>
          <div className="relative text-7xl mb-6 animate-bounce">💬</div>
        </div>
        <h3 className="text-2xl font-bold text-gray-800 mb-3">
          Welcome to AI Support!
        </h3>
        <p className="text-gray-600 mb-8 max-w-md mx-auto">
          I'm your intelligent assistant powered by multi-agent AI. Ask me
          anything about orders, billing, or general support.
        </p>
        <div className="flex flex-wrap justify-center gap-2 max-w-lg mx-auto">
          <span className="px-4 py-2 bg-gradient-to-r from-blue-100 to-cyan-100 text-blue-700 rounded-full text-sm font-medium shadow-sm">
            📦 Order Tracking
          </span>
          <span className="px-4 py-2 bg-gradient-to-r from-green-100 to-emerald-100 text-green-700 rounded-full text-sm font-medium shadow-sm">
            💰 Billing Support
          </span>
          <span className="px-4 py-2 bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700 rounded-full text-sm font-medium shadow-sm">
            🛟 General Help
          </span>
          <span className="px-4 py-2 bg-gradient-to-r from-orange-100 to-red-100 text-orange-700 rounded-full text-sm font-medium shadow-sm">
            🔄 Refund Status
          </span>
        </div>
      </div>
    );
  }

  const agentIcons: Record<string, string> = {
    ORDER: "📦",
    BILLING: "💰",
    SUPPORT: "🛟",
  };

  const agentColors: Record<string, string> = {
    ORDER: "bg-blue-100 text-blue-700 border-blue-200",
    BILLING: "bg-green-100 text-green-700 border-green-200",
    SUPPORT: "bg-purple-100 text-purple-700 border-purple-200",
  };

  return (
    <div className="space-y-6">
      {messages.map((message, index) => (
        <div
          key={message.id}
          className={`flex ${
            message.role === "user" ? "justify-end" : "justify-start"
          } animate-fadeIn`}
          style={{ animationDelay: `${index * 0.1}s` }}
        >
          <div
            className={`max-w-[85%] rounded-2xl ${
              message.role === "user"
                ? "bg-gradient-to-br from-blue-600 to-indigo-600 text-white shadow-lg"
                : "bg-white text-gray-800 shadow-xl border-2 border-gray-100"
            }`}
          >
            {message.role === "assistant" && message.agent && (
              <div className="px-4 pt-3 pb-2">
                <div
                  className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold border-2 ${
                    agentColors[message.agent] ||
                    "bg-gray-100 text-gray-700 border-gray-200"
                  }`}
                >
                  <span className="text-base">
                    {agentIcons[message.agent] || "🤖"}
                  </span>
                  {message.agent} Agent
                  <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div>
                </div>
              </div>
            )}
            <div className="px-4 py-3">
              <p className="whitespace-pre-wrap leading-relaxed">
                {message.content}
              </p>
            </div>
            <div className="px-4 pb-3">
              <div
                className={`text-xs flex items-center gap-2 ${
                  message.role === "user" ? "text-blue-200" : "text-gray-400"
                }`}
              >
                <span>🕐</span>
                {message.timestamp.toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
