import { useState, useEffect } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const { loginWithRedirect, isAuthenticated, user, logout } = useAuth0();

  // Redirect user after Auth0 login
  useEffect(() => {
    if (isAuthenticated && user) {
      if (user.email === "admin@example.com") {
        navigate("/admin");
      } else {
        navigate("/");
      }
    }
  }, [isAuthenticated, user, navigate]);

  // Traditional login
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/auth/login", { email, password });
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.role);

      if (res.data.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/");
      }
    } catch (err) {
      alert("Login failed. Please check your credentials.");
      console.error(err.response?.data || err);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Welcome Back</h2>

        {/* Traditional Login */}
        <form onSubmit={handleLogin} style={styles.form}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={styles.input}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={styles.input}
          />
          <button type="submit" style={{ ...styles.btn, ...styles.btnPrimary }}>
            Login
          </button>
        </form>

        <div style={styles.divider}>OR</div>

        {/* Auth0 Login */}
        <button
          onClick={() => loginWithRedirect()}
          style={{ ...styles.btn, ...styles.btnAuth }}
        >
          Login with Auth0 / OAuth2
        </button>

        {/* Logout button if authenticated */}
        {isAuthenticated && (
          <button
            onClick={() => logout({ returnTo: window.location.origin })}
            style={{ ...styles.btn, ...styles.btnLogout }}
          >
            Logout
          </button>
        )}
      </div>
    </div>
  );
}

const styles = {


  container: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f4f6f8",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  },
  card: {
    width: "100%",
    maxWidth: "400px",
    backgroundColor: "#fff",
    borderRadius: "10px",
    padding: "40px 30px",
    boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
    textAlign: "center",
  },
  title: {
    marginBottom: "30px",
    color: "#333",
  },
  form: {
    display: "flex",
    flexDirection: "column",
  },
  input: {
    padding: "12px 15px",
    marginBottom: "15px",
    borderRadius: "5px",
    border: "1px solid #ccc",
    fontSize: "14px",
    transition: "border-color 0.3s",
  },
  btn: {
    padding: "12px",
    borderRadius: "5px",
    border: "none",
    cursor: "pointer",
    fontSize: "16px",
    marginBottom: "15px",
    transition: "all 0.3s ease",
  },
  btnPrimary: {
    backgroundColor: "#c36717ff",
    color: "#fff",
  },
  btnAuth: {
    backgroundColor: "#a99c94ff",
    color: "#fff",
    height: "100px",
    width: "100%",
  },
  btnLogout: {
    backgroundColor: "#f44336",
    color: "#fff",
  },
  divider: {
    margin: "15px 0",
    fontWeight: "bold",
    color: "#999",
  },
};

export default Login;
