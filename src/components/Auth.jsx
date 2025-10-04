import React from "react";

const Auth = ({ onAuth }) => {
  const containerStyle = {
    backgroundColor: "#0a0a0a",
    color: "#fff",
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    fontFamily: "'Poppins', sans-serif",
  };

  const navbarStyle = {
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "20px 60px",
    borderBottom: "1px solid #1f1f1f",
  };

  const logoStyle = {
    color: "#c4ff00",
    fontSize: "22px",
    fontWeight: "700",
  };

  const navLinksStyle = {
    display: "flex",
    gap: "40px",
    color: "#fff",
    fontSize: "15px",
  };

  const buttonStyle = {
    backgroundColor: "#c4ff00",
    border: "none",
    padding: "8px 18px",
    borderRadius: "6px",
    fontWeight: "600",
    cursor: "pointer",
  };

  const authBoxStyle = {
    flexGrow: 1,
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
    width: "100%",
    paddingRight: "10%",
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

  const continueBtnStyle = {
    ...buttonStyle,
    width: "100%",
    marginTop: "10px",
  };

  return (
    <div style={containerStyle}>
      {/* Navbar */}
      <div style={navbarStyle}>
        <div style={logoStyle}>Commit&Connect</div>
        <div style={navLinksStyle}>
          <span>About</span>
          <span>Timeline</span>
          <span>Contact</span>
          <span>FAQs</span>
          <button style={buttonStyle}>Login</button>
        </div>
      </div>

      {/* Auth Section */}
      <div style={authBoxStyle}>
        <div style={cardStyle}>
          <h2>Welcome to Commit Connect</h2>
          <p style={{ color: "#aaa", fontSize: "14px" }}>
            Connect with open-source mentors and start building 🚀
          </p>

          <input type="email" placeholder="Enter your email" style={inputStyle} />
          <input
            type="password"
            placeholder="Enter your password"
            style={inputStyle}
          />
          <button style={continueBtnStyle} onClick={onAuth}>
            Continue
          </button>

          <p style={{ color: "#c4ff00", fontSize: "13px", marginTop: "15px" }}>
            New to open source? <span style={{ textDecoration: "underline" }}>Let’s begin.</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Auth;
