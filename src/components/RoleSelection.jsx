import React from "react";
import studentImg from "../assets/student.png";
import mentorImg from "../assets/mentor.png";

const RoleSelection = ({ onSelectRole }) => {
  return (
    <div
      style={{
        background: "linear-gradient(135deg, #0a0a0a 0%, #111 100%)",
        color: "#fff",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "center",
        fontFamily: "'Poppins', sans-serif",
        paddingTop: "60px",
        position: "relative",
        overflow: "hidden",
      }}
    >
        <h2
    style={{
        fontSize: "28px",
        fontWeight: "700",
        marginBottom: "70px", // increased from 50px
        textAlign: "center",
        textShadow: "0 0 10px rgba(196,255,0,0.5)",
    }}
    >
    Are you applying as a Student or a Mentor?
    </h2>


      {/* Role Boxes */}
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
            borderRadius: "20px",
            boxShadow: "0 0 30px rgba(196,255,0,0.4)",
            width: "220px",
            transition: "all 0.3s ease",
            cursor: "pointer",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "scale(1.1) rotate(-2deg)";
            e.currentTarget.style.boxShadow = "0 0 50px rgba(196,255,0,0.7)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "scale(1) rotate(0deg)";
            e.currentTarget.style.boxShadow = "0 0 30px rgba(196,255,0,0.4)";
          }}
          onClick={() => onSelectRole("student")}
        >
          <img
            src={studentImg}
            alt="Student"
            style={{
              width: "100px",
              height: "100px",
              objectFit: "contain",
              marginBottom: "20px",
            }}
          />
          <button
            style={{
              padding: "12px 30px",
              border: "none",
              borderRadius: "15px",
              cursor: "pointer",
              fontWeight: "600",
              background: "linear-gradient(135deg, #4caf50, #c4ff00)",
              color: "#111",
              width: "140px",
              fontSize: "16px",
              boxShadow: "0 0 10px rgba(196,255,0,0.5)",
              transition: "all 0.3s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "scale(1.05)";
              e.currentTarget.style.boxShadow = "0 0 20px rgba(196,255,0,0.8)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "scale(1)";
              e.currentTarget.style.boxShadow = "0 0 10px rgba(196,255,0,0.5)";
            }}
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
            borderRadius: "20px",
            boxShadow: "0 0 30px rgba(196,255,0,0.4)",
            width: "220px",
            transition: "all 0.3s ease",
            cursor: "pointer",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "scale(1.1) rotate(2deg)";
            e.currentTarget.style.boxShadow = "0 0 50px rgba(196,255,0,0.7)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "scale(1) rotate(0deg)";
            e.currentTarget.style.boxShadow = "0 0 30px rgba(196,255,0,0.4)";
          }}
          onClick={() => onSelectRole("mentor")}
        >
          <img
            src={mentorImg}
            alt="Mentor"
            style={{
              width: "100px",
              height: "100px",
              objectFit: "contain",
              marginBottom: "20px",
            }}
          />
          <button
            style={{
              padding: "12px 30px",
              border: "none",
              borderRadius: "15px",
              cursor: "pointer",
              fontWeight: "600",
              background: "linear-gradient(135deg, #4caf50, #c4ff00)",
              color: "#111",
              width: "140px",
              fontSize: "16px",
              boxShadow: "0 0 10px rgba(196,255,0,0.5)",
              transition: "all 0.3s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "scale(1.05)";
              e.currentTarget.style.boxShadow = "0 0 20px rgba(196,255,0,0.8)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "scale(1)";
              e.currentTarget.style.boxShadow = "0 0 10px rgba(196,255,0,0.5)";
            }}
          >
            Mentor
          </button>
        </div>
      </div>
    </div>
  );
};

export default RoleSelection;
