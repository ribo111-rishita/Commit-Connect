import React, { useState, useRef } from "react";
import Chat from "./Chat"; // make sure Chat.jsx exists in same folder or update path

// Demo profile generator
const getDemoProfile = (mentor, id) => ({
  id, // ensure unique ID
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

const MentorSwipe = ({ mentors = [] }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedMentorsList, setSelectedMentorsList] = useState([]);
  const [activeChatId, setActiveChatId] = useState(null);
  const [drag, setDrag] = useState({ x: 0, y: 0 });
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
    if (activeChatId === id) setActiveChatId(null);
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
    height: "500px",
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
  };

  return (
    <div style={containerStyle}>
      {/* Left column - Swipe card */}
      <div style={leftColumnStyle}>
        <div style={{ width: "360px", height: "500px" }}>
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
              <p style={{ color: "#aaa" }}>{currentMentor.bio}</p>
            </div>
          </div>
        </div>
        <p style={{ color: "#c4ff00", marginTop: "10px" }}>
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
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <span>{m.name}</span>
              <div>
                <button
                  onClick={() => setActiveChatId(m.id)}
                  style={{
                    marginRight: "8px",
                    background: "#c4ff00",
                    border: "none",
                    padding: "5px 10px",
                    borderRadius: "8px",
                  }}
                >
                  Chat
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
          ))
        )}

        {/* Chat Box for selected mentor */}
        {activeChatId && (
          <div
            style={{
              marginTop: "20px",
              border: "1px solid #c4ff00",
              borderRadius: "10px",
              padding: "15px",
            }}
          >
            <h4 style={{ marginBottom: "10px", color: "#c4ff00" }}>
              Chat with{" "}
              {selectedMentorsList.find((m) => m.id === activeChatId)?.name}
            </h4>
            <Chat mentorId={activeChatId} />
          </div>
        )}
      </div>
    </div>
  );
};

export default MentorSwipe;
