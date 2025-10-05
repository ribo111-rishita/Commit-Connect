import React, { useState } from "react";

const Challenge = ({ mentor, onComplete }) => {
  const questions = [
    { q: "What is Git used for?", options: ["Version control", "Database", "IDE", "Compiler"] },
    { q: "What does OSS stand for?", options: ["Open Source Software", "Official Software Source", "Online Source System", "Open System Service"] },
    { q: "Which platform hosts repositories?", options: ["GitHub", "Facebook", "Twitter", "Slack"] },
    { q: "Which license allows free use and modification?", options: ["MIT", "Proprietary", "GPL", "BSD"] },
    { q: "What command is used to commit changes?", options: ["git commit", "git push", "git pull", "git clone"] },
  ];

  const [current, setCurrent] = useState(0);

  const handleAnswer = () => {
    if (current + 1 < questions.length) setCurrent(current + 1);
    else onComplete(); // finish challenge
  };

  const cardStyle = {
    backgroundColor: "#111",
    color: "#fff",
    padding: "30px",
    borderRadius: "15px",
    boxShadow: "0 0 20px rgba(0,255,0,0.2)",
    maxWidth: "450px",
    margin: "50px auto",
    textAlign: "center",
    fontFamily: "'Poppins', sans-serif",
  };

  const buttonStyle = {
    margin: "10px 0",
    padding: "10px 15px",
    backgroundColor: "#c4ff00",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "600",
    width: "100%",
  };

  return (
    <div style={cardStyle}>
      <h2 style={{ color: "#c4ff00", marginBottom: "15px" }}>{mentor.name}'s Challenge</h2>
      <p style={{ color: "#aaa", marginBottom: "20px" }}>{questions[current].q}</p>
      {questions[current].options.map((opt, i) => (
        <button key={i} style={buttonStyle} onClick={handleAnswer}>
          {opt}
        </button>
      ))}
    </div>
  );
};

export default Challenge;
