import React, { useState } from "react";

const Challenge = ({ mentor, onComplete }) => {
  const questions = [
    {
      q: "What is Git used for?",
      options: ["Version control", "Database", "IDE", "Compiler"],
      answer: "Version control",
    },
    {
      q: "What does OSS stand for?",
      options: [
        "Open Source Software",
        "Official Software Source",
        "Online Source System",
        "Open System Service",
      ],
      answer: "Open Source Software",
    },
    {
      q: "Which platform hosts repositories?",
      options: ["GitHub", "Facebook", "Twitter", "Slack"],
      answer: "GitHub",
    },
    {
      q: "Which license allows free use and modification?",
      options: ["MIT", "Proprietary", "GPL", "BSD"],
      answer: "MIT",
    },
    {
      q: "What command is used to commit changes?",
      options: ["git commit", "git push", "git pull", "git clone"],
      answer: "git commit",
    },
  ];

  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [completed, setCompleted] = useState(false);

  const handleAnswer = (option) => {
    setSelectedOption(option);

    if (option === questions[current].answer) {
      setScore(score + 1);
    }

    setTimeout(() => {
      setSelectedOption(null);
      if (current + 1 < questions.length) {
        setCurrent(current + 1);
      } else {
        setCompleted(true); // show summary
      }
    }, 700);
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
    position: "relative",
  };

  const buttonStyle = (option) => ({
    margin: "10px 0",
    padding: "10px 15px",
    backgroundColor:
      selectedOption === option
        ? option === questions[current].answer
          ? "#4CAF50"
          : "#f44336"
        : "#c4ff00",
    border: "none",
    borderRadius: "8px",
    cursor: selectedOption ? "not-allowed" : "pointer",
    fontWeight: "600",
    width: "100%",
    color: selectedOption === option ? "#fff" : "#000",
    transition: "all 0.3s ease",
  });

  const scoreStyle = {
    position: "absolute",
    top: "15px",
    right: "20px",
    backgroundColor: "#c4ff00",
    color: "#000",
    padding: "5px 10px",
    borderRadius: "8px",
    fontWeight: "700",
  };

  // ✅ Final summary screen
  if (completed) {
    return (
      <div style={cardStyle}>
        <h2 style={{ color: "#c4ff00" }}>🎉 Challenge Complete!</h2>
        <p style={{ margin: "15px 0", color: "#aaa" }}>
          You scored <strong>{score}</strong> out of{" "}
          <strong>{questions.length}</strong>
        </p>
        <button
          style={{
            backgroundColor: "#c4ff00",
            color: "#000",
            padding: "10px 20px",
            border: "none",
            borderRadius: "10px",
            fontWeight: "600",
            cursor: "pointer",
            marginTop: "20px",
          }}
          onClick={onComplete}
        >
          Close
        </button>
      </div>
    );
  }

  // ✅ Quiz questions
  return (
    <div style={cardStyle}>
      <div style={scoreStyle}>Score: {score}</div>
      <h2 style={{ color: "#c4ff00", marginBottom: "15px" }}>
        {mentor.name}'s Challenge
      </h2>
      <p style={{ marginBottom: "10px", color: "#aaa" }}>
        Question {current + 1} of {questions.length}
      </p>
      <p style={{ color: "#ddd", marginBottom: "20px" }}>
        {questions[current].q}
      </p>
      {questions[current].options.map((opt, i) => (
        <button
          key={i}
          style={buttonStyle(opt)}
          onClick={() => !selectedOption && handleAnswer(opt)}
        >
          {opt}
        </button>
      ))}
    </div>
  );
};

export default Challenge;
