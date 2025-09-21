interface MessageBubbleProps {
    sender: "user" | "bot";
    text: string;
  }
  
  export default function MessageBubble({ sender, text }: MessageBubbleProps) {
    const isUser = sender === "user";
  
    return (
      <div className={`flex ${isUser ? "justify-end" : "justify-start"} mb-2`}>
        <div
          className={`px-4 py-2 rounded-lg max-w-xs break-words ${
            isUser
              ? "bg-blue-500 text-white rounded-br-none"
              : "bg-gray-200 text-gray-800 rounded-bl-none"
          }`}
        >
          {text}
        </div>
      </div>
    );
  }
  