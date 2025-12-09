import React from "react";
import { Link } from "react-router-dom";

const palette = {
  deepTeal: "#0E4D64",        // main dark bg
  mediumTeal: "#1D8A99",      // secondary
  softMint: "#70C1B3",
  softWhiteGreen: "#F7FFF7",
  neutral: "#DDECEC",
  white: "#FFFFFF",
};

export default function Landing() {
  return (
    <div
      style={{
        minHeight: "100vh",
        width: "100vw",
        margin: 0,
        padding: 0,
        background: `linear-gradient(135deg, ${palette.deepTeal}, ${palette.mediumTeal})`,
        color: palette.softWhiteGreen,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        className="text-center"
        style={{ maxWidth: 650, padding: "0 1rem" }}
      >
        <h1 style={{ fontSize: "3rem", fontWeight: 700 }}>
          doctor-appointment
        </h1>

        <p
          className="lead mt-3"
          style={{
            color: palette.neutral,
            margin: "0 auto",
          }}
        >
          Find verified doctors, book appointments instantly, and manage your
          health with a smooth, reliable experience.
        </p>

        <div className="d-flex justify-content-center gap-3 mt-4 flex-wrap">
          <Link
            to="/login"
            className="btn"
            style={{
              padding: "10px 24px",
              borderRadius: 999,
              backgroundColor: palette.softWhiteGreen,
              color: palette.deepTeal,
              border: "none",
              fontWeight: 600,
            }}
          >
            Login
          </Link>

          <Link
            to="/register"
            className="btn"
            style={{
              padding: "10px 24px",
              borderRadius: 999,
              backgroundColor: "transparent",
              color: palette.softWhiteGreen,
              border: `1px solid ${palette.softMint}`,
              fontWeight: 600,
            }}
          >
            Create Account
          </Link>
        </div>

        <p
          className="mt-3 mb-0"
          style={{ fontSize: "0.9rem", color: palette.softWhiteGreen }}
        >
          No long queues. No confusion. Just effortless healthcare.
        </p>
      </div>
    </div>
  );
}
