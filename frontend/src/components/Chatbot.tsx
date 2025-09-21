import { useState, useEffect, useRef } from "react";
import MessageBubble from "./MessageBubble";

interface Message {
  sender: "user" | "bot";
  text: string;
}

export default function Chatbot() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom whenever messages update
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = () => {
    if (!input.trim()) return;

    // Add user message
    const userMsg: Message = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMsg]);

    // Fake bot reply
    setTimeout(() => {
      const botMsg: Message = {
        sender: "bot",
        text: `You said: "${input}". Let's talk nutrition!`,
      };
      setMessages((prev) => [...prev, botMsg]);
    }, 600);

    setInput("");
  };

  return (
    <div className="flex flex-col h-full">
      {/* Chat window */}
      <div className="flex-grow overflow-y-auto border rounded p-3 bg-gray-50">
        {messages.map((msg, i) => (
          <MessageBubble key={i} sender={msg.sender} text={msg.text} />
        ))}
        <div ref={chatEndRef} />
      </div>

      {/* Input area */}
      <div className="flex mt-2">
        <input
          type="text"
          className="flex-grow border rounded-l px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
          placeholder="Ask me about your diet..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />
        <button
          onClick={sendMessage}
          className="bg-blue-500 text-white px-4 rounded-r hover:bg-blue-600"
        >
          Send
        </button>
      </div>
    </div>
  );
}
