import React, { useState } from "react";

const Chatbot = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { text: "How can I help you?", sender: "bot" }
  ]);
  const [input, setInput] = useState("");

  const toggleChat = () => setOpen(!open);

  const sendMessage = () => {
    if (!input.trim()) return;

    const userMessage = { text: input, sender: "user" };
    // ✅ Add only the user message here
    setMessages(prev => [...prev, userMessage]);

    // Fake AI response (without duplicating user message)
    setTimeout(() => {
      setMessages(prev => [
        ...prev,
        { text: "🤖 I'm here to help you!", sender: "bot" }
      ]);
    }, 600);

    setInput("");
  };

  return (
    <>
      {/* Floating Chat Button */}
      <button
        onClick={toggleChat}
        style={{
          position: "fixed",
          bottom: "20px",
          right: "20px",
          background: "#b6ff0e", // ✅ new green color
          color: "black",
          borderRadius: "50%",
          width: "60px",
          height: "60px",
          border: "none",
          fontSize: "28px",
          cursor: "pointer",
          boxShadow: "0 4px 6px rgba(0,0,0,0.2)",
          zIndex: 1000
        }}
      >
        💬
      </button>

      {/* Chatbox */}
      {open && (
        <div
          style={{
            position: "fixed",
            bottom: "90px",
            right: "20px",
            width: "300px",
            height: "400px",
            background: "white",
            borderRadius: "10px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
            zIndex: 1000
          }}
        >
          <div
            style={{
              background: "#b6ff0e", // ✅ new green color
              color: "black",
              padding: "10px",
              textAlign: "center",
              fontWeight: "bold"
            }}
          >
            AI Assistant
          </div>

          <div
            style={{
              flex: 1,
              padding: "10px",
              overflowY: "auto",
              fontSize: "14px"
            }}
          >
            {messages.map((msg, i) => (
              <div
                key={i}
                style={{
                  margin: "5px 0",
                  padding: "8px",
                  borderRadius: "6px",
                  maxWidth: "80%",
                  clear: "both",
                  background: msg.sender === "user" ? "#DCF8C6" : "#EEE",
                  float: msg.sender === "user" ? "right" : "left"
                }}
              >
                {msg.text}
              </div>
            ))}
          </div>

          <div style={{ display: "flex", borderTop: "1px solid #ccc" }}>
            <input
              type="text"
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === "Enter" && sendMessage()}
              placeholder="Type a message..."
              style={{
                flex: 1,
                border: "none",
                padding: "10px",
                outline: "none"
              }}
            />
            <button
              onClick={sendMessage}
              style={{
                background: "#b6ff0e", // ✅ new green color
                color: "black",
                border: "none",
                padding: "10px 15px",
                cursor: "pointer"
              }}
            >
              Send
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Chatbot;
