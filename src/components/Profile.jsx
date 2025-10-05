// import React, { useState } from "react";

// export default function Profile({ onSave }) {
//   const [name, setName] = useState("");
//   const [phone, setPhone] = useState("");
//   const [skills, setSkills] = useState("");
//   const [github, setGithub] = useState("");
//   const [leetcode, setLeetcode] = useState("");
//   const [codeforces, setCodeforces] = useState("");

//   const [hover, setHover] = useState(false);

//   const styles = {
//     wrapper: {
//       margin: 0,
//       padding: 0,
//       backgroundColor: "#0b0b0b",
//       width: "100vw",
//       minHeight: "100vh",
//       display: "flex",
//       alignItems: "center",
//       justifyContent: "center",
//       fontFamily: "Poppins, sans-serif",
//       color: "#fff",
//     },
//     container: {
//       width: "100%",
//       maxWidth: "450px",
//       padding: "25px",
//       textAlign: "center",
//     },
//     title: {
//       fontSize: "1.8rem",
//       fontWeight: "700",
//       marginBottom: "20px",
//       color: "#b6ff0d",
//     },
//     input: {
//       width: "100%",
//       padding: "12px",
//       marginBottom: "18px",
//       borderRadius: "10px",
//       border: "1px solid rgba(182,255,13,0.3)",
//       backgroundColor: "#1a1a1a",
//       color: "#fff",
//       fontSize: "1rem",
//       outline: "none",
//       transition: "all 0.3s ease",
//     },
//     button: {
//       width: "100%",
//       backgroundColor: "#b6ff0d",
//       color: "#000",
//       padding: "14px",
//       borderRadius: "12px",
//       border: "none",
//       fontWeight: "600",
//       fontSize: "1rem",
//       cursor: "pointer",
//       transition: "all 0.3s ease",
//     },
//     buttonHover: {
//       backgroundColor: "#d0ff4a",
//       boxShadow: "0 0 12px rgba(182,255,13,0.6)",
//     },
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const profileData = {
//       name,
//       phone,
//       skills: skills.split(",").map((s) => s.trim()),
//       github,
//       leetcode,
//       codeforces,
//     };
//     if (onSave) onSave(profileData);
//     alert("Profile saved!");
//   };

//   return (
//     <div style={styles.wrapper}>
//       <div style={styles.container}>
//         <h2 style={styles.title}>Student Profile</h2>
//         <form onSubmit={handleSubmit}>
//           <input
//             type="text"
//             placeholder="Full Name"
//             style={styles.input}
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//           />
//           <input
//             type="tel"
//             placeholder="Phone Number"
//             style={styles.input}
//             value={phone}
//             onChange={(e) => setPhone(e.target.value)}
//           />
//           <input
//             type="text"
//             placeholder="Skills (comma separated)"
//             style={styles.input}
//             value={skills}
//             onChange={(e) => setSkills(e.target.value)}
//           />
//           <input
//             type="url"
//             placeholder="GitHub Profile Link"
//             style={styles.input}
//             value={github}
//             onChange={(e) => setGithub(e.target.value)}
//           />
//           <input
//             type="url"
//             placeholder="LeetCode Profile Link"
//             style={styles.input}
//             value={leetcode}
//             onChange={(e) => setLeetcode(e.target.value)}
//           />
//           <input
//             type="url"
//             placeholder="Codeforces Profile Link"
//             style={styles.input}
//             value={codeforces}
//             onChange={(e) => setCodeforces(e.target.value)}
//           />

//           <button
//             type="submit"
//             style={{
//               ...styles.button,
//               ...(hover ? styles.buttonHover : {}),
//             }}
//             onMouseEnter={() => setHover(true)}
//             onMouseLeave={() => setHover(false)}
//           >
//             Save Profile
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }


// import React, { useState } from "react";

// const Profile = ({ userEmail, onSubmitProfile }) => {
//   const [fullName, setFullName] = useState("");
//   const [phone, setPhone] = useState("");
//   const [skills, setSkills] = useState("");
//   const [github, setGithub] = useState("");
//   const [leetcode, setLeetcode] = useState("");
//   const [codeforces, setCodeforces] = useState("");

//   const [focusedInput, setFocusedInput] = useState("");

