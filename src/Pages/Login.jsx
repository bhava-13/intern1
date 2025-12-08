import React, { useState, useContext, useEffect } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";
import axios from "axios";

const palette = {
  dark: "#0E4D64",        // Deep Teal
  mid: "#1D8A99",         // Medium Calm Teal
  light: "#70C1B3",       // Soft Mint
  accent: "#F7FFF7",      // Soft White Green
  neutral: "#DDECEC", 
  
};

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const { loginUser, isAuthenticated } = useContext(AuthContext);

  const [form, setForm] = useState({ email: "", password: "" });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const from = location.state?.from?.pathname || "/";


  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);

    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/login",
        {
          email: form.email,
          password: form.password,
        }
      );

      console.log("login successful",response.data);

   
    await loginUser(form.email, form.password);


   
    navigate("/home", { replace: true });
    } catch (err) {
      console.error("Login failed:", err);
      const msg =
        err?.response?.data?.message ||
        err?.response?.data?.error ||
        err?.message ||
        "Login failed. Please try again.";
      setError(msg);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div style={{background: `linear-gradient(180deg, ${palette.dark}, ${palette.mid})`, 
    minHeight: "100vh", 
    display: "flex",
    justifyContent: "center"}}>
    <div className="container mt-5" style={{ maxWidth: "480px" }}>
      <h2 className="mb-4 text-center text-light">Login</h2>

      {error && <div className="alert alert-danger py-2">{error}</div>}

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label text-light">Email</label>
          <input
            type="email"
            name="email"
            className="form-control"
            value={form.email}
            onChange={handleChange}
            placeholder="example@mail.com"
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label text-light">Password</label>
          <input
            type="password"
            name="password"
            className="form-control"
            value={form.password}
            onChange={handleChange}
            placeholder="Enter your password"
            required
          />
        </div>

        <button
          type="submit"
          className="btn btn-outline-light w-100"
          disabled={submitting}
        >
          {submitting ? "Logging in" : "Login"}
        </button>
      </form>

      <p className="mt-3 text-center text-light">
        Don’t have an account? <Link to="/register">Register</Link>
      </p>
    </div>
    </div>
  );
}
