import Navbar from "../Components/Navbar.jsx";

import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";

const palette = {
  dark: "#001F3F",
  mid: "#3A6D8C",
  light: "#6A9AB0",
  accent: "#EAD8B1",
};

function Home() {
  const { user, isAuthenticated } = useContext(AuthContext);

  return (
    <>
      <Navbar />
      <div
        style={{
          background: `linear-gradient(180deg, ${palette.dark}, #071730)`,
          minHeight: "100vh",
          color: palette.accent,
        }}
      >
        <header className="container py-5">
          <div className="row align-items-center">
            <div className="col-md-7">
              <h1
                style={{
                  color: palette.accent,
                  fontWeight: 700,
                  fontSize: "2.8rem",
                  lineHeight: 1.05,
                }}
              >
                Verified specialists. Fast scheduling. Assurance delivered.
              </h1>
              <p
                className="lead mt-3"
                style={{ color: "#cbdbe6", maxWidth: 640 }}
              >
                Seamless booking, personalized doctor profiles, and appointment
                reminders. Find available slots, confirm in seconds, and keep
                your health on track.
              </p>

              <div className="d-flex gap-3 mt-4 flex-wrap">
                <Link
                  to="/doctors"
                  className="btn btn-light text-danger-emphasis"
                  style={{ padding: "10px 22px", borderRadius: 10 }}
                >
                  View Doctors
                </Link>
                <Link
                  to="/book"
                  className="btn btn-light text-danger-emphasis"
                  style={{ padding: "10px 22px", borderRadius: 10 }}
                >
                  Book Appointment
                </Link>
              </div>
            </div>
          </div>
        </header>

        <section className="container py-5">
          <h3 style={{ color: palette.accent, marginBottom: 18 }}>
            Why We’re A Trusted Choice
          </h3>

          <div className="row">
            <FeatureCard
              title="Easy Booking"
              desc="Pick a date & slot, confirm in one click, get reminder."
              icon="🗓️"
              palette={palette}
            />
            <FeatureCard
              title="Verified Doctors"
              desc="Profiles with specialization, experience and fees."
              icon="🩺"
              palette={palette}
            />
            <FeatureCard
              title="Manage Your Appointments"
              desc="View, reschedule or cancel from your profile."
              icon="🔁"
              palette={palette}
            />
          </div>
        </section>

        <footer
          style={{
            background: `linear-gradient(180deg, rgba(0,0,0,0.18), rgba(0,0,0,0.28))`,
          }}
          className="py-4"
        >
          <div className="container d-flex justify-content-between align-items-center flex-column flex-md-row gap-3">
            <div style={{ color: "#cde3ee" }}>
              <strong>Ready to book?</strong> — Choose a doctor and secure a
              slot instantly.
            </div>

            <div className="d-flex gap-2">
              <Link
                to="/book"
                className="btn btn-light text-danger-emphasis"
                style={{ padding: "10px 22px", borderRadius: 10 }}
              >
                View Doctors
              </Link>
              <Link
                to="/doctors"
                className="btn btn-light text-danger-emphasis"
                style={{ borderRadius: 8 }}
              >
                Book Appointment
              </Link>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}

function FeatureCard({ title, desc, icon, palette }) {
  return (
    <div className="col-md-4 mb-3">
      <div
        style={{
          background: "rgba(255,255,255,0.03)",
          border: `1px solid rgba(255,255,255,0.05)`,
          padding: 18,
          borderRadius: 12,
          minHeight: 120,
        }}
      >
        <div style={{ fontSize: 28 }}>{icon}</div>
        <h5 style={{ color: palette.light, marginTop: 8 }}>{title}</h5>
        <p style={{ color: "#c6dde8" }}>{desc}</p>
      </div>
    </div>
  );
}
export default Home;
