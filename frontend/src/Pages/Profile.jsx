import React, { useEffect, useState } from "react";
import Navbar from "../Components/Navbar.jsx";
import api from "../api/axios";

const palette = {
  dark: "#0E4D64", 
  mid: "#1D8A99",
  light: "#6A9AB0",
  accent: "#F7FFF7", 
  neutral: "#DDECEC",
};

function Profile() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        setError("");

        const res = await api.get("/api/user/profile");
        const data = res.data || {};

        setFormData({
          name: data.name || "",
          email: data.email || "",
          phone: data.phone || "",
        });
      } catch (err) {
        console.error("Load profile error:", err);
        const msg =
          err?.response?.data?.message ||
          err?.response?.data?.error ||
          "Failed to load profile.";
        setError(msg);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setSuccess("");
    setError("");

    try {
      const res = await api.put("/api/user/profile", formData);
      const updated = res.data || formData;

      setFormData({
        name: updated.name || "",
        email: updated.email || "",
        phone: updated.phone || "",
      });

      setSuccess("Profile updated successfully");
    } catch (err) {
      console.error("Update profile error:", err);
      const msg =
        err?.response?.data?.message ||
        err?.response?.data?.error ||
        "Failed to update";
      setError(msg);
    } finally {
      setSaving(false);
    }
  };

  return (
    <>
      <Navbar />
      <div
        style={{
          background: `linear-gradient(180deg, ${palette.dark}, ${palette.mid})`,
          minHeight: "100vh",
        }}
      >
        <div className="container py-4" style={{ minHeight: "100vh" }}>
          <div className="row justify-content-center">
            <div className="col-md-6">
              <div
                className="card shadow"
                style={{
                  backgroundColor: "white",
                  border: `1px solid ${palette.mid}`,
                }}
              >
                <div className="card-body">
                  <h3
                    className="text-center mb-3"
                    style={{ color: palette.dark }}
                  >
                    My Profile
                  </h3>

                  {loading ? (
                    <p className="text-center mb-0">Loading profile</p>
                  ) : (
                    <>
                      {error && (
                        <div className="alert alert-danger py-2">{error}</div>
                      )}
                      {success && (
                        <div className="alert alert-success py-2">
                          {success}
                        </div>
                      )}

                      <form onSubmit={handleSubmit}>
                        {/* NAME */}
                        <div className="mb-3">
                          <label
                            className="form-label"
                            style={{ color: palette.dark }}
                          >
                            Name
                          </label>
                          <input
                            type="text"
                            name="name"
                            className="form-control"
                            value={formData.name}
                            onChange={handleChange}
                            style={{ borderColor: palette.mid }}
                            required
                          />
                        </div>

                        {/* EMAIL */}
                        <div className="mb-3">
                          <label
                            className="form-label"
                            style={{ color: palette.dark }}
                          >
                            Email
                          </label>
                          <input
                            type="email"
                            name="email"
                            className="form-control"
                            value={formData.email}
                            onChange={handleChange}
                            style={{ borderColor: palette.mid }}
                            required
                          />
                        </div>
                        <div className="mb-3">
                          <label
                            className="form-label"
                            style={{ color: palette.dark }}
                          >
                            Phone
                          </label>
                          <input
                            type="text"
                            name="phone"
                            className="form-control"
                            value={formData.phone}
                            onChange={handleChange}
                            style={{ borderColor: palette.mid }}
                          />
                        </div>

                        {/* BUTTON */}
                        <button
                          type="submit"
                          className="btn w-100"
                          disabled={saving}
                          style={{
                            backgroundColor: palette.dark,
                            color: palette.accent,
                          }}
                        >
                          {saving ? "Saving..." : "Save Changes"}
                        </button>
                      </form>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Profile;
