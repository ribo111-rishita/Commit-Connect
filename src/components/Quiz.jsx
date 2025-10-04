import React, { useState } from "react";

const Quiz = ({ onComplete }) => {
  const questions = [
    {
      q: "Which language do you prefer?",
      options: ["JavaScript", "Python", "Java", "C++"],
    },
    {
      q: "Have you contributed to open-source before?",
      options: ["Yes", "No"],
    },
    {
      q: "Which type of projects do you like?",
      options: ["Web", "Mobile", "AI/ML", "Game Development"],
    },
    {
      q: "Do you enjoy working in a team?",
      options: ["Yes", "No"],
    },
    {
      q: "How many years of coding experience do you have?",
      options: ["<1", "1-2", "3-5", "5+"],
    },
  ];

  const [current, setCurrent] = useState(0);

  const handleAnswer = () => {
    if (current  < questions.length) {
      setCurrent(current);
    } else {
      onComplete(); // proceed to Mentor Selection after last question
    }
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
      <h2 style={{ color: "#c4ff00", marginBottom: "15px" }}>Quick Quiz</h2>
      <p style={{ color: "#aaa", marginBottom: "20px" }}>
        {questions[current].q}
      </p>
      {questions[current].options.map((opt, i) => (
        <button key={i} style={buttonStyle} onClick={handleAnswer}>
          {opt}
        </button>
      ))}
    </div>
  );
};

export default Quiz;
