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
    border: "1px solid #ccc",
    borderRadius: "6px",
    width: "90%",
  };

  const buttonStyle = {
    padding: "12px 20px",
    marginTop: "10px",
    border: "none",
    borderRadius: "8px",
    background: "#7b0f1d",
    color: "#fff",
    fontWeight: "600",
    cursor: "pointer",
  };

  const submit = () => {
    let score = 0;
    questions.forEach((item, i) => {
      if (answers[i]?.toLowerCase().includes(item.a)) score++;
    });
    setSubmitted(true);
    onComplete(score);
  };

  return (
    <div>
      <h2 style={{ color: "#7b0f1d" }}>Open Source Quiz</h2>
      {questions.map((item, i) => (
        <div key={i}>
          <p><strong>Q{i + 1}:</strong> {item.q}</p>
          <input
            style={inputStyle}
            onChange={(e) => setAnswers({ ...answers, [i]: e.target.value })}
          />
        </div>
      ))}
      <button style={buttonStyle} onClick={submit}>Submit Quiz</button>
      {submitted && <p style={{ color: "#7b0f1d", fontWeight: "600" }}>Submitted!</p>}
    </div>
  );
}
