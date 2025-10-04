import React, { useState } from "react";

const Quiz = ({ onComplete }) => {
  const [score, setScore] = useState(0);
  const [current, setCurrent] = useState(0);
  const [showScore, setShowScore] = useState(false);

  const questions = [
    {
      q: "Which language do you prefer?",
      options: ["JavaScript", "Python", "Java", "C++"],
      correct: 1, // let's assume Python is preferred for scoring
    },
    {
      q: "Have you contributed to open-source before?",
      options: ["Yes", "No"],
      correct: 0,
    },
    {
      q: "Which platform do you use most for coding challenges?",
      options: ["LeetCode", "Codeforces", "HackerRank", "Other"],
      correct: 0,
    },
    {
      q: "Do you enjoy working in a team?",
      options: ["Yes", "No"],
      correct: 0,
    },
    {
      q: "How many years of coding experience do you have?",
      options: ["<1", "1-2", "3-5", "5+"],
      correct: 3,
    },
  ];

  const handleAnswer = (index) => {
    // Increment score if correct
    if (index === questions[current].correct) setScore((prev) => prev + 1);

    if (current + 1 < questions.length) {
      setCurrent(current + 1);
    } else {
      setShowScore(true);
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

  const scoreStyle = {
    fontSize: "20px",
    color: "#c4ff00",
    marginBottom: "20px",
  };

  return (
    <div style={cardStyle}>
      {showScore ? (
        <>
          <h2 style={{ color: "#c4ff00", marginBottom: "15px" }}>Quiz Completed!</h2>
          <p style={scoreStyle}>
            Your Score: {score} / {questions.length}
          </p>
          <button
            style={buttonStyle}
            onClick={() => onComplete(score)}
          >
            Proceed to Mentors
          </button>
        </>
      ) : (
        <>
          <h2 style={{ color: "#c4ff00", marginBottom: "15px" }}>Quick Quiz</h2>
          <p style={{ color: "#aaa", marginBottom: "20px" }}>
            {questions[current].q}
          </p>
          {questions[current].options.map((opt, i) => (
            <button key={i} style={buttonStyle} onClick={() => handleAnswer(i)}>
              {opt}
            </button>
          ))}
        </>
      )}
    </div>
  );
};

export default Quiz;
