import React, { useState } from "react";

const mentors = [
  { id: 1, name: "Alice OSS", skills: "React, Git", bio: "Open source contributor, loves mentoring beginners." },
  { id: 2, name: "Bob Dev", skills: "Node, Firebase", bio: "Backend wizard, OSS project maintainer." },
  { id: 3, name: "Charlie OpenSource", skills: "Python, GitHub", bio: "Python developer, passionate about open source communities." },
];

export default function MentorSwipe({ onSwipeRight }) {
  const [index, setIndex] = useState(0);
  const mentor = mentors[index];

  if (!mentor) return <p style={{ color: "#7b0f1d", fontWeight: "600" }}>All mentors swiped! ✅</p>;

  return (
    <div className="mentor-card">
      <h3>{mentor.name}</h3>
      <p><strong>Skills:</strong> {mentor.skills}</p>
      <p>{mentor.bio}</p>

      <div>
        <button onClick={() => setIndex(index + 1)}>Skip</button>
        <button
          onClick={() => {
            onSwipeRight(mentor);
            setIndex(index + 1);
          }}
        >
          Apply
        </button>
      </div>
    </div>
  );
}
