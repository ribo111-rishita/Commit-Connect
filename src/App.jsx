import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Auth from "./components/Auth";
import RoleSelection from "./components/RoleSelection";
import Profile from "./components/Profile";
import Quiz from "./components/Quiz";
import MentorSwipe from "./components/MentorSwipe";
import Chatbot from "./components/Chatbot";
import Challenge from "./components/Challenge";

export default function App() {
  const [stage, setStage] = useState("auth");
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);
  const [profileData, setProfileData] = useState(null);
  const [quizScore, setQuizScore] = useState(null);
  const [selectedMentor, setSelectedMentor] = useState(null);
  const [challengeMentor, setChallengeMentor] = useState(null);
  const [isEditingProfile, setIsEditingProfile] = useState(false);

  // Load saved login info
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

      if (savedRole && !savedProfile) setStage("profile");
      else if (savedRole && savedProfile && !savedQuiz) setStage("quiz");
      else if (savedRole && savedQuiz) setStage("swipe");
      else setStage("role");
    } else {
      setStage("auth");
    }
  }, []);

  // Login
  const handleLogin = (email) => {
    setUser(email);
    localStorage.setItem("user", email);
    setStage("role");
  };

  // Select role
  const handleRoleSelect = (selectedRole) => {
    setRole(selectedRole);
    localStorage.setItem("role", selectedRole);
    setStage("profile");
  };

  // Submit profile
  const handleProfileSubmit = (data) => {
    setProfileData(data);
    localStorage.setItem("profileData", JSON.stringify(data));

    if (isEditingProfile) {
      setIsEditingProfile(false);
      if (quizScore) setStage("swipe");
      else setStage("quiz");
    } else {
      setStage("quiz");
    }
  };

  // Complete quiz
  const handleQuizComplete = (score) => {
    setQuizScore(score);
    localStorage.setItem("quizScore", score);
    setStage("swipe");
  };

  // Logout
  const handleLogout = () => {
    setUser(null);
    setRole(null);
    setProfileData(null);
    setQuizScore(null);
    setSelectedMentor(null);
    setChallengeMentor(null);
    setIsEditingProfile(false);
    localStorage.clear();
    setStage("auth");
  };

  // Edit profile
  const handleEditProfile = () => {
    setIsEditingProfile(true);
    setStage("profile");
  };

  // Start challenge
  const handleTakeChallenge = (mentor) => {
    setChallengeMentor(mentor);
    setStage("challenge");
  };

  // Complete challenge
  const handleChallengeComplete = () => {
    setChallengeMentor(null);
    setStage("swipe");
  };

  const mainContainerStyle = {
    paddingTop: "80px",
    minHeight: "100vh",
    backgroundColor: "#0a0a0a",
    color: "#fff",
  };

  return (
    <div>
      <Navbar
        user={user}
        onLogout={handleLogout}
        onEditProfile={handleEditProfile}
      />

      <div style={mainContainerStyle}>
        {stage === "auth" && <Auth onLogin={handleLogin} />}

        {stage === "role" && <RoleSelection onSelectRole={handleRoleSelect} />}

        {stage === "profile" && role === "student" && (
          <Profile
            userEmail={user}
            initialData={profileData}
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
            onTakeChallenge={handleTakeChallenge}
          />
        )}

        {stage === "challenge" && challengeMentor && (
          <Challenge
            mentor={challengeMentor}
            onComplete={handleChallengeComplete}
          />
        )}
      </div>

      <Chatbot />
    </div>
  );
}
