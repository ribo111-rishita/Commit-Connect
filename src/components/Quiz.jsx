import React, { useState } from "react";

export default function Quiz({ onComplete }) {
  const questions = [
    { q: "What command creates a git repository?", a: "git init" },
    { q: "What command makes a pull request?", a: "pull request" },
    { q: "What command clones a repo?", a: "git clone" },
  ];

  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const inputStyle = {
    padding: "10px",
    margin: "8px 0",
    border: "1px solid rgba(182,255,13,0.3)",
    borderRadius: "8px",
    width: "90%",
    background: "#1a1a1a",
    color: "#fff",
    outline: "none",
  };

  const buttonStyle = {
    padding: "12px 20px",
    marginTop: "10px",
    border: "none",
    borderRadius: "8px",
    background: "#b6ff0d", // neon green
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

  const submit = () => {
    let score = 0;
    questions.forEach((item, i) => {
      if (answers[i]?.toLowerCase().includes(item.a)) score++;
    });
    setSubmitted(true);
    onComplete(score);
  };

  return (
    <div style={{ fontFamily: "Poppins, sans-serif", color: "#fff" }}>
      <h2 style={{ color: "#b6ff0d" }}>Open Source Quiz</h2>
      {questions.map((item, i) => (
        <div key={i}>
          <p>
            <strong>Q{i + 1}:</strong> {item.q}
          </p>
          <input
            style={inputStyle}
            onChange={(e) => setAnswers({ ...answers, [i]: e.target.value })}
          />
        </div>
      ))}
      <button
        style={{ ...buttonStyle, ...(hover ? buttonHover : {}) }}
        onClick={submit}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        Submit Quiz
      </button>
      {submitted && (
        <p style={{ color: "#b6ff0d", fontWeight: "600" }}>Submitted!</p>
      )}
    </div>
  );
}
