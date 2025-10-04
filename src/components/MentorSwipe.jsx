import React, { useState } from "react";

const mentors = [
  {id:1, name:"Alice OSS", skills:"React, Git"},
  {id:2, name:"Bob Dev", skills:"Node, Firebase"}
];

export default function MentorSwipe({ onSwipeRight }) {
  const [index, setIndex] = useState(0);
  const mentor = mentors[index];

  if (!mentor) return <p>No more mentors</p>;

  return (
    <div>
      <h3>{mentor.name}</h3>
      <p>{mentor.skills}</p>
      <button onClick={()=>setIndex(index+1)}>Skip</button>
      <button onClick={()=>{
        onSwipeRight(mentor);
        setIndex(index+1);
      }}>Apply (Swipe Right)</button>
    </div>
  );
}
