import React from "react";
import logo from "../assets/img.png";

const Navbar = () => {
  const navbarStyle = {
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "20px 5%", // use percentage for responsiveness
    borderBottom: "1px solid #1f1f1f",
    boxSizing: "border-box", // important to prevent overflow
  };

  const logoContainerStyle = {
    display: "flex",
    alignItems: "center",
    gap: "10px",
  };

  const logoImageStyle = {
    width: "40px",
    height: "40px",
    borderRadius: "8px",
    objectFit: "cover",
  };

  const logoTextStyle = {
    color: "#c4ff00",
    fontSize: "22px",
    fontWeight: "700",
  };

  const navLinksStyle = {
    display: "flex",
    gap: "30px", // reduced gap for better fit
    alignItems: "center",
    color: "#fff",
    fontSize: "15px",
    flexWrap: "wrap", // wrap on smaller screens
  };

  const buttonStyle = {
    backgroundColor: "#c4ff00",
    border: "none",
    padding: "8px 18px",
    borderRadius: "6px",
    fontWeight: "600",
    cursor: "pointer",
  };

  return (
    <div style={navbarStyle}>
      <div style={logoContainerStyle}>
        <img src={logo} alt="Commit&Connect Logo" style={logoImageStyle} />
        <span style={logoTextStyle}>Commit&Connect</span>
      </div>
      <div style={navLinksStyle}>
        <span>About</span>
        <span>Timeline</span>
        <span>Contact</span>
        <span>FAQs</span>
        <button style={buttonStyle}>Login</button>
      </div>
    </div>
  );
};

export default Navbar;
