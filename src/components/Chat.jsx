import React, { useState } from "react";

export default function Chat() {
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");

  const chatBoxStyle = {
    border: "1px solid #ddd",
    borderRadius: "12px",
    background: "#fafafa",
    width: "100%",
    height: "250px",
    margin: "15px auto",
    padding: "10px",
    overflowY: "auto",
    textAlign: "left",
  };

  const messageStyle = {
    background: "#ffe4e1",
    padding: "8px 12px",
    margin: "6px 0",
    borderRadius: "10px",
    maxWidth: "70%",
  };

  const inputStyle = {
    padding: "10px",
    margin: "10px 5px 0 0",
    border: "1px solid #ccc",
    borderRadius: "8px",
    width: "70%",
  };

  const buttonStyle = {
    padding: "10px 18px",
    marginTop: "10px",
    border: "none",
    borderRadius: "8px",
    background: "#7b0f1d",
    color: "#fff",
    fontWeight: "600",
    cursor: "pointer",
  };

  const send = () => {
    if (text.trim() === "") return;
    setMessages([...messages, text]);
    setText("");
  };

  return (
    <div>
      <h2 style={{ color: "#7b0f1d" }}>Chat</h2>
      <div style={chatBoxStyle}>
        {messages.length === 0 && <p style={{ color: "#888" }}>No messages yet...</p>}
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
      <button style={buttonStyle} onClick={send}>Send</button>
    </div>
  );
}
