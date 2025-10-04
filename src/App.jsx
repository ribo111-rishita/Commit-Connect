
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;

import React, { useState } from "react";
import Auth from "./components/Auth";
import MentorSwipe from "./components/MentorSwipe";
import Quiz from "./components/Quiz";
import Chat from "./components/Chat";

function App() {
  const [stage,setStage] = useState("auth");
  const [selectedMentor,setSelectedMentor] = useState(null);
  const [quizScore,setQuizScore] = useState(null);

  if(stage==="auth") return <Auth onAuth={()=>setStage("swipe")}/>;
  if(stage==="swipe") return <MentorSwipe onSwipeRight={(m)=>{setSelectedMentor(m); setStage("quiz");}}/>;
  if(stage==="quiz") return <Quiz onComplete={(score)=>{setQuizScore(score); setStage("chat");}}/>;
  if(stage==="chat") return <Chat/>;

  return <div>Commit Connect</div>;
}

export default App;

