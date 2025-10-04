import React, { useState } from "react";

const mentors = [
  { id: 1, name: "Alice OSS", skills: "React, Git", bio: "Open source contributor, loves mentoring beginners." },
  { id: 2, name: "Bob Dev", skills: "Node, Firebase", bio: "Backend wizard, OSS project maintainer." },
  { id: 3, name: "Charlie OpenSource", skills: "Python, GitHub", bio: "Python developer, passionate about open source communities." },
];

export default function MentorSwipe({ onSwipeRight }) {
  const [index, setIndex] = useState(0);
  const mentor = mentors[index];

  const cardStyle = {
    border: "1px solid #ddd",
    borderRadius: "12px",
    background: "#fff",
    padding: "20px",
    margin: "15px 0",
    boxShadow: "0 5px 15px rgba(0,0,0,0.1)",
  };

  const buttonStyle = {
    padding: "10px 18px",
    margin: "8px",
    border: "none",
    borderRadius: "8px",
    background: "#7b0f1d",
    color: "#fff",
    fontWeight: "600",
    cursor: "pointer",
  };

  if (!mentor)
    return <p style={{ color: "#7b0f1d", fontWeight: "600" }}>All mentors swiped! ✅</p>;

  return (
    <div style={cardStyle}>
      <h3 style={{ color: "#7b0f1d" }}>{mentor.name}</h3>
      <p><strong>Skills:</strong> {mentor.skills}</p>
      <p>{mentor.bio}</p>
      <button style={buttonStyle} onClick={() => setIndex(index + 1)}>
        Skip
      </button>
      <button
        style={buttonStyle}
        onClick={() => {
          onSwipeRight(mentor);
          setIndex(index + 1);
        }}
      >
        Apply
      </button>
    </div>
  );
}
