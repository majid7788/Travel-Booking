import { useState } from "react";
import {
  Bot,
  Send,
  X,
  MessageCircle,
  User,
} from "lucide-react";

type Message = {
  id: number;
  sender: "ai" | "user";
  text: string;
};

function AIChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");

  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      sender: "ai",
      text: "👋 Hello! I'm TravelBook AI.",
    },
    {
      id: 2,
      sender: "ai",
      text: "How can I help you with your trip today?",
    },
  ]);

  const sendMessage = () => {
    const text = message.trim();

    if (!text) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now(),
      sender: "user",
      text,
    };

    setMessages((prev) => [...prev, userMessage]);

    // Clear input
    setMessage("");

    // Automatic AI response
    setTimeout(() => {
      const aiMessage: Message = {
        id: Date.now() + 1,
        sender: "ai",
        text: getAIResponse(text),
      };

      setMessages((prev) => [...prev, aiMessage]);
    }, 700);
  };

  const getAIResponse = (text: string) => {
    const lowerText = text.toLowerCase();

    if (
      lowerText.includes("hello") ||
      lowerText.includes("hi") ||
      lowerText.includes("hey") ||
      lowerText.includes("اهلا") ||
      lowerText.includes("مرحبا")
    ) {
      return "👋 Hello! How can I help you with flights, hotels, or your trip?";
    }

    if (
      lowerText.includes("flight") ||
      lowerText.includes("flights") ||
      lowerText.includes("طيران") ||
      lowerText.includes("رحلة")
    ) {
      return "✈️ Sure! I can help you find flights. Tell me your departure city and destination.";
    }

    if (
      lowerText.includes("hotel") ||
      lowerText.includes("hotels") ||
      lowerText.includes("فندق") ||
      lowerText.includes("فنادق")
    ) {
      return "🏨 Of course! I can help you find a hotel. Tell me which city you want to stay in.";
    }

    if (
      lowerText.includes("paris") ||
      lowerText.includes("باريس")
    ) {
      return "🇫🇷 Paris is a great choice! You can explore our available flights and hotels in Paris.";
    }

    if (
      lowerText.includes("dubai") ||
      lowerText.includes("دبي")
    ) {
      return "🇦🇪 Dubai is an amazing destination! I can help you find flights and hotels there.";
    }

    if (
      lowerText.includes("istanbul") ||
      lowerText.includes("اسطنبول")
    ) {
      return "🇹🇷 Istanbul is a wonderful destination! Would you like to search for a flight or hotel?";
    }

    if (
      lowerText.includes("price") ||
      lowerText.includes("prices") ||
      lowerText.includes("سعر") ||
      lowerText.includes("اسعار")
    ) {
      return "💰 I can help you find options based on your budget. Tell me your destination and approximate budget.";
    }

    return "🤖 Thanks for your message! I can currently help you with flights, hotels, destinations, and prices. What would you like to search for?";
  };

  return (
    <>
      {/* Chat Window */}
      {isOpen && (
        <div className="ai-chat-window">

          {/* Header */}
          <div className="ai-chat-header">
            <div className="ai-chat-title">
              <div className="ai-chat-avatar">
                <Bot size={20} />
              </div>

              <div>
                <strong>TravelBook AI</strong>
                <span>Online • Travel Assistant</span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="ai-chat-close"
              aria-label="Close chat"
            >
              <X size={20} />
            </button>
          </div>

          {/* Messages */}
          <div className="ai-chat-messages">

            {messages.map((item) => (
              <div
                key={item.id}
                className={
                  item.sender === "user"
                    ? "user-message"
                    : "ai-message"
                }
              >

                {/* AI Avatar */}
                {item.sender === "ai" && (
                  <div className="ai-message-avatar">
                    <Bot size={16} />
                  </div>
                )}

                {/* Message */}
                <div
                  className={
                    item.sender === "user"
                      ? "user-message-content"
                      : "ai-message-content"
                  }
                >
                  <p>{item.text}</p>
                </div>

                {/* User Avatar */}
                {item.sender === "user" && (
                  <div className="user-message-avatar">
                    <User size={16} />
                  </div>
                )}

              </div>
            ))}

          </div>

          {/* Input */}
          <div className="ai-chat-input">

            <input
              type="text"
              placeholder="Ask about flights, hotels..."
              value={message}
              onChange={(event) =>
                setMessage(event.target.value)
              }
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  sendMessage();
                }
              }}
            />

            <button
              type="button"
              onClick={sendMessage}
              disabled={!message.trim()}
              aria-label="Send message"
            >
              <Send size={18} />
            </button>

          </div>
        </div>
      )}

      {/* Floating Button */}
      {!isOpen && (
        <button
          type="button"
          className="ai-chat-button"
          onClick={() => setIsOpen(true)}
          aria-label="Open AI assistant"
        >
          <MessageCircle size={25} />
        </button>
      )}
    </>
  );
}

export default AIChat;