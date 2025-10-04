import React, { useState } from "react";
import logo from "../assets/img.png";

const Navbar = ({ user, onLogout, onEditProfile }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const navbarStyle = {
    width: "100%",
    backgroundColor: "#000",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "10px 2%",
    borderBottom: "1px solid #1f1f1f",
    boxSizing: "border-box",
    position: "fixed",
    top: 0,
    left: 0,
    zIndex: 1000,
    boxShadow: "0 2px 10px rgba(0,0,0,0.4)",
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
    gap: "30px",
    alignItems: "center",
    color: "#fff",
    fontSize: "15px",
    flexWrap: "wrap",
    cursor: "pointer",
    position: "relative",
  };

  const userMenuStyle = {
    position: "relative",
    cursor: "pointer",
    color: "#c4ff00",
    fontWeight: "600",
  };

  const dropdownStyle = {
    position: "absolute",
    top: "100%",
    right: 0,
    backgroundColor: "#111",
    border: "1px solid #333",
    borderRadius: "8px",
    minWidth: "150px",
    padding: "8px 0",
    boxShadow: "0 2px 10px rgba(0,0,0,0.6)",
    display: dropdownOpen ? "block" : "none",
    zIndex: 2000,
  };

  const dropdownItemStyle = {
    padding: "10px 15px",
    color: "#fff",
    cursor: "pointer",
  };

  return (
    <div style={navbarStyle}>
      {/* Logo section */}
      <div style={logoContainerStyle}>
        <img src={logo} alt="Commit&Connect Logo" style={logoImageStyle} />
        <span style={logoTextStyle}>Commit&Connect</span>
      </div>

      {/* Links + User Section */}
      <div style={navLinksStyle}>
        <span>About</span>
        <span>LeaderBoard</span>
        <span>Contact</span>
        <span>FAQs</span>

        {/* ✅ User Dropdown */}
        {user && (
          <div
            style={userMenuStyle}
            onClick={() => setDropdownOpen(!dropdownOpen)}
          >
            {user}
            <div style={dropdownStyle}>
              <div
                style={dropdownItemStyle}
                onClick={() => {
                  setDropdownOpen(false);
                  onEditProfile();
                }}
                onMouseOver={(e) =>
                  (e.currentTarget.style.backgroundColor = "#333")
                }
                onMouseOut={(e) =>
                  (e.currentTarget.style.backgroundColor = "transparent")
                }
              >
                Edit Profile
              </div>
              <div
                style={dropdownItemStyle}
                onClick={() => {
                  setDropdownOpen(false);
                  onLogout();
                }}
                onMouseOver={(e) =>
                  (e.currentTarget.style.backgroundColor = "#333")
                }
                onMouseOut={(e) =>
                  (e.currentTarget.style.backgroundColor = "transparent")
                }
              >
                Logout
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
