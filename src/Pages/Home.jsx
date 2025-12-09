import Navbar from "../Components/Navbar.jsx";

import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";

const palette = {
  dark: "#0E4D64",        // Deep Teal
  mid: "#1D8A99",         // Medium Calm Teal
  light: "#70C1B3",       // Soft Mint
  accent: "#F7FFF7",      // Soft White Green
  neutral: "#DDECEC", 
  
};

function Home() {
  const { user, isAuthenticated } = useContext(AuthContext);

  return (
    <>
      <Navbar />
      <div
        style={{
          background: `linear-gradient(180deg, ${palette.dark}, ${palette.mid})`,
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
                style={{
                  color: palette.neutral,
                  maxWidth: 640,
                }}
              >
                Seamless booking, personalized doctor profiles, and appointment
                reminders. Find available slots, confirm in seconds, and keep
                your health on track.
              </p>

              <div className="d-flex gap-3 mt-4 flex-wrap">
                <Link
                  to="/doctors"
                  className="btn"
                  style={{
                    padding: "10px 22px",
                    borderRadius: 10,
                    backgroundColor: palette.accent,
                    color: palette.dark,
                    border: "none",
                  }}
                >
                  View Doctors
                </Link>

                <Link
                  to="/book"
                  className="btn"
                  style={{
                    padding: "10px 22px",
                    borderRadius: 10,
                    backgroundColor: palette.accent,
                    color: palette.dark,
                    border: "none",
                  }}
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
              icon={<i className="bi bi-calendar-check text-dark"></i>}
              palette={palette}
              index={1}
            />
            <FeatureCard
              title="Verified Doctors"
              desc="Profiles with specialization, experience and fees."
              icon={<i className="bi bi-heart-pulse text-dark"></i>}
              palette={palette}
              index={1}
            />
            <FeatureCard
              title="Manage Your Appointments"
              desc="View, reschedule or cancel from your profile."
              icon={<i className="bi bi-pencil-square text-dark"></i>}
              palette={palette}
              index={1}
            />
          </div>
        </section>

        <footer
          style={{
            background: `linear-gradient(180deg, rgba(0,0,0,0.15), rgba(0,0,0,0.25))`,
          }}
          className="py-4"
        >
          <div className="container d-flex justify-content-between align-items-center flex-column flex-md-row gap-3">
            <div style={{ color: palette.neutral }}>
              <strong>Ready to book?</strong> — Choose a doctor and secure a
              slot instantly.
            </div>

            <div className="d-flex gap-2">
              <Link
                to="/book"
                className="btn"
                style={{
                  padding: "10px 22px",
                  borderRadius: 10,
                  backgroundColor: palette.accent,
                  color: palette.dark,
                  border: "none",
                }}
              >
                View Doctors
              </Link>

              <Link
                to="/doctors"
                className="btn"
                style={{
                  borderRadius: 8,
                  backgroundColor: palette.accent,
                  color: palette.dark,
                  border: "none",
                }}
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

function FeatureCard({ title, desc, icon, palette, index }) {
  
  const cardColors = [
    palette.accent,  // #F7FFF7
    palette.neutral, // #DDECEC
    
  ];

  const bg = cardColors[index]; // choose based on card position
  const textColor = palette.dark; // deep teal for readability

  return (
    <div className="col-md-4 mb-3">
      <div
        style={{
          background: bg,
          border: "none",
          padding: 18,
          borderRadius: 12,
          minHeight: 120,
          boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
        }}
      >
        <div style={{ fontSize: 36}}>{icon}</div>

        <h5 style={{ color: textColor, marginTop: 8 }}>
          {title}
        </h5>

        <p style={{ color: textColor, opacity: 0.8 }}>
          {desc}
        </p>
      </div>
    </div>
  );
}


export default Home;
