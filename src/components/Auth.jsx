

import React, { useState } from "react";

export default function Auth({ onAuth }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const fakeLogin = () => {
    console.log("Logged in as:", email);
    onAuth(); // just move forward in flow
  };

  return (
    <div>
      <h2>Login / Signup (Mocked)</h2>
      <input 
        placeholder="email" 
        value={email} 
        onChange={e => setEmail(e.target.value)} 
      />
      <input 
        type="password" 
        placeholder="password" 
        value={password} 
        onChange={e => setPassword(e.target.value)} 
      />
      <button onClick={fakeLogin}>Continue</button>
    </div>
  );
}
