import { useState, FormEvent } from "react";

interface MessageInputProps {
  onSend: (message: string) => void;
  disabled: boolean;
}

export default function MessageInput({ onSend, disabled }: MessageInputProps) {
  const [message, setMessage] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (message.trim() && !disabled) {
      onSend(message);
      setMessage("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-3">
      <div className="flex-1 relative">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your message..."
          disabled={disabled}
          className="w-full px-5 py-4 pr-12 border-2 border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50 disabled:cursor-not-allowed transition-all duration-200 text-gray-700 placeholder-gray-400"
        />
        <div className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">
          {message.length > 0 && (
            <span className="text-xs">{message.length}</span>
          )}
        </div>
      </div>
      <button
        type="submit"
        disabled={disabled || !message.trim()}
        className="px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-2xl hover:from-blue-700 hover:to-indigo-700 disabled:from-gray-300 disabled:to-gray-300 disabled:cursor-not-allowed transition-all duration-200 font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95 flex items-center gap-2"
      >
        {disabled ? (
          <>
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            <span>Sending...</span>
          </>
        ) : (
          <>
            <span>Send</span>
            <span className="text-lg">✨</span>
          </>
        )}
      </button>
    </form>
  );
}
