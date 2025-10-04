import React, { useState } from "react";
import Auth from "./components/Auth";
import Quiz from "./components/Quiz";
import Chat from "./components/Chat";
import RoleSelection from "./components/RoleSelection";

// temporary swipe mock
function MentorSwipe({ onSelectMentor }) {
  const mentors = ["Alice", "Bob", "Charlie"];

  const styles = {
    container: {
      backgroundColor: "#0b0b0b",
      color: "#fff",
      fontFamily: "Poppins, sans-serif",
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
    },
    button: {
      margin: "10px",
      padding: "12px 20px",
      border: "none",
      borderRadius: "10px",
      backgroundColor: "#b6ff0d",
      color: "#000",
      fontWeight: "600",
      cursor: "pointer",
    },
  };

  return (
    <div style={styles.container}>
      <h2 style={{ color: "#b6ff0d" }}>Choose a Mentor</h2>
      {mentors.map((m, i) => (
        <button key={i} style={styles.button} onClick={() => onSelectMentor(m)}>
          {m}
        </button>
      ))}
    </div>
  );
}

export default function App() {
  const [stage, setStage] = useState("auth");
  const [user, setUser] = useState(null);
  const [mentor, setMentor] = useState(null);
  const [quizScore, setQuizScore] = useState(null);
  const [role, setRole] = useState(null); // new state for role

  return (
    <div>
      {stage === "auth" && (
        <Auth
          onLogin={(email) => {
            setUser(email);
            setStage("role"); // go to RoleSelection after auth
          }}
        />
      )}

      {stage === "role" && (
        <RoleSelection
          onSelectRole={(selectedRole) => {
            setRole(selectedRole);
            setStage("swipe"); // proceed to mentor swipe
          }}
        />
      )}

      {stage === "swipe" && (
        <MentorSwipe
          onSelectMentor={(m) => {
            setMentor(m);
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
        <Chat user={user} mentor={mentor} score={quizScore} role={role} />
      )}
    </div>
  );
}
