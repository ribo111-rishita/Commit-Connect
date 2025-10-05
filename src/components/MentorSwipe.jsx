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

const MentorSwipe = ({ mentors, onSelectMentor, onTakeChallenge }) => {
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
    // Prevent the default drag image from showing
    const blankImage = new Image();
    blankImage.src = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';
    e.dataTransfer.setDragImage(blankImage, 0, 0);
  };
  
  const handleDrag = (e) => {
    if (e.clientX !== 0 || e.clientY !== 0) { // Check to prevent setting state on drag end before onDragEnd fires
      setDrag({ 
        x: e.clientX - window.innerWidth / 2, 
        y: e.clientY - window.innerHeight / 2 
      });
    }
  };
  
  const handleDragEnd = () => {
    const swipeThreshold = 100;
    if (drag.x > swipeThreshold) handleSwipe(true);
    else if (drag.x < -swipeThreshold) handleSwipe(false);
    else setDrag({ x: 0, y: 0 });
  };

  // --- Styles: Enhanced for visual appeal ---

  const containerStyle = {
    backgroundColor: "#0a0a0a",
    color: "#fff",
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontFamily: "'Poppins', sans-serif",
    flexDirection: "column",
    padding: "40px 20px",
    position: "relative",
  };

  const cardContainerStyle = {
    position: "relative",
    width: "350px",
    height: "500px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: "50px",
    // Adding perspective for better 3D card movement feeling
    perspective: '1000px', 
  };

  const cardStyle = {
    width: "350px",
    height: "500px",
    backgroundColor: "#1c1c1c",
    border: "2px solid #c4ff00",
    borderRadius: "20px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
    textAlign: "center",
    boxShadow: `0 8px 20px rgba(0,0,0,0.6), inset 0 0 5px rgba(255,255,255,0.05)`, 
    overflow: "hidden",
    cursor: "grab",
    // Transform remains the same for the current card
    transform: `translate(${drag.x}px, ${drag.y}px) rotate(${drag.x / 25}deg) scale(${
      1 - Math.abs(drag.x) / 1500
    })`,
    transition: drag.x === 0 ? "transform 0.4s cubic-bezier(0.68, -0.55, 0.27, 1.55)" : "transform 0.1s linear",
    zIndex: 2,
    paddingBottom: '20px',
    // Ensures element is transformed in 3D space
    transformStyle: 'preserve-3d', 
  };

  const nextCardStyle = {
    width: "340px",
    height: "480px",
    backgroundColor: "#111",
    border: "1px solid #c4ff0044",
    borderRadius: "20px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    top: "10px",
    // KEY CHANGE: Position the next card just off the right edge of the container
    left: '50%', // Start from the center of the container
    transform: `translate(calc(-50% + 20px + ${Math.max(0, drag.x * 0.2)}px), 0) scale(0.95)`, 
    // The `translate` moves it to the right and slides it in as drag.x increases
    // 20px offset to keep it visible, max(0, drag.x * 0.2) to follow the drag
    
    opacity: 0.8,
    textAlign: "center",
    overflow: "hidden",
    boxShadow: "0 0 8px rgba(0,0,0,0.4)",
    zIndex: 1,
    filter: 'blur(3px)', 
    transition: drag.x === 0 ? 'transform 0.4s ease-out, filter 0.4s ease-out' : 'transform 0.1s linear',
  };
  
  // Conditionally show the blurry preview only if dragging to the right (to select)
  // This helps focus rejection (swipe left) and anticipation (swipe right)
  const isDraggingRight = drag.x > 0;


  const mentorImageStyle = { 
    width: "100%", 
    height: "220px", 
    objectFit: "cover",
    borderBottom: '2px solid #c4ff00',
  };

  const cardContentStyle = {
      padding: "0 20px",
      flexGrow: 1,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
  };

  const viewProfileButtonStyle = {
    backgroundColor: "#c4ff00",
    border: "none",
    padding: "10px 25px",
    borderRadius: "25px",
    cursor: "pointer",
    color: "#000",
    fontWeight: "700",
    letterSpacing: "0.5px",
    transition: "background-color 0.2s, transform 0.1s",
    boxShadow: "0 4px 10px rgba(0,0,0,0.4)",
    ':hover': {
        backgroundColor: '#b6ff0d',
        transform: 'translateY(-1px)',
    }
  };

  // Modal Styles (Kept as before)
  const modalOverlayStyle = {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0,0,0,0.9)",
    backdropFilter: "blur(5px)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
  };

  const modalContentStyle = {
    backgroundColor: "#111",
    border: "3px solid #c4ff00",
    borderRadius: "20px",
    padding: "30px",
    width: "90%",
    maxWidth: "450px",
    textAlign: "center",
    boxShadow: "0 10px 30px rgba(0,0,0,0.7)",
    color: "#fff",
    position: "relative",
    animation: "fadeIn 0.3s ease-out",
  };

  const closeButtonStyle = {
    position: "absolute",
    top: "15px",
    right: "15px",
    backgroundColor: "#c4ff00",
    color: "#000",
    border: "none",
    borderRadius: "50%",
    width: "30px",
    height: "30px",
    lineHeight: "30px",
    padding: "0",
    fontSize: "16px",
    fontWeight: "800",
    cursor: "pointer",
    transition: "transform 0.2s",
    boxShadow: "0 2px 8px rgba(0,0,0,0.4)",
  };

  const reviewStyle = {
    maxHeight: "150px",
    overflowY: "auto",
    marginTop: "20px",
    paddingRight: "10px",
    textAlign: "left",
  };

  const singleReviewStyle = {
    marginBottom: "10px",
    padding: "12px",
    backgroundColor: "#222",
    borderRadius: "15px",
    borderLeft: "4px solid #c4ff00",
    boxShadow: "0 2px 5px rgba(0,0,0,0.3)",
  };

  const challengeButtonStyle = {
    backgroundColor: "#c4ff00",
    color: "#000",
    border: "none",
    borderRadius: "10px",
    padding: "15px 30px",
    fontWeight: "700",
    cursor: "pointer",
    marginTop: "30px",
    fontSize: "16px",
    letterSpacing: "1px",
    transition: "background-color 0.2s, transform 0.1s",
    boxShadow: "0 5px 15px rgba(0,0,0,0.5)",
  };
  

  return (
    <div style={containerStyle}>
      <h2 style={{ color: "#c4ff00", marginBottom: "30px", textShadow: "none" }}>
        Swipe through Mentors 
      </h2>

      <div style={cardContainerStyle}>
        {/* Next Card - The blurry preview on the side */}
        {/* Only render if dragging right, or if the drag is reset (to allow transition back) */}
        {(isDraggingRight || drag.x === 0) && (
            <div style={nextCardStyle}>
              <img 
                src={nextMentor.image} 
                alt={nextMentor.name} 
                style={{...mentorImageStyle, borderBottom: 'none'}}
              />
              {/* Text is also blurred now due to the parent div filter */}
              <div style={{ fontSize: "20px", fontWeight: "600", marginTop: "10px", opacity: 0.8 }}>
                {nextMentor.name}
              </div>
            </div>
        )}

        {/* Current Card - Interactive */}
        <div
          ref={cardRef}
          style={cardStyle}
          draggable="true"
          onDragStart={handleDragStart}
          onDrag={handleDrag}
          onDragEnd={handleDragEnd}
        >
          <img src={currentMentor.image} alt={currentMentor.name} style={mentorImageStyle} />
          
          <div style={cardContentStyle}>
            <div style={{ fontSize: "28px", fontWeight: "800", margin: "10px 0 5px" }}>
              {currentMentor.name}
            </div>
            <div style={{ color: "#aaa", fontSize: "15px", marginBottom: "15px", padding: '0 10px' }}>
              {currentMentor.bio}
            </div>
            
            <button
              style={viewProfileButtonStyle}
              onClick={() => setSelectedMentor(getDemoProfile(currentMentor))}
            >
              VIEW PROFILE & DETAILS
            </button>
          </div>
        </div>
      </div>
      
      {/* Swipe instructions (subtle call to action) */}
      <p style={{ color: '#c4ff00', fontSize: '14px', marginTop: '10px' }}>
          Swipe ⬅️ to Skip | Swipe ➡️ to Select
      </p>


      {/* Profile Modal */}
      {selectedMentor && (
        <div style={modalOverlayStyle} onClick={() => setSelectedMentor(null)}>
          <div style={modalContentStyle} onClick={(e) => e.stopPropagation()}>
            <button style={closeButtonStyle} onClick={() => setSelectedMentor(null)}>
              X
            </button>
            <h2 style={{ color: "#c4ff00", marginBottom: "20px", textShadow: "none" }}>
              {selectedMentor.name}'s Profile
            </h2>
            <img
              src={selectedMentor.image}
              alt={selectedMentor.name}
              style={{ width: "100%", borderRadius: "15px", marginBottom: "20px", border: "1px solid #c4ff00" }}
            />
            <p style={{ marginBottom: "15px", fontSize: "16px", fontWeight: "500" }}>
                "{selectedMentor.bio}"
            </p>
            
            <div style={{border: '1px solid #333', padding: '10px', borderRadius: '10px', marginBottom: '15px', backgroundColor: '#181818'}}>
                <p style={{ color: "#c4ff00", fontSize: "14px", fontWeight: '600' }}>
                  Skills: <span style={{ color: '#fff' }}>{selectedMentor.skills}</span>
                </p>
                <p style={{ color: "#c4ff00", fontSize: "14px", fontWeight: '600' }}>
                  Experience: <span style={{ color: '#fff' }}>{selectedMentor.experience}</span>
                </p>
            </div>


            <div style={reviewStyle}>
              <h3 style={{ color: "#c4ff00", marginBottom: "10px", borderBottom: '1px solid #c4ff0055', paddingBottom: '5px' }}>
                Student Reviews ({selectedMentor.reviews.length})
              </h3>
              {selectedMentor.reviews.map((r, i) => (
                <div key={i} style={singleReviewStyle}>
                  <strong style={{ color: "#b6ff0d" }}>{r.student}:</strong>{" "}
                  <span style={{ color: "#fff", fontSize: "14px", fontStyle: 'italic' }}>{r.comment}</span>
                </div>
              ))}
            </div>

            {/* Mentor's Challenge Button */}
            <div style={{ display: "flex", justifyContent: "center" }}>
              <button
                style={challengeButtonStyle}
                onClick={() => {
                  if (onTakeChallenge) {
                      onTakeChallenge(selectedMentor);
                      setSelectedMentor(null); // Close modal after action
                  } else {
                      alert(`Initiating Mentor's Challenge for ${selectedMentor.name}!`);
                  }
                }}
              >
                ACCEPT CHALLENGE
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MentorSwipe;