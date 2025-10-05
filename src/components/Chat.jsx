import React, { useState } from "react";

const Chat = ({ mentor }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;
    setMessages((prev) => [...prev, { sender: "You", text: input }]);
    setInput("");

    // Mock mentor reply (you can replace with backend later)
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { sender: mentor.name, text: "Hey there! Once your profile is shortlisted,the mentor will revert back.Thank you!" },
      ]);
    }, 800);
  };

  return (
    <div
      style={{
        background: "#111",
        border: "1px solid #333",
        borderRadius: "10px",
        padding: "15px",
        color: "#fff",
        maxHeight: "300px",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <h4 style={{ marginBottom: "10px", color: "#c4ff00" }}>
        Chat with {mentor.name}
      </h4>

      {/* Chat messages */}
      <div
        style={{
          flexGrow: 1,
          overflowY: "auto",
          marginBottom: "10px",
          padding: "5px",
        }}
      >
        {messages.length === 0 ? (
          <p style={{ color: "#888" }}>Start the conversation...</p>
        ) : (
          messages.map((msg, i) => (
            <div
              key={i}
              style={{
                marginBottom: "8px",
                textAlign: msg.sender === "You" ? "right" : "left",
              }}
            >
              <span
                style={{
                  display: "inline-block",
                  padding: "8px 12px",
                  borderRadius: "8px",
                  background:
                    msg.sender === "You" ? "#c4ff00" : "rgba(255,255,255,0.1)",
                  color: msg.sender === "You" ? "#000" : "#fff",
                }}
              >
                {msg.text}
              </span>
            </div>
          ))
        )}
      </div>

      {/* Input box */}
      <div style={{ display: "flex", gap: "5px" }}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
          style={{
            flex: 1,
            padding: "8px",
            borderRadius: "6px",
            border: "1px solid #444",
            background: "#0a0a0a",
            color: "white",
          }}
        />
        <button
          onClick={handleSend}
          style={{
            background: "#c4ff00",
            border: "none",
            padding: "8px 15px",
            borderRadius: "6px",
            fontWeight: "600",
            cursor: "pointer",
          }}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;
