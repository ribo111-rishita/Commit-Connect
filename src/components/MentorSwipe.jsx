import React, { useState, useRef } from "react";
import Chat from "./Chat"; // make sure Chat.jsx exists

// Demo profile generator
const getDemoProfile = (mentor, id) => ({
  id,
  name: mentor.name,
  image: mentor.image || "https://via.placeholder.com/400x220?text=Mentor",
  bio:
    mentor.bio ||
    "Passionate open-source contributor with hands-on experience.",
  skills: mentor.skills || "React, Node.js, Git, GitHub",
  experience: mentor.experience || "3 years in open-source projects",
  reviews: [
    { student: "Alice", comment: "Super helpful and patient!" },
    { student: "Bob", comment: "Learned a lot about GitHub." },
    { student: "Charlie", comment: "Great mentor for open source beginners!" },
  ],
});

const MentorSwipe = ({ mentors = [], onTakeChallenge }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedMentorsList, setSelectedMentorsList] = useState([]);
  const [activeChats, setActiveChats] = useState([]);
  const [drag, setDrag] = useState({ x: 0, y: 0 });
  const [viewProfileMentor, setViewProfileMentor] = useState(null); // for modal
  const cardRef = useRef(null);

  if (!mentors || mentors.length === 0) return null;

  const currentMentor = mentors[currentIndex];

  const handleSwipe = (accepted) => {
    if (accepted) {
      if (selectedMentorsList.length < 3) {
        const profile = getDemoProfile(currentMentor, currentIndex);
        if (!selectedMentorsList.find((m) => m.id === profile.id)) {
          setSelectedMentorsList((prev) => [...prev, profile]);
        }
      } else {
        alert("You can only select up to 3 mentors.");
      }
    }
    setCurrentIndex((prev) => (prev + 1) % mentors.length);
    setDrag({ x: 0, y: 0 });
  };

  const handleDragStart = (e) => {
    const blankImage = new Image();
    blankImage.src =
      "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7";
    e.dataTransfer.setDragImage(blankImage, 0, 0);
  };

  const handleDrag = (e) => {
    if (e.clientX !== 0 || e.clientY !== 0) {
      setDrag({
        x: e.clientX - window.innerWidth / 3,
        y: e.clientY - window.innerHeight / 2,
      });
    }
  };

  const handleDragEnd = () => {
    const swipeThreshold = 100;
    if (drag.x > swipeThreshold) handleSwipe(true);
    else if (drag.x < -swipeThreshold) handleSwipe(false);
    else setDrag({ x: 0, y: 0 });
  };

  const handleRemoveMentor = (id) => {
    setSelectedMentorsList((prev) => prev.filter((m) => m.id !== id));
    setActiveChats((prev) => prev.filter((chatId) => chatId !== id));
  };

  const toggleChat = (id) => {
    setActiveChats((prev) =>
      prev.includes(id) ? prev.filter((chatId) => chatId !== id) : [...prev, id]
    );
  };

  // --- Styles ---
  const containerStyle = {
    display: "flex",
    minHeight: "100vh",
    backgroundColor: "#0a0a0a",
    fontFamily: "'Poppins', sans-serif",
    color: "#fff",
    padding: "40px",
    gap: "40px",
    justifyContent: "center",
    alignItems: "flex-start",
  };

  const leftColumnStyle = {
    flex: 2,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  };

  const rightColumnStyle = {
    flex: 1,
    backgroundColor: "#111",
    borderRadius: "20px",
    padding: "20px",
    maxHeight: "80vh",
    overflowY: "auto",
  };

  const cardStyle = {
    width: "360px",
    height: "520px",
    backgroundColor: "#111",
    borderRadius: "25px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
    textAlign: "center",
    boxShadow: "0 15px 30px rgba(0,0,0,0.6), 0 0 20px rgba(196,255,0,0.2)",
    transform: `translate(${drag.x}px, ${drag.y}px) rotate(${drag.x / 25}deg)`,
    transition: drag.x === 0 ? "transform 0.4s" : "transform 0.1s",
    cursor: "grab",
    paddingBottom: "15px",
  };

  const buttonStyle = {
    background: "#c4ff00",
    border: "none",
    padding: "8px 15px",
    margin: "5px",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "600",
  };

  return (
    <div style={containerStyle}>
      {/* Left column - Swipe card */}
      <div style={leftColumnStyle}>
        <div style={{ width: "360px", height: "520px" }}>
          <div
            ref={cardRef}
            style={cardStyle}
            draggable="true"
            onDragStart={handleDragStart}
            onDrag={handleDrag}
            onDragEnd={handleDragEnd}
          >
            <img
              src={currentMentor.image}
              alt={currentMentor.name}
              style={{ width: "100%", height: "220px", objectFit: "cover" }}
            />
            <div style={{ padding: "20px" }}>
              <h2>{currentMentor.name}</h2>
              <p style={{ color: "#aaa", fontSize: "14px" }}>
                {currentMentor.bio}
              </p>
              {/* Buttons */}
              <div style={{ marginTop: "15px" }}>
                <button
                  style={buttonStyle}
                  onClick={() =>
                    setViewProfileMentor(
                      getDemoProfile(currentMentor, currentIndex)
                    )
                  }
                >
                  View Profile
                </button>
                <button
                  style={buttonStyle}
                  onClick={() =>
                    onTakeChallenge(
                      getDemoProfile(currentMentor, currentIndex)
                    )
                  }
                >
                  Mentor’s Challenge
                </button>
              </div>
            </div>
          </div>
        </div>
        <p style={{ color: "#c4ff00", marginTop: "40px" }}>
          Swipe ⬅️ Skip | Swipe ➡️ Select
        </p>
      </div>

      {/* Right column - Selected mentors */}
      <div style={rightColumnStyle}>
        <h3
          style={{ color: "#c4ff00", marginBottom: "20px", textAlign: "center" }}
        >
          Selected Mentors
        </h3>
        {selectedMentorsList.length === 0 ? (
          <p style={{ color: "#aaa", textAlign: "center" }}>
            No mentors selected yet.
          </p>
        ) : (
          selectedMentorsList.map((m) => (
            <div
              key={m.id}
              style={{
                background: "#1c1c1c",
                marginBottom: "10px",
                padding: "10px",
                borderRadius: "10px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <span>{m.name}</span>
                <div>
                  <button
                    onClick={() => toggleChat(m.id)}
                    style={{
                      marginRight: "8px",
                      background: "#c4ff00",
                      border: "none",
                      padding: "5px 10px",
                      borderRadius: "8px",
                    }}
                  >
                    {activeChats.includes(m.id) ? "Close Chat" : "Chat"}
                  </button>
                  <button
                    onClick={() => handleRemoveMentor(m.id)}
                    style={{
                      background: "red",
                      border: "none",
                      padding: "5px 10px",
                      borderRadius: "8px",
                      color: "#fff",
                    }}
                  >
                    Remove
                  </button>
                </div>
              </div>

              {activeChats.includes(m.id) && (
                <div
                  style={{
                    marginTop: "10px",
                    border: "1px solid #c4ff00",
                    borderRadius: "10px",
                    padding: "10px",
                  }}
                >
                  <Chat mentor={m} />
                </div>
              )}
            </div>
          ))
        )}
      </div>

      {/* Profile Modal */}
      {viewProfileMentor && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            background: "rgba(0,0,0,0.7)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1000,
          }}
          onClick={() => setViewProfileMentor(null)}
        >
          <div
            style={{
              background: "#111",
              padding: "30px",
              borderRadius: "20px",
              width: "450px",
              maxHeight: "80vh",
              overflowY: "auto",
              color: "#fff",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <h2 style={{ color: "#c4ff00" }}>{viewProfileMentor.name}</h2>
            <p style={{ marginBottom: "10px" }}>
              <strong>Bio:</strong> {viewProfileMentor.bio}
            </p>
            <p style={{ marginBottom: "10px" }}>
              <strong>Skills:</strong> {viewProfileMentor.skills}
            </p>
            <p style={{ marginBottom: "10px" }}>
              <strong>Experience:</strong> {viewProfileMentor.experience}
            </p>
            <h4 style={{ marginTop: "15px", marginBottom: "8px" }}>Reviews:</h4>
            <ul>
              {viewProfileMentor.reviews.map((r, i) => (
                <li key={i} style={{ marginBottom: "6px", color: "#aaa" }}>
                  <strong>{r.student}:</strong> {r.comment}
                </li>
              ))}
            </ul>
            <button
              style={{
                marginTop: "15px",
                background: "#c4ff00",
                border: "none",
                padding: "8px 15px",
                borderRadius: "8px",
                cursor: "pointer",
              }}
              onClick={() => setViewProfileMentor(null)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MentorSwipe;
