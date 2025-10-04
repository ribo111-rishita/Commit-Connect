import React, { useState } from "react";

export default function Chat() {
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");

  const send = () => {
    if (text.trim() === "") return; // prevent empty messages
    setMessages([...messages, text]);
    setText("");
  };

  return (
    <div>
      <h2>Chat</h2>

      {/* Chat messages box */}
      <div className="chat-box">
        {messages.length === 0 && <p style={{ color: "#888" }}>No messages yet...</p>}
        {messages.map((m, i) => (
          <div key={i} className="message">{m}</div>
        ))}
      </div>

      {/* Input & Send button */}
      <input 
        value={text} 
        onChange={e => setText(e.target.value)} 
        placeholder="Type a message..."
      />
      <button onClick={send}>Send</button>
    </div>
  );
}
