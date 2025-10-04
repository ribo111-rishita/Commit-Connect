import React, { useState } from "react";
import Navbar from "./components/Navbar";
import Auth from "./components/Auth";
import RoleSelection from "./components/RoleSelection";
import Profile from "./components/Profile";
import Quiz from "./components/Quiz";
import MentorSwipe from "./components/MentorSwipe";
import Chatbot from "./components/Chatbot";

export default function App() {
  const [stage, setStage] = useState("auth");
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);
  const [profileData, setProfileData] = useState(null);
  const [quizScore, setQuizScore] = useState(null);
  const [selectedMentor, setSelectedMentor] = useState(null);

  // Optional: Add top padding if navbar is fixed
  const mainContainerStyle = {
    paddingTop: "80px", // adjust if navbar height changes
    minHeight: "100vh",
    backgroundColor: "#0a0a0a",
    color: "#fff",
  };

  return (
    <div>
      {/* Navbar always visible */}
      <Navbar />

      {/* Main content */}
      <div style={mainContainerStyle}>
        {stage === "auth" && (
          <Auth
            onLogin={(email) => {
              setUser(email);
              setStage("role");
            }}
          />
        )}

        {stage === "role" && (
          <RoleSelection
            onSelectRole={(selectedRole) => {
              setRole(selectedRole);
              setStage("profile");
            }}
          />
        )}

        {stage === "profile" && role === "student" && (
          <Profile
            userEmail={user}
            onSubmitProfile={(data) => {
              setProfileData(data);
              setStage("quiz"); // move directly to quiz after profile
            }}
          />
        )}

        {stage === "quiz" && (
          <Quiz
            onComplete={(score) => {
              setQuizScore(score);
              setStage("swipe"); // after quiz, go to MentorSwipe
            }}
          />
        )}

        {stage === "swipe" && (
          <MentorSwipe
            mentors={[
              { name: "Alice", bio: "Frontend expert" },
              { name: "Bob", bio: "Backend guru" },
              { name: "Charlie", bio: "Fullstack wizard" },
            ]}
            onSelectMentor={(mentor) => {
              setSelectedMentor(mentor);
              alert(`You selected ${mentor.name}!`);
            }}
          />
        )}
      </div>

      {/* Chatbot always visible */}
      <Chatbot />
    </div>
  );
}
