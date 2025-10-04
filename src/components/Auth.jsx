import React, { useState } from "react";

const Auth = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email && password) {
      onLogin(email);
    } else {
      alert("Please enter both email and password!");
    }
  };

  const styles = {
    container: {
      backgroundColor: "#0b0b0b",
      color: "#ffffff",
      fontFamily: "Poppins, sans-serif",
      minHeight: "100vh",
      width: "100vw", // full screen width
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      padding: "0 20px", // so inputs don’t hit screen edges
    },
    title: {
      fontSize: "2rem",
      fontWeight: "700",
      marginBottom: "10px",
      textAlign: "center",
    },
    subtitle: {
      fontSize: "1rem",
      color: "#aaaaaa",
      marginBottom: "30px",
      textAlign: "center",
    },
    input: {
      width: "100%",
      maxWidth: "400px", // keep it readable
      padding: "14px",
      marginBottom: "20px",
      borderRadius: "10px",
      border: "1px solid rgba(182,255,13,0.3)",
      backgroundColor: "#1a1a1a",
      color: "#ffffff",
      fontSize: "1rem",
      outline: "none",
    },
    inputFocus: {
      border: "1px solid #b6ff0d",
      boxShadow: "0 0 8px rgba(182,255,13,0.5)",
    },
    button: {
      width: "100%",
      maxWidth: "400px",
      backgroundColor: "#b6ff0d",
      color: "#000000",
      padding: "14px",
      borderRadius: "12px",
      border: "none",
      fontWeight: "600",
      fontSize: "1.05rem",
      cursor: "pointer",
      transition: "all 0.3s ease",
    },
    buttonHover: {
      backgroundColor: "#d0ff4a",
      boxShadow: "0 0 15px rgba(182,255,13,0.6)",
    },
    footer: {
      marginTop: "25px",
      fontSize: "0.95rem",
      color: "#aaaaaa",
      textAlign: "center",
    },
    accent: {
      color: "#b6ff0d",
      fontWeight: "600",
      cursor: "pointer",
    },
  };

  const [inputFocus, setInputFocus] = useState({ email: false, password: false });
  const [hover, setHover] = useState(false);

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Welcome to Commit Connect</h1>
      <p style={styles.subtitle}>
        Connect with open-source mentors and start building 🚀
      </p>

      <form onSubmit={handleSubmit} style={{ width: "100%", maxWidth: "400px" }}>
        <input
          type="email"
          placeholder="Enter your email"
          style={{
            ...styles.input,
            ...(inputFocus.email ? styles.inputFocus : {}),
          }}
          onFocus={() => setInputFocus({ ...inputFocus, email: true })}
          onBlur={() => setInputFocus({ ...inputFocus, email: false })}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Enter your password"
          style={{
            ...styles.input,
            ...(inputFocus.password ? styles.inputFocus : {}),
          }}
          onFocus={() => setInputFocus({ ...inputFocus, password: true })}
          onBlur={() => setInputFocus({ ...inputFocus, password: false })}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          type="submit"
          style={{
            ...styles.button,
            ...(hover ? styles.buttonHover : {}),
          }}
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
        >
          Continue
        </button>
      </form>

      <p style={styles.footer}>
        New to open source? <span style={styles.accent}>Let’s begin.</span>
      </p>
    </div>
  );
};

export default Auth;