//   const containerStyle = {
//     backgroundColor: "#0a0a0a",
//     color: "#fff",
//     minHeight: "100vh",
//     display: "flex",
//     justifyContent: "center",
//     alignItems: "center",
//     fontFamily: "'Poppins', sans-serif",
//     padding: "20px",
//   };

//   const cardStyle = {
//     backgroundColor: "#111",
//     padding: "40px",
//     borderRadius: "15px",
//     boxShadow: "0 0 20px rgba(0,0,0,0.4)",
//     width: "450px",
//   };

//   const getInputStyle = (inputName) => ({
//     width: "100%",
//     padding: "10px",
//     margin: "10px 0",
//     borderRadius: "6px",
//     border: focusedInput === inputName ? "2px solid #c4ff00" : "1px solid #2f2f2f",
//     backgroundColor: "#0e0e0e",
//     color: "#fff",
//     outline: "none",
//     transition: "all 0.2s ease",
//   });

//   const buttonStyle = {
//     backgroundColor: "#b6ff0e",
//     border: "none",
//     padding: "12px",
//     borderRadius: "8px",
//     fontWeight: "600",
//     cursor: "pointer",
//     width: "100%",
//     marginTop: "15px",
//   };

//   const handleSubmit = () => {
//     if (!fullName || !phone) {
//       return alert("Please fill in all required fields!");
//     }

//     const profileData = {
//       fullName,
//       phone,
//       skills: skills.split(",").map((s) => s.trim()),
//       github,
//       leetcode,
//       codeforces,
//       email: userEmail,
//     };

//     onSubmitProfile(profileData);
//   };

//   return (
//     <div style={containerStyle}>
//       <div style={cardStyle}>
//         <h2 style={{ color: "#c4ff00", marginBottom: "10px" }}>Student Profile</h2>
//         <p style={{ color: "#aaa", fontSize: "14px", marginBottom: "20px" }}>
//           Fill in your details to create your profile.
//         </p>

//         <input
//           type="text"
//           placeholder="Full Name"
//           style={getInputStyle("fullName")}
//           value={fullName}
//           onFocus={() => setFocusedInput("fullName")}
//           onBlur={() => setFocusedInput("")}
//           onChange={(e) => setFullName(e.target.value)}
//         />

//         <input
//           type="tel"
//           placeholder="Phone Number"
//           style={getInputStyle("phone")}
//           value={phone}
//           onFocus={() => setFocusedInput("phone")}
//           onBlur={() => setFocusedInput("")}
//           onChange={(e) => setPhone(e.target.value)}
//         />

//         <input
//           type="text"
//           placeholder="Skills (comma separated)"
//           style={getInputStyle("skills")}
//           value={skills}
//           onFocus={() => setFocusedInput("skills")}
//           onBlur={() => setFocusedInput("")}
//           onChange={(e) => setSkills(e.target.value)}
//         />

//         <input
//           type="url"
//           placeholder="GitHub Profile URL"
//           style={getInputStyle("github")}
//           value={github}
//           onFocus={() => setFocusedInput("github")}
//           onBlur={() => setFocusedInput("")}
//           onChange={(e) => setGithub(e.target.value)}
//         />

//         <input
//           type="url"
//           placeholder="LeetCode Profile URL"
//           style={getInputStyle("leetcode")}
//           value={leetcode}
//           onFocus={() => setFocusedInput("leetcode")}
//           onBlur={() => setFocusedInput("")}
//           onChange={(e) => setLeetcode(e.target.value)}
//         />

//         <input
//           type="url"
//           placeholder="Codeforces Profile URL"
//           style={getInputStyle("codeforces")}
//           value={codeforces}
//           onFocus={() => setFocusedInput("codeforces")}
//           onBlur={() => setFocusedInput("")}
//           onChange={(e) => setCodeforces(e.target.value)}
//         />

//         <button style={buttonStyle} onClick={handleSubmit}>
//           Save Profile
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Profile;
import React, { useState, useEffect } from "react";

