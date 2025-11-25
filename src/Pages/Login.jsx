import { useState, useContext } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const { loginUser, isAuthenticated } = useContext(AuthContext);

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const from = location.state?.from?.pathname || "/";

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);

    try {
      // this will be mock for now, real API later
      await Promise.resolve(loginUser(form.email, form.password));

      // if login worked, go back to where user came from or home
      navigate(from, { replace: true });
    } catch (err) {
      console.error(err);
      setError("Login failed. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  // if user is already logged in and somehow lands on /login
  if (isAuthenticated) {
    navigate(from, { replace: true });
    return null;
  }

  return (
    <div className="container mt-5" style={{ maxWidth: "480px" }}>
      <h2 className="mb-4 text-center">Login</h2>

      {error && (
        <div className="alert alert-danger py-2">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Email</label>
          <input
            type="email"
            name="email"
            className="form-control"
            value={form.email}
            onChange={handleChange}
            placeholder="you@example.com"
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Password</label>
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
          className="btn btn-primary w-100"
          disabled={submitting}
        >
          {submitting ? "Logging in..." : "Login"}
        </button>
      </form>

      <p className="mt-3 text-center">
        Don’t have an account?{" "}
        <Link to="/register">Register</Link>
      </p>
    </div>
  );
}
