import React, { useState } from "react";

export default function Chat() {
  const [messages,setMessages]=useState([]);
  const [text,setText]=useState("");

  const send=()=>{
    setMessages([...messages,text]);
    setText("");
  };

  return (
    <div>
      <h2>Chat</h2>
      {messages.map((m,i)=><p key={i}>{m}</p>)}
      <input value={text} onChange={e=>setText(e.target.value)} />
      <button onClick={send}>Send</button>
    </div>
  );
}