const Profile = ({ userEmail, initialData, onSubmitProfile, onCancel }) => {
  const [fullName, setFullName] = useState(initialData?.fullName || "");
  const [phone, setPhone] = useState(initialData?.phone || "");
  const [skills, setSkills] = useState(initialData?.skills?.join(", ") || "");
  const [github, setGithub] = useState(initialData?.github || "");
  const [leetcode, setLeetcode] = useState(initialData?.leetcode || "");
  const [codeforces, setCodeforces] = useState(initialData?.codeforces || "");
  const [focusedInput, setFocusedInput] = useState("");

  const containerStyle = {
    backgroundColor: "#0a0a0a",
    color: "#fff",
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontFamily: "'Poppins', sans-serif",
    padding: "20px",
  };

  const cardStyle = {
    backgroundColor: "#111",
    padding: "40px",
    borderRadius: "15px",
    boxShadow: "0 0 20px rgba(0,255,0,0.2)",
    width: "450px",
  };

  const getInputStyle = (inputName) => ({
    width: "100%",
    padding: "10px",
    margin: "10px 0",
    borderRadius: "6px",
    border:
      focusedInput === inputName ? "2px solid #c4ff00" : "1px solid #2f2f2f",
    backgroundColor: "#0e0e0e",
    color: "#fff",
    outline: "none",
    transition: "all 0.2s ease",
  });

  const buttonStyle = {
    backgroundColor: "#b6ff0e",
    border: "none",
    padding: "12px",
    borderRadius: "8px",
    fontWeight: "600",
    cursor: "pointer",
    width: "100%",
    marginTop: "15px",
  };

  const cancelButtonStyle = {
    backgroundColor: "#333",
    border: "none",
    padding: "12px",
    borderRadius: "8px",
    fontWeight: "600",
    cursor: "pointer",
    width: "100%",
    marginTop: "10px",
    color: "#fff",
  };

  const handleSubmit = () => {
    if (!fullName || !phone) {
      return alert("Please fill in all required fields!");
    }

    const profileData = {
      fullName,
      phone,
      skills: skills.split(",").map((s) => s.trim()),
      github,
      leetcode,
      codeforces,
      email: userEmail,
    };

    onSubmitProfile(profileData);
  };

  return (
    <div style={containerStyle}>
      <div style={cardStyle}>
        <h2 style={{ color: "#c4ff00", marginBottom: "10px" }}>
          Student Profile
        </h2>
        <p style={{ color: "#aaa", fontSize: "14px", marginBottom: "20px" }}>
          Fill in your details to create or update your profile.
        </p>

        <input
          type="text"
          placeholder="Full Name"
          style={getInputStyle("fullName")}
          value={fullName}
          onFocus={() => setFocusedInput("fullName")}
          onBlur={() => setFocusedInput("")}
          onChange={(e) => setFullName(e.target.value)}
        />

        <input
          type="tel"
          placeholder="Phone Number"
          style={getInputStyle("phone")}
          value={phone}
          onFocus={() => setFocusedInput("phone")}
          onBlur={() => setFocusedInput("")}
          onChange={(e) => setPhone(e.target.value)}
        />

        <input
          type="text"
          placeholder="Skills (comma separated)"
          style={getInputStyle("skills")}
          value={skills}
          onFocus={() => setFocusedInput("skills")}
          onBlur={() => setFocusedInput("")}
          onChange={(e) => setSkills(e.target.value)}
        />

        <input
          type="url"
          placeholder="GitHub Profile URL"
          style={getInputStyle("github")}
          value={github}
          onFocus={() => setFocusedInput("github")}
          onBlur={() => setFocusedInput("")}
          onChange={(e) => setGithub(e.target.value)}
        />

        <input
          type="url"
          placeholder="LeetCode Profile URL"
          style={getInputStyle("leetcode")}
          value={leetcode}
          onFocus={() => setFocusedInput("leetcode")}
          onBlur={() => setFocusedInput("")}
          onChange={(e) => setLeetcode(e.target.value)}
        />

        <input
          type="url"
          placeholder="Codeforces Profile URL"
          style={getInputStyle("codeforces")}
          value={codeforces}
          onFocus={() => setFocusedInput("codeforces")}
          onBlur={() => setFocusedInput("")}
          onChange={(e) => setCodeforces(e.target.value)}
        />

        <button style={buttonStyle} onClick={handleSubmit}>
          Save Profile
        </button>
        <button style={cancelButtonStyle} onClick={onCancel}>
          Cancel
        </button>
      </div>
    </div>
  );
};

export default Profile;
