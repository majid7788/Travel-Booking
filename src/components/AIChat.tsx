import { useState } from "react";
import {
  Bot,
  Send,
  X,
  MessageCircle,
  User,
} from "lucide-react";

import { flights } from "../data/flights";

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
      text: "I can help you find flights, prices, departure times, hotels, and destinations. ✈️",
    },
  ]);

  const sendMessage = () => {
    const text = message.trim();

    if (!text) return;

    const userMessage: Message = {
      id: Date.now(),
      sender: "user",
      text,
    };

    setMessages((prev) => [...prev, userMessage]);
    setMessage("");

    setTimeout(() => {
      const aiMessage: Message = {
        id: Date.now() + 1,
        sender: "ai",
        text: getAIResponse(text),
      };

      setMessages((prev) => [...prev, aiMessage]);
    }, 500);
  };

  const getAIResponse = (text: string): string => {
    const lowerText = text.toLowerCase().trim();

    /* =========================
       GREETING
    ========================= */

    if (
      lowerText.includes("hello") ||
      lowerText.includes("hi") ||
      lowerText.includes("hey") ||
      lowerText.includes("اهلا") ||
      lowerText.includes("أهلا") ||
      lowerText.includes("مرحبا") ||
      lowerText.includes("السلام عليكم")
    ) {
      return "👋 Welcome to TravelBook! I can help you with flights, prices, schedules, hotels, and destinations. ✈️";
    }

    /* =========================
       DESTINATION DETECTION
    ========================= */

    let destination = "";

    if (
      lowerText.includes("dubai") ||
      lowerText.includes("دبي") ||
      lowerText.includes("الإمارات") ||
      lowerText.includes("الامارات") ||
      lowerText.includes("uae")
    ) {
      destination = "DXB";
    }

    if (
      lowerText.includes("istanbul") ||
      lowerText.includes("اسطنبول") ||
      lowerText.includes("إسطنبول") ||
      lowerText.includes("تركيا") ||
      lowerText.includes("turkey")
    ) {
      destination = "IST";
    }

    if (
      lowerText.includes("doha") ||
      lowerText.includes("الدوحة") ||
      lowerText.includes("قطر") ||
      lowerText.includes("qatar")
    ) {
      destination = "DOH";
    }

    if (
      lowerText.includes("cairo") ||
      lowerText.includes("القاهرة") ||
      lowerText.includes("مصر") ||
      lowerText.includes("egypt")
    ) {
      destination = "CAI";
    }

    /* =========================
       FLIGHT SEARCH
    ========================= */

    if (destination) {
      const destinationFlights = flights.filter(
        (flight) =>
          flight.to === destination ||
          flight.from === destination
      );

      if (destinationFlights.length === 0) {
        return "✈️ Sorry, I couldn't find any flights for this destination in our current flight database.";
      }

      const destinationNames: Record<string, string> = {
        DXB: "Dubai 🇦🇪",
        IST: "Istanbul 🇹🇷",
        DOH: "Doha 🇶🇦",
        CAI: "Cairo 🇪🇬",
      };

      const destinationName =
        destinationNames[destination] || destination;

      const sortedFlights = [...destinationFlights].sort(
        (a, b) => a.price - b.price
      );

      let response = `✈️ Flights available for ${destinationName}\n\n`;

      sortedFlights.forEach((flight) => {
        response +=
          `🛫 ${flight.airline} (${flight.flightNumber})\n` +
          `   ${flight.from} → ${flight.to}\n` +
          `   🕐 ${flight.departure} → ${flight.arrival}\n` +
          `   ⏱️ ${flight.duration}\n` +
          `   💰 $${flight.price}\n` +
          `   ${flight.stops === 0 ? "✅ Direct flight" : `🔄 ${flight.stops} stop(s)`}\n\n`;
      });

      response +=
        "Would you like me to help you choose the best flight? ✈️";

      return response;
    }

    /* =========================
       PRICE QUESTIONS
    ========================= */

    if (
      lowerText.includes("price") ||
      lowerText.includes("prices") ||
      lowerText.includes("cost") ||
      lowerText.includes("سعر") ||
      lowerText.includes("اسعار") ||
      lowerText.includes("أسعار") ||
      lowerText.includes("بكام") ||
      lowerText.includes("كام")
    ) {
      return "💰 Sure! Tell me the destination, for example:\n\n• Flights to Dubai\n• رحلات دبي بكام؟\n• Flights to Istanbul\n• رحلات تركيا\n\nI'll show you the available prices and schedules.";
    }

    /* =========================
       SCHEDULE QUESTIONS
    ========================= */

    if (
      lowerText.includes("time") ||
      lowerText.includes("schedule") ||
      lowerText.includes("departure") ||
      lowerText.includes("مواعيد") ||
      lowerText.includes("موعد") ||
      lowerText.includes("ميعاد") ||
      lowerText.includes("الساعة")
    ) {
      return "🕐 I can show you available departure and arrival times. Just tell me your destination, for example: \"مواعيد رحلات دبي\".";
    }

    /* =========================
       FLIGHT QUESTIONS
    ========================= */

    if (
      lowerText.includes("flight") ||
      lowerText.includes("flights") ||
      lowerText.includes("طيران") ||
      lowerText.includes("رحلة") ||
      lowerText.includes("رحلات")
    ) {
      return "✈️ I can help you find flights. Tell me the destination, such as Dubai, Istanbul, or Doha, and I'll show you the available airlines, prices, and schedules.";
    }

    /* =========================
       HOTEL QUESTIONS
    ========================= */

    if (
      lowerText.includes("hotel") ||
      lowerText.includes("hotels") ||
      lowerText.includes("فندق") ||
      lowerText.includes("فنادق")
    ) {
      return "🏨 Of course! I can help you find hotels. Go to the Hotels page to search by destination, rating, and price.";
    }

    /* =========================
       GENERAL DESTINATIONS
    ========================= */

    if (
      lowerText.includes("paris") ||
      lowerText.includes("باريس") ||
      lowerText.includes("france") ||
      lowerText.includes("فرنسا")
    ) {
      return "🇫🇷 Paris is a wonderful destination! Our current flight database doesn't contain a Paris flight yet, but you can explore available hotels and destinations on TravelBook.";
    }

    /* =========================
       HELP
    ========================= */

    if (
      lowerText.includes("help") ||
      lowerText.includes("مساعدة") ||
      lowerText.includes("ساعدني")
    ) {
      return (
        "🤖 I can help you with:\n\n" +
        "✈️ Flights and schedules\n" +
        "💰 Flight prices\n" +
        "🏨 Hotels\n" +
        "🌍 Destinations\n\n" +
        "Try asking: \"رحلات دبي بكام؟\""
      );
    }

    /* =========================
       DEFAULT
    ========================= */

    return (
      "🤖 I'm your TravelBook travel assistant.\n\n" +
      "You can ask me things like:\n\n" +
      "✈️ \"رحلات دبي بكام؟\"\n" +
      "🕐 \"مواعيد رحلات تركيا\"\n" +
      "💰 \"Flights to Doha price\"\n" +
      "🏨 \"I need a hotel\"\n\n" +
      "I'll show you the available information from TravelBook."
    );
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

                {item.sender === "ai" && (
                  <div className="ai-message-avatar">
                    <Bot size={16} />
                  </div>
                )}

                <div
                  className={
                    item.sender === "user"
                      ? "user-message-content"
                      : "ai-message-content"
                  }
                >
                  <p style={{ whiteSpace: "pre-line" }}>
                    {item.text}
                  </p>
                </div>

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