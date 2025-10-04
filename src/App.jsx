import React, { useState } from "react";
import Auth from "./components/Auth";
import RoleSelection from "./components/RoleSelection";
import Profile from "./components/Profile";
import MentorSwipe from "./components/MentorSwipe";

export default function App() {
  const [stage, setStage] = useState("auth");
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);
  const [profileData, setProfileData] = useState(null);
  const [selectedMentor, setSelectedMentor] = useState(null);

  return (
    <div>
      {stage === "auth" && (
        <Auth
          onLogin={(email) => {
            setUser(email);
            setStage("role");
          }}
        />
      )}

      {stage === "role" && (
        <RoleSelection
          onSelectRole={(selectedRole) => {
            setRole(selectedRole);
            setStage("profile");
          }}
        />
      )}

      {stage === "profile" && role === "student" && (
        <Profile
          userEmail={user}
          onSubmitProfile={(data) => {
            setProfileData(data);
            setStage("swipe"); // go to mentor swipe
          }}
        />
      )}

      {stage === "swipe" && (
        <MentorSwipe
          mentors={[
            { name: "Alice", bio: "Frontend expert" },
            { name: "Bob", bio: "Backend guru" },
            { name: "Charlie", bio: "Fullstack wizard" },
          ]}
          onSelectMentor={(mentor) => {
            setSelectedMentor(mentor);
            alert(`You selected ${mentor.name}!`);
            // You can proceed to chat/next stage here
          }}
        />
      )}
    </div>
  );
}
