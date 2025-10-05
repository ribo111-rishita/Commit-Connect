import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Challenge from "./Challenge";

const ChallengePage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const mentor = location.state?.mentor;

  const handleComplete = () => {
    alert("Challenge Completed!");
    navigate(-1); // go back to MentorSwipe
  };

  if (!mentor) return <p>No mentor selected!</p>;

  return <Challenge mentor={mentor} onComplete={handleComplete} />;
};

export default ChallengePage;
