import React, { useState } from "react";
import Auth from "./components/Auth";
import MentorSwipe from "./components/MentorSwipe";
import Quiz from "./components/Quiz";
import Chat from "./components/Chat";

function App() {
  const [stage, setStage] = useState("auth");
  const [selectedMentor, setSelectedMentor] = useState(null);
  const [quizScore, setQuizScore] = useState(null);

  return (
    <div className="app-container">
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
          <h3>Mentor: {selectedMentor?.name}</h3>
          <p>Your Quiz Score: {quizScore}</p>
          <Chat />
        </div>
      )}
    </div>
  );
}

export default App;

