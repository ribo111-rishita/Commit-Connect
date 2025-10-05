import React, { useState, useRef } from "react";

// Demo profile generator
const getDemoProfile = (mentor) => ({
  name: mentor.name,
  image: mentor.image || "https://via.placeholder.com/400x220?text=Mentor",
  bio: mentor.bio || "Passionate open-source contributor with hands-on experience.",
  skills: mentor.skills || "React, Node.js, Git, GitHub",
  experience: mentor.experience || "3 years in open-source projects",
  reviews: [
    { student: "Alice", comment: "Super helpful and patient!" },
    { student: "Bob", comment: "Learned a lot about GitHub." },
    { student: "Charlie", comment: "Great mentor for open source beginners!" },
  ],
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

  const handleDragStart = (e) => e.dataTransfer.setDragImage(new Image(), 0, 0);
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

  // Styles
  const containerStyle = {
    backgroundColor: "#0a0a0a",
    color: "#fff",
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontFamily: "'Poppins', sans-serif",
    flexDirection: "column",
    padding: "0 20px 20px",
    position: "relative",
  };

  const cardContainerStyle = {
    position: "relative",
    width: "350px",
    height: "500px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };

  const cardStyle = {
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
    transform: `translate(${drag.x}px, ${drag.y}px) rotate(${drag.x / 20}deg) scale(${
      1 - Math.abs(drag.x) / 1000
    })`,
    transition: drag.x === 0 ? "transform 0.3s ease-in-out" : "transform 0.2s ease",
    zIndex: 2,
  };

  const nextCardStyle = {
    width: "350px",
    height: "500px",
    backgroundColor: "#111",
    border: "2px solid #c4ff00",
    borderRadius: "15px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    top: "10px",
    left: "0",
    opacity: 0.5,
    textAlign: "center",
    overflow: "hidden",
    boxShadow: "0 0 15px rgba(196,255,0,0.3)",
  };

  const mentorImageStyle = { width: "100%", height: "220px", objectFit: "cover" };

  const viewProfileButtonStyle = {
    marginBottom: "20px",
    backgroundColor: "#c4ff00",
    border: "none",
    padding: "10px 20px",
    borderRadius: "10px",
    cursor: "pointer",
    color: "black",
    fontWeight: "600",
  };

  const modalOverlayStyle = {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0,0,0,0.85)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
  };

  const modalContentStyle = {
    backgroundColor: "#111",
    border: "2px solid #c4ff00",
    borderRadius: "15px",
    padding: "30px",
    width: "400px",
    textAlign: "center",
    boxShadow: "0 0 20px rgba(0,255,0,0.2)",
    color: "#fff",
    position: "relative",
  };

  const closeButtonStyle = {
    position: "absolute",
    top: "15px",
    left: "15px",
    backgroundColor: "#c4ff00",
    color: "#000",
    border: "none",
    borderRadius: "8px",
    padding: "5px 10px",
    fontWeight: "600",
    cursor: "pointer",
  };

  const reviewStyle = {
    maxHeight: "120px",
    overflowY: "auto",
    marginTop: "10px",
    textAlign: "left",
  };

  const singleReviewStyle = {
    marginBottom: "10px",
    padding: "8px",
    backgroundColor: "#222",
    borderRadius: "10px",
    border: "1px solid #444",
  };

  return (
    <div style={containerStyle}>
      <h2 style={{ color: "#c4ff00", marginBottom: "30px" }}>Swipe through Mentors</h2>

      <div style={cardContainerStyle}>
        <div style={nextCardStyle}>
          <img src={nextMentor.image} alt={nextMentor.name} style={mentorImageStyle} />
          <div style={{ fontSize: "20px", fontWeight: "600", marginTop: "10px" }}>
            {nextMentor.name}
          </div>
        </div>

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
      </div>

      {/* Profile Modal */}
      {selectedMentor && (
        <div style={modalOverlayStyle} onClick={() => setSelectedMentor(null)}>
          <div style={modalContentStyle} onClick={(e) => e.stopPropagation()}>
            <button style={closeButtonStyle} onClick={() => setSelectedMentor(null)}>
              Close
            </button>
            <h2 style={{ color: "#c4ff00", marginBottom: "15px" }}>Mentor's Profile</h2>
            <img
              src={selectedMentor.image}
              alt={selectedMentor.name}
              style={{ width: "100%", borderRadius: "10px", marginBottom: "15px" }}
            />
            <p style={{ marginBottom: "10px" }}>{selectedMentor.bio}</p>
            <p style={{ color: "#aaa", fontSize: "14px" }}>Skills: {selectedMentor.skills}</p>
            <p style={{ color: "#aaa", fontSize: "14px" }}>
              Experience: {selectedMentor.experience}
            </p>

            <div style={reviewStyle}>
              <h3 style={{ color: "#c4ff00", marginBottom: "10px" }}>Reviews</h3>
              {selectedMentor.reviews.map((r, i) => (
                <div key={i} style={singleReviewStyle}>
                  <strong style={{ color: "#b6ff0d" }}>{r.student}:</strong>{" "}
                  <span style={{ color: "#fff", fontSize: "14px" }}>{r.comment}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MentorSwipe;
