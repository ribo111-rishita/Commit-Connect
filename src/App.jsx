import React, { useState, useEffect } from "react";
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

  // ✅ Load saved login info when app starts
  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    const savedRole = localStorage.getItem("role");

    if (savedUser) {
      setUser(savedUser);
      setRole(savedRole || null);

      // restore last stage depending on what’s saved
      if (savedRole && !profileData) {
        setStage("profile");
      } else if (savedRole && profileData && !quizScore) {
        setStage("quiz");
      } else if (savedRole && quizScore) {
        setStage("swipe");
      } else {
        setStage("role");
      }
    }
  }, [profileData, quizScore]);

  // ✅ Save login info
  const handleLogin = (email) => {
    setUser(email);
    localStorage.setItem("user", email);
    setStage("role");
  };

  const handleRoleSelect = (selectedRole) => {
    setRole(selectedRole);
    localStorage.setItem("role", selectedRole);
    setStage("profile");
  };

  // ✅ Logout clears storage
  const handleLogout = () => {
    setUser(null);
    setRole(null);
    setProfileData(null);
    setQuizScore(null);
    setSelectedMentor(null);
    localStorage.clear();
    setStage("auth");
  };

  const mainContainerStyle = {
    paddingTop: "80px", // adjust if navbar height changes
    minHeight: "100vh",
    backgroundColor: "#0a0a0a",
    color: "#fff",
  };

  return (
    <div>
      {/* Navbar always visible, pass logout & user */}
      <Navbar onLogout={handleLogout} user={user} />

      {/* Main content */}
      <div style={mainContainerStyle}>
        {stage === "auth" && <Auth onLogin={handleLogin} />}

        {stage === "role" && <RoleSelection onSelectRole={handleRoleSelect} />}

        {stage === "profile" && role === "student" && (
          <Profile
            userEmail={user}
            onSubmitProfile={(data) => {
              setProfileData(data);
              setStage("quiz");
            }}
          />
        )}

        {stage === "quiz" && (
          <Quiz
            onComplete={(score) => {
              setQuizScore(score);
              setStage("swipe");
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
