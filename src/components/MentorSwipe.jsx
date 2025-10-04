import React, { useState, useRef } from "react";

// Demo profile generator
const getDemoProfile = (mentor) => ({
  name: mentor.name,
  image: mentor.image || "https://via.placeholder.com/400x220?text=Mentor",
  bio: mentor.bio || "Passionate open-source contributor with hands-on experience.",
  skills: mentor.skills || "React, Node.js, Git, GitHub",
  experience: mentor.experience || "3 years in open-source projects",
});

const MentorSwipe = ({ mentors, onSelectMentor }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedMentor, setSelectedMentor] = useState(null);
  const [drag, setDrag] = useState({ x: 0, y: 0 });
  const cardRef = useRef(null);

  if (mentors.length === 0) return null;

  const currentMentor = mentors[currentIndex];
  const nextMentor = mentors[(currentIndex + 1) % mentors.length];

  const handleSwipe = (accepted) => {
    if (accepted) onSelectMentor(currentMentor);
    setCurrentIndex((prev) => (prev + 1) % mentors.length);
    setDrag({ x: 0, y: 0 });
  };

  const handleDragStart = (e) => {
    e.dataTransfer.setDragImage(new Image(), 0, 0);
  };

  const handleDrag = (e) => {
    if (e.clientX && e.clientY) {
      setDrag({ x: e.clientX - window.innerWidth / 2, y: e.clientY - window.innerHeight / 2 });
    }
  };

  const handleDragEnd = () => {
    if (drag.x > 120) handleSwipe(true); // swipe right
    else if (drag.x < -120) handleSwipe(false); // swipe left
    else setDrag({ x: 0, y: 0 });
  };
  
  const containerStyle = {
    backgroundColor: "#0a0a0a",
    color: "#fff",
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center", // vertical center
    alignItems: "center",     // horizontal center
    fontFamily: "'Poppins', sans-serif",
    padding: "0 20px",
  };

  const cardStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    width: "350px",
    height: "500px",
    backgroundColor: "#111",
    border: "2px solid #c4ff00",
    borderRadius: "15px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
    textAlign: "center",
    boxShadow: "0 0 20px rgba(0,255,0,0.2)",
    overflow: "hidden",
    cursor: "grab",
    transform: `translate(-50%, -50%) translate(${drag.x}px, ${drag.y}px) rotate(${drag.x / 20}deg)`,
    transition: drag.x === 0 ? "transform 0.3s ease" : "none",
    zIndex: 2,
  };

  const nextCardStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    width: "350px",
    height: "500px",
    backgroundColor: "#0d1a3a",
    border: "2px solid #555",
    borderRadius: "15px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    transform: "translate(-50%, -50%) scale(0.95)",
    opacity: 0.6,
    overflow: "hidden",
    filter: "brightness(0.8)",
    zIndex: 1,
  };

  const viewProfileButtonStyle = {
    marginBottom: "20px",
    backgroundColor: "#c4ff00",
    border: "none",
    padding: "10px 20px",
    borderRadius: "10px",
    cursor: "pointer",
    color: "#000",
    fontWeight: "600",
  };

  const arrowStyle = (color) => ({
    width: "50px",
    height: "50px",
    borderRadius: "50%",
    border: `2px solid ${color}`,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    fontSize: "20px",
    fontWeight: "700",
    color: color,
    boxShadow: `0 0 10px ${color}, 0 0 20px ${color}`,
    transition: "all 0.2s ease-in-out",
  });

  return (
    <div style={containerStyle}>
      <h2 style={{ color: "#c4ff00", marginBottom: "30px" }}>
        Swipe through Mentors
      </h2>

      {/* Next Mentor Preview */}
      <div style={nextCardStyle}>
        <img src={nextMentor.image} alt={nextMentor.name} style={mentorImageStyle} />
        <div style={{ fontSize: "20px", fontWeight: "600", marginTop: "10px" }}>
          {nextMentor.name}
        </div>
      </div>

      {/* Current Mentor Card */}
      <div
        ref={cardRef}
        style={cardStyle}
        draggable
        onDragStart={handleDragStart}
        onDrag={handleDrag}
        onDragEnd={handleDragEnd}
      >
        <img src={currentMentor.image} alt={currentMentor.name} style={mentorImageStyle} />
        <div style={{ fontSize: "22px", fontWeight: "700", margin: "15px 0" }}>
          {currentMentor.name}
        </div>
        <div style={{ color: "#aaa", fontSize: "14px", marginBottom: "15px" }}>
          {currentMentor.bio}
        </div>

        <button
          style={viewProfileButtonStyle}
          onClick={() => setSelectedMentor(getDemoProfile(currentMentor))}
        >
          View Profile
        </button>
      </div>

      {/* Profile Modal */}
      {selectedMentor && (
        <div style={modalOverlayStyle} onClick={() => setSelectedMentor(null)}>
          <div
            style={modalContentStyle}
            onClick={(e) => e.stopPropagation()}
          >
            <h2 style={{ color: "#c4ff00", marginBottom: "15px" }}>
              {selectedMentor.name}
            </h2>
            <img
              src={selectedMentor.image}
              alt={selectedMentor.name}
              style={{ width: "100%", borderRadius: "10px", marginBottom: "15px" }}
            />
            <p style={{ marginBottom: "10px" }}>{selectedMentor.bio}</p>
            <p style={{ color: "#aaa", fontSize: "14px" }}>
              Skills: {selectedMentor.skills}
            </p>
            <p style={{ color: "#aaa", fontSize: "14px" }}>
              Experience: {selectedMentor.experience}
            </p>
            <button
              style={{ ...viewProfileButtonStyle, marginTop: "20px" }}
              onClick={() => setSelectedMentor(null)}
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
