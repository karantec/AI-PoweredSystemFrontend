interface TypingIndicatorProps {
  reasoning?: string;
}

export default function TypingIndicator({ reasoning }: TypingIndicatorProps) {
  return (
    <div className="flex justify-start mb-6 animate-fadeIn">
      <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl px-5 py-4 shadow-xl border-2 border-gray-100 max-w-[85%]">
        <div className="flex items-center gap-3">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full animate-bounce"></div>
            <div
              className="w-3 h-3 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full animate-bounce"
              style={{ animationDelay: "0.1s" }}
            ></div>
            <div
              className="w-3 h-3 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full animate-bounce"
              style={{ animationDelay: "0.2s" }}
            ></div>
          </div>
          {reasoning && (
            <span className="text-sm text-gray-600 font-medium animate-pulse">
              {reasoning}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
