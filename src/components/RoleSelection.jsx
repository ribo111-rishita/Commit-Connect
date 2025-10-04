import React from "react";
import studentImg from "../assets/student.png";
import mentorImg from "../assets/mentor.png";

const RoleSelection = ({ onSelectRole }) => {
  return (
    <div
      style={{
        backgroundColor: "#0a0a0a",
        color: "#fff",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        fontFamily: "'Poppins', sans-serif",
        paddingTop: "80px", // ✅ space for fixed navbar
      }}
    >
      {/* Main Role Selection Section */}
      <div
        style={{
          textAlign: "center",
        }}
      >
        <h2 style={{ fontSize: "24px", marginBottom: "30px" }}>
          Are you applying as a Student or a Mentor?
        </h2>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "flex-start",
            gap: "80px",
            flexWrap: "wrap",
          }}
        >
          {/* Student Box */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              backgroundColor: "#111",
              padding: "40px 30px",
              borderRadius: "15px",
              boxShadow: "0 0 20px rgba(0,0,0,0.4)",
              width: "220px",
              transition: "transform 0.2s ease",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.transform = "scale(1.05)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.transform = "scale(1)")
            }
          >
            <img
              src={studentImg}
              alt="Student"
              style={{
                width: "90px",
                height: "90px",
                objectFit: "contain",
                marginBottom: "15px",
              }}
            />
            <button
              style={{
                padding: "12px 25px",
                border: "none",
                borderRadius: "10px",
                cursor: "pointer",
                color: "white",
                fontWeight: "600",
                background: "#4caf50",
                width: "130px",
              }}
              onClick={() => onSelectRole("student")}
            >
              Student
            </button>
          </div>

          {/* Mentor Box */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              backgroundColor: "#111",
              padding: "40px 30px",
              borderRadius: "15px",
              boxShadow: "0 0 20px rgba(0,0,0,0.4)",
              width: "220px",
              transition: "transform 0.2s ease",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.transform = "scale(1.05)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.transform = "scale(1)")
            }
          >
            <img
              src={mentorImg}
              alt="Mentor"
              style={{
                width: "90px",
                height: "90px",
                objectFit: "contain",
                marginBottom: "15px",
              }}
            />
            <button
              style={{
                padding: "12px 25px",
                border: "none",
                borderRadius: "10px",
                cursor: "pointer",
                color: "white",
                fontWeight: "600",
                background: "#4caf50",
                width: "130px",
              }}
              onClick={() => onSelectRole("mentor")}
            >
              Mentor
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoleSelection;
