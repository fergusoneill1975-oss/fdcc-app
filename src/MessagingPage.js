import { useState } from "react";

export default function MessagingPage() {
  const [messages, setMessages] = useState([
    { sender: "Fergus", text: "Hi Fexco, we’ve seen a dip in transaction volumes in the US this week." },
    { sender: "Fexco", text: "Hi Fergus — we noticed that too. There seems to be lower activity in Texas and California." },
    { sender: "Fergus", text: "Can we increase margin flexibility for those regions?" },
    { sender: "Fexco", text: "Yes, we’ll push through a configuration change today and monitor performance." },
  ]);
  const [newMessage, setNewMessage] = useState("");

  const handleSend = () => {
    if (!newMessage.trim()) return;
    setMessages([...messages, { sender: "Fergus", text: newMessage }]);
    setNewMessage("");
  };

  return (
    <div className="h-screen flex flex-col bg-gray-100">
      <header className="bg-red-600 text-white px-6 py-4 shadow">
        <h1 className="text-xl font-semibold">Messaging with Fexco</h1>
      </header>

      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`max-w-xl px-4 py-2 rounded-lg shadow-sm ${
              msg.sender === "Fergus"
                ? "ml-auto bg-red-500 text-white"
                : "mr-auto bg-white text-gray-900"
            }`}
          >
            <p className="text-sm">{msg.text}</p>
            <p className="text-xs mt-1 text-right opacity-60">{msg.sender}</p>
          </div>
        ))}
      </div>

      <div className="bg-white px-4 py-3 flex gap-2 border-t">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type your message..."
          className="flex-1 px-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-red-500"
        />
        <button
          onClick={handleSend}
          className="bg-red-600 hover:bg-red-700 text-white font-semibold px-6 py-2 rounded-full transition"
        >
          Send
        </button>
      </div>
    </div>
  );
}
