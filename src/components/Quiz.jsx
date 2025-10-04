import React, { useState } from "react";

export default function Chat() {
  const mentorName = "Alice OSS"; // example mentor
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");

  const send = () => {
    if (!text.trim()) return;

    // Add your message
    setMessages([...messages, { sender: "me", text }]);
    setText("");

    // Auto-reply demo
    setTimeout(() => {
      setMessages(prev => [
        ...prev,
        { sender: "mentor", text: `Hi! Thanks for your message: "${text}"` },
      ]);
    }, 1000);
  };

  const chatBoxStyle = {
    border: "1px solid rgba(182,255,13,0.3)",
    borderRadius: "12px",
    background: "#0b0b0b",
    width: "100%",
    height: "300px",
    padding: "10px",
    overflowY: "auto",
    display: "flex",
    flexDirection: "column",
    gap: "8px",
  };

  const messageStyle = sender => ({
    alignSelf: sender === "me" ? "flex-end" : "flex-start",
    background: sender === "me" ? "#b6ff0d" : "#1a1a1a",
    color: sender === "me" ? "#000" : "#fff",
    padding: "8px 12px",
    borderRadius: "12px",
    maxWidth: "70%",
    border: sender === "me" ? "none" : "1px solid #b6ff0d",
  });

  return (
    <div style={{ fontFamily: "Poppins, sans-serif", color: "#fff", maxWidth: "500px", margin: "0 auto" }}>
      <h2 style={{ color: "#b6ff0d" }}>Chat with {mentorName}</h2>
      <div style={chatBoxStyle}>
        {messages.length === 0 && <p style={{ color: "#777" }}>No messages yet...</p>}
        {messages.map((m, i) => (
          <div key={i} style={messageStyle(m.sender)}>
            {m.text}
          </div>
        ))}
      </div>
      <div style={{ display: "flex", marginTop: "10px", gap: "5px" }}>
        <input
          style={{
            flex: 1,
            padding: "10px",
            borderRadius: "8px",
            border: "1px solid rgba(182,255,13,0.3)",
            background: "#1a1a1a",
            color: "#fff",
            outline: "none",
          }}
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type a message..."
        />
        <button
          style={{
            padding: "10px 18px",
            borderRadius: "8px",
            border: "none",
            background: "#b6ff0d",
            color: "#000",
            cursor: "pointer",
          }}
          onClick={send}
        >
          Send
        </button>
      </div>
    </div>
  );
}
