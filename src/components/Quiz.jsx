import React, { useState } from "react";

export default function Quiz({ onComplete }) {
  const questions = [
    {q:"What command creates a git repository?", a:"git init"},
    {q:"What command makes a pull request?", a:"pull request"}
  ];

  const [answers,setAnswers]=useState({});
  const [submitted,setSubmitted]=useState(false);

  const submit=()=>{
    let score=0;
    questions.forEach((item,i)=>{
      if(answers[i]?.toLowerCase().includes(item.a)) score++;
    });
    setSubmitted(true);
    onComplete(score);
  };

  return (
    <div>
      <h2>Quiz</h2>
      {questions.map((item,i)=>(
        <div key={i}>
          <p>{item.q}</p>
          <input onChange={e=>setAnswers({...answers,[i]:e.target.value})}/>
        </div>
      ))}
      <button onClick={submit}>Submit</button>
      {submitted && <p>Submitted!</p>}
    </div>
  );
}
