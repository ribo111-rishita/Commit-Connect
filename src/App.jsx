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
  const [isEditingProfile, setIsEditingProfile] = useState(false); // ✅ new state

  // ✅ Load saved login info when app starts
  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    const savedRole = localStorage.getItem("role");
    const savedProfile = localStorage.getItem("profileData");
    const savedQuiz = localStorage.getItem("quizScore");

    if (savedUser) {
      setUser(savedUser);
      setRole(savedRole || null);
      setProfileData(savedProfile ? JSON.parse(savedProfile) : null);
      setQuizScore(savedQuiz ? Number(savedQuiz) : null);

      // restore last stage depending on what’s saved
      if (savedRole && !savedProfile) {
        setStage("profile");
      } else if (savedRole && savedProfile && !savedQuiz) {
        setStage("quiz");
      } else if (savedRole && savedQuiz) {
        setStage("swipe");
      } else {
        setStage("role");
      }
    } else {
      setStage("auth");
    }
  }, []);

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

  // ✅ Save or update profile
  const handleProfileSubmit = (data) => {
    setProfileData(data);
    localStorage.setItem("profileData", JSON.stringify(data));

    if (isEditingProfile) {
      // just update and stay in swipe (or quiz if not done yet)
      setIsEditingProfile(false);
      if (quizScore) {
        setStage("swipe");
      } else {
        setStage("quiz");
      }
    } else {
      setStage("quiz");
    }
  };

  const handleQuizComplete = (score) => {
    setQuizScore(score);
    localStorage.setItem("quizScore", score);
    setStage("swipe");
  };

  // ✅ Logout clears storage
  const handleLogout = () => {
    setUser(null);
    setRole(null);
    setProfileData(null);
    setQuizScore(null);
    setSelectedMentor(null);
    setIsEditingProfile(false);
    localStorage.clear();
    setStage("auth");
  };

  // ✅ Edit profile goes back to Profile page with saved data
  const handleEditProfile = () => {
    setIsEditingProfile(true);
    setStage("profile");
  };

  const mainContainerStyle = {
    paddingTop: "80px", // adjust if navbar height changes
    minHeight: "100vh",
    backgroundColor: "#0a0a0a",
    color: "#fff",
  };

  return (
    <div>
      {/* Navbar always visible, pass logout, user, and edit profile */}
      <Navbar
        user={user}
        onLogout={handleLogout}
        onEditProfile={handleEditProfile}
      />

      {/* Main content */}
      <div style={mainContainerStyle}>
        {stage === "auth" && <Auth onLogin={handleLogin} />}

        {stage === "role" && <RoleSelection onSelectRole={handleRoleSelect} />}

        {stage === "profile" && role === "student" && (
          <Profile
            userEmail={user}
            initialData={profileData} // ✅ pass saved profile to prefill
            onSubmitProfile={handleProfileSubmit}
          />
        )}

        {stage === "quiz" && <Quiz onComplete={handleQuizComplete} />}

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
