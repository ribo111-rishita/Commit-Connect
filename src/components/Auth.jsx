import React, { useState } from "react";

const Auth = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false); // ✅ remember me state

  const containerStyle = {
    backgroundColor: "#0a0a0a",
    color: "#fff",
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    fontFamily: "'Poppins', sans-serif",
    paddingTop: "5px",
  };

  const mainSectionStyle = {
    flexGrow: 1,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    padding: "80px 10% 0 10%",
  };

  const leftTextStyle = {
    flex: 1,
    paddingRight: "40px",
  };

  const headingStyle = {
    fontSize: "64px",
    fontWeight: "800",
    color: "#b6ff0d",
    marginBottom: "20px",
    lineHeight: "1.2",
  };

  const subTextStyle = {
    fontSize: "18px",
    color: "#aaa",
    marginBottom: "12px",
    maxWidth: "400px",
    lineHeight: "1.6",
  };

  const authBoxStyle = {
    flex: 1,
    display: "flex",
    justifyContent: "flex-end",
  };

  const cardStyle = {
    backgroundColor: "#111",
    padding: "40px",
    borderRadius: "15px",
    boxShadow: "0 0 20px rgba(0,0,0,0.4)",
    width: "350px",
    textAlign: "center",
  };

  const inputStyle = {
    width: "100%",
    padding: "10px",
    margin: "10px 0",
    borderRadius: "6px",
    border: "1px solid #2f2f2f",
    backgroundColor: "#0e0e0e",
    color: "#fff",
  };

  const checkboxContainer = {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    marginTop: "10px",
    fontSize: "14px",
    color: "#aaa",
    cursor: "pointer",
  };

  const buttonStyle = {
    backgroundColor: "#c4ff00",
    border: "none",
    padding: "8px 18px",
    borderRadius: "6px",
    fontWeight: "600",
    cursor: "pointer",
    width: "100%",
    marginTop: "15px",
  };

  const handleContinue = () => {
    if (!email) return alert("Please enter your email!");

    if (remember) {
      // ✅ Save login info
      localStorage.setItem("user", email);
    } else {
      // ✅ Clear previous saved login if unchecked
      localStorage.removeItem("user");
    }

    onLogin(email);
  };

  return (
    <div style={containerStyle}>
      {/* Main Section */}
      <div style={mainSectionStyle}>
        {/* Left Side Text */}
        <div style={leftTextStyle}>
          <h1 style={headingStyle}>Build. Connect. Grow.</h1>
          <p style={subTextStyle}>
            Find mentors who guide you through real open-source contributions.
          </p>
          <p style={subTextStyle}>
            Take skill quizzes & get matched with the right mentor.
          </p>
          <p style={subTextStyle}>
            Build your portfolio with projects & showcase your skills.
          </p>
          <p style={{ color: "#b6ff0d", fontSize: "16px", marginTop: "20px" }}>
            Your journey into open-source starts here.
          </p>
        </div>

        {/* Right Side Auth Box */}
        <div style={authBoxStyle}>
          <div style={cardStyle}>
            <h2>Welcome to Commit Connect</h2>
            <p style={{ color: "#aaa", fontSize: "14px" }}>
              Connect with open-source mentors and start building
            </p>

            <input
              type="email"
              placeholder="Enter your email"
              style={inputStyle}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Enter your password"
              style={inputStyle}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            {/* ✅ Remember me checkbox */}
            <label style={checkboxContainer}>
              <input
                type="checkbox"
                checked={remember}
                onChange={() => setRemember(!remember)}
              />
              Remember me
            </label>

            <button style={buttonStyle} onClick={handleContinue}>
              Continue
            </button>

            <p style={{ color: "#c4ff00", fontSize: "13px", marginTop: "15px" }}>
              New to open source?{" "}
              <span style={{ textDecoration: "underline", cursor: "pointer" }}>
                Let’s begin.
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
