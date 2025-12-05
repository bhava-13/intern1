import { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";
import { useEffect } from "react";
import axios from "axios";

export default function Register() {
  const navigate = useNavigate();
  const { registerUser } = useContext(AuthContext);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const validate = () => {
    if (!form.name.trim()) return "Name is required.";
    if (!form.email.trim()) return "Email is required.";
    if (!/\S+@\S+\.\S+/.test(form.email)) return "Enter a valid email.";
    if (form.password.length < 6)
      return "Password must be at least 6 characters.";
    if (form.password !== form.confirmPassword)
      return "Passwords do not match.";
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }

    setSubmitting(true);

    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/register",
        {
          name: form.name,
          email:form.email,
          password: form.password,
        }
      );

      

      navigate("/login");
    } catch (err) {
      console.error("REGISTER ERROR:", err);

      const msg =
        err?.response?.data?.message ||
        err?.response?.data?.error ||
        "Registration failed.";

      setError(msg);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: "560px" }}>
      <h2 className="mb-4 text-center">Register</h2>

      {error && <div className="alert alert-danger py-2">{error}</div>}

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Full name</label>
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            className="form-control"
            placeholder="Your full name"
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Email</label>
          <input
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            className="form-control"
            placeholder="you@example.com"
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Password</label>
          <input
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
            className="form-control"
            placeholder="At least 6 characters"
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Confirm Password</label>
          <input
            name="confirmPassword"
            type="password"
            value={form.confirmPassword}
            onChange={handleChange}
            className="form-control"
            placeholder="Repeat your password"
            required
          />
        </div>

        <button
          type="submit"
          className="btn btn-primary w-100"
          disabled={submitting}
        >
          {submitting ? "Creating account..." : "Create account"}
        </button>
      </form>

      <p className="mt-3 text-center">
        Already have an account? <Link to="/login">Login</Link>
      </p>
    </div>
  );
}
