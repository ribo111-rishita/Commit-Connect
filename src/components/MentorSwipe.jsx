import React, { useState } from "react";

// 🟢 Simple Navbar
const Navbar = () => {
  const navbarStyle = {
    width: "100%",
    backgroundColor: "#111",
    borderBottom: "2px solid #c4ff00",
    color: "#c4ff00",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "15px 40px",
    fontFamily: "'Poppins', sans-serif",
    position: "fixed",
    top: 0,
    left: 0,
    zIndex: 1000,
  };

  return (
    <nav style={navbarStyle}>
      <h1 style={{ fontWeight: "700", fontSize: "22px" }}>CommitConnect</h1>
      <div style={{ display: "flex", gap: "30px", fontWeight: "500" }}>
        <a href="/" style={{ color: "#c4ff00", textDecoration: "none" }}>
          Home
        </a>
        <a href="/mentors" style={{ color: "#c4ff00", textDecoration: "none" }}>
          Mentors
        </a>
        <a href="/profile" style={{ color: "#c4ff00", textDecoration: "none" }}>
          Profile
        </a>
      </div>
    </nav>
  );
};

const MentorSwipe = ({ mentors, onSelectMentor, onViewProfile }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleSwipe = (direction) => {
    if (direction === "right") {
      onSelectMentor(mentors[currentIndex]);
    }
    setCurrentIndex((prev) => (prev + 1) % mentors.length);
  };

  if (mentors.length === 0) return null;

  const currentMentor = mentors[currentIndex];

  const containerStyle = {
    backgroundColor: "#0a0a0a",
    color: "#fff",
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontFamily: "'Poppins', sans-serif",
    flexDirection: "column",
    padding: "100px 20px 20px", // added top padding for navbar space
  };

  const cardStyle = {
    width: "400px",
    height: "500px",
    backgroundColor: "#111",
    border: "2px solid #c4ff00",
    borderRadius: "15px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    boxShadow: "0 0 20px rgba(0,255,0,0.2)",
    textAlign: "center",
  };

  const swipeButtonStyle = {
    position: "absolute",
    top: "50%",
    transform: "translateY(-50%)",
    backgroundColor: "#c4ff00",
    border: "none",
    padding: "12px",
    borderRadius: "50%",
    cursor: "pointer",
    fontWeight: "700",
  };

  const viewProfileButtonStyle = {
    marginTop: "15px",
    backgroundColor: "#4caf50",
    border: "none",
    padding: "10px 20px",
    borderRadius: "10px",
    cursor: "pointer",
    color: "#fff",
    fontWeight: "600",
  };

  return (
    <>
      <Navbar />
      <div style={containerStyle}>
        <h2 style={{ color: "#c4ff00", marginBottom: "30px" }}>
          Swipe through Mentors
        </h2>

        <div style={cardStyle}>
          <button
            style={{ ...swipeButtonStyle, left: "-50px" }}
            onClick={() => handleSwipe("left")}
          >
            ◀
          </button>

          <div style={{ fontSize: "22px", fontWeight: "700", marginBottom: "10px" }}>
            {currentMentor.name}
          </div>

          <button
            style={viewProfileButtonStyle}
            onClick={() => onViewProfile(currentMentor)}
          >
            View Profile
          </button>

          <div style={{ color: "#aaa", marginTop: "15px" }}>{currentMentor.bio}</div>

          <button
            style={{ ...swipeButtonStyle, right: "-50px" }}
            onClick={() => handleSwipe("right")}
          >
            ▶
          </button>
        </div>
      </div>
    </>
  );
};

export default MentorSwipe;
