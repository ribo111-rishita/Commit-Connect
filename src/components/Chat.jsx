import React, { useState } from "react";

export default function Chat() {
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");

  const chatBoxStyle = {
    border: "1px solid rgba(182,255,13,0.3)",
    borderRadius: "12px",
    background: "#0b0b0b", // dark background
    width: "100%",
    height: "250px",
    margin: "15px auto",
    padding: "10px",
    overflowY: "auto",
    textAlign: "left",
    color: "#fff",
  };

  const messageStyle = {
    background: "#1a1a1a", // darker gray for bubbles
    padding: "8px 12px",
    margin: "6px 0",
    borderRadius: "10px",
    maxWidth: "70%",
    border: "1px solid #b6ff0d", // neon green border
    color: "#fff",
    fontSize: "0.95rem",
  };

  const inputStyle = {
    padding: "10px",
    margin: "10px 5px 0 0",
    border: "1px solid rgba(182,255,13,0.3)",
    borderRadius: "8px",
    width: "70%",
    background: "#1a1a1a",
    color: "#fff",
    outline: "none",
  };

  const buttonStyle = {
    padding: "10px 18px",
    marginTop: "10px",
    border: "none",
    borderRadius: "8px",
    background: "#b6ff0d", // neon green button
    color: "#000",
    fontWeight: "600",
    cursor: "pointer",
    transition: "all 0.3s ease",
  };

  const buttonHover = {
    background: "#d0ff4a",
    boxShadow: "0 0 10px rgba(182,255,13,0.6)",
  };

  const [hover, setHover] = useState(false);

  const send = () => {
    if (text.trim() === "") return;
    setMessages([...messages, text]);
    setText("");
  };

  return (
    <div style={{ fontFamily: "Poppins, sans-serif", color: "#fff" }}>
      <h2 style={{ color: "#b6ff0d" }}>Chat</h2>
      <div style={chatBoxStyle}>
        {messages.length === 0 && <p style={{ color: "#777" }}>No messages yet...</p>}
        {messages.map((m, i) => (
          <div key={i} style={messageStyle}>{m}</div>
        ))}
      </div>
      <input
        style={inputStyle}
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type a message..."
      />
      <button
        style={{ ...buttonStyle, ...(hover ? buttonHover : {}) }}
        onClick={send}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        Send
      </button>
    </div>
  );
}
