import React, { useState } from "react";
import Auth from "./components/Auth";
import MentorSwipe from "./components/MentorSwipe";
import Quiz from "./components/Quiz";
import Chat from "./components/Chat";

function App() {
  const [stage, setStage] = useState("auth");
  const [selectedMentor, setSelectedMentor] = useState(null);
  const [quizScore, setQuizScore] = useState(null);

  const containerStyle = {
    background: "linear-gradient(135deg, #7b0f1d, #3d0a0a)",
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontFamily: "'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
  };

  const cardStyle = {
    background: "#fff",
    padding: "30px",
    borderRadius: "18px",
    boxShadow: "0 10px 30px rgba(0,0,0,0.25)",
    width: "400px",
    textAlign: "center",
  };

  return (
    <div style={containerStyle}>
      <div style={cardStyle}>
        {stage === "auth" && <Auth onAuth={() => setStage("swipe")} />}

        {stage === "swipe" && (
          <MentorSwipe
            onSwipeRight={(m) => {
              setSelectedMentor(m);
              setStage("quiz");
            }}
          />
        )}

        {stage === "quiz" && (
          <Quiz
            onComplete={(score) => {
              setQuizScore(score);
              setStage("chat");
            }}
          />
        )}

        {stage === "chat" && (
          <div>
            <h3 style={{ color: "#7b0f1d" }}>Mentor: {selectedMentor?.name}</h3>
            <p style={{ fontWeight: "600" }}>Your Quiz Score: {quizScore}</p>
            <Chat />
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
