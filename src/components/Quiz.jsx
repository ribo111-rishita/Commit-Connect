import React, { useState } from "react";

export default function Quiz({ onComplete }) {
  const questions = [
    { q: "What command creates a git repository?", a: "git init" },
    { q: "What command makes a pull request?", a: "pull request" },
    { q: "What command is used to clone a repo?", a: "git clone" },
  ];

  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const submit = () => {
    let score = 0;
    questions.forEach((item, i) => {
      if (answers[i]?.toLowerCase().includes(item.a)) score++;
    });
    setSubmitted(true);
    onComplete(score); // ✅ sends score back to App.jsx
  };

  return (
    <div className="mentor-card">
      <h2>Open Source Quiz</h2>
      {questions.map((item, i) => (
        <div key={i} style={{ marginBottom: "15px" }}>
          <p><strong>Q{i + 1}:</strong> {item.q}</p>
          <input
            type="text"
            placeholder="Your answer..."
            onChange={(e) => setAnswers({ ...answers, [i]: e.target.value })}
          />
        </div>
      ))}
      <button onClick={submit}>Submit Quiz</button>
      {submitted && <p style={{ color: "#7b0f1d", fontWeight: "600" }}>Submitted!</p>}
    </div>
  );
}
