import { useState } from "react";

import ChatInterface from "./components/ChatInterface";

function App() {
  const [userId] = useState("user-123");

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <header className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-800 mb-2">
              AI Customer Support
            </h1>
            <p className="text-gray-600">
              Multi-agent system powered by CodingDitto
            </p>
          </header>

          <ChatInterface userId={userId} />
        </div>
      </div>
    </div>
  );
}

export default App;
