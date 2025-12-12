import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import api from "../api/axios"; // your axios instance
import axios from "axios";
const palette = {
  dark: "#0E4D64",
  mid: "#3A6D8C",
  light: "#70C1B3",
  accent: "#F7FFF7",
};

export default function DoctorDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [doctor, setDoctor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!id) return;

    axios
      .get(
        `https://doctor-appointment-system-backend-2ulw.onrender.com/api/doctors/${id}`
      )
      .then((res) => {
        console.log("Doctor Detail Response:", res.data);
        setDoctor(res.data.doctor); // FIXED
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError("Failed to fetch doctor details.");
        setLoading(false);
      });
  }, [id]);

  const handleBook = () => {
    if (!doctor) return;

    navigate("/book", {
      state: {
        doctorId: doctor.id,
        doctorName: doctor.name,
        slots: doctor.slots || [],
      },
    });
  };

  if (loading) {
    return (
      <div
        style={{
          background: `linear-gradient(180deg, ${palette.dark}, #071730)`,
          minHeight: "100vh",
          color: palette.accent,
        }}
      >
        <div className="container py-5">
          <p className="text-center">Loading doctor details...</p>
        </div>
      </div>
    );
  }

  if (error || !doctor) {
    return (
      <div
        style={{
          background: `linear-gradient(180deg, ${palette.dark}, #071730)`,
          minHeight: "100vh",
          color: palette.accent,
        }}
      >
        <div className="container py-5">
          <Link to="/doctors" className="btn btn-sm btn-outline-light mb-3">
            <i className="bi bi-arrow-left"></i>
          </Link>

          <div className="alert alert-danger mt-3">{error}</div>
        </div>
      </div>
    );
  }

  return (
    <div
      style={{
        background: `linear-gradient(180deg, ${palette.dark}, #071730)`,
        minHeight: "100vh",
        color: palette.accent,
      }}
    >
      <div className="container py-5">
        <Link to="/doctors" className="btn btn-sm btn-outline-light mb-3">
          Go Back
        </Link>

        <div className="d-flex flex-column align-items-center text-center">
          <div style={{ maxWidth: 700 }}>
            <h2>{doctor.name}</h2>
            <p className="lead" style={{ color: "#cbdbe6" }}>
              {doctor.specialization}
            </p>

            <p style={{ color: "#cbdbe6" }}>
              Experience: <strong>{doctor.experience} years</strong>
            </p>

            <p style={{ color: "#cbdbe6" }}>
              Consultation Fees: <strong>₹{doctor.fees}</strong>
            </p>

            <p style={{ color: "#cbdbe6", maxWidth: 600 }}>
              {doctor.description ||
                `Dr. ${doctor.name} is a trusted specialist providing quality care.`}
            </p>

            <div className="d-flex flex-column align-items-center text-center">
              <h5>Available Slots</h5>

              {doctor.slots && doctor.slots.length > 0 ? (
                <div className="d-flex gap-2 flex-wrap justify-content-center">
                  {doctor.slots.map((slot) => (
                    <span
                      key={slot}
                      className="badge"
                      style={{
                        background: "rgba(255,255,255,0.08)",
                        border: "1px solid rgba(255,255,255,0.18)",
                        color: "#f7f7f7",
                        padding: "8px 10px",
                        borderRadius: 999,
                        fontSize: 13,
                      }}
                    >
                      {slot}
                    </span>
                  ))}
                </div>
              ) : (
                <p style={{ color: "#cbdbe6" }}>No slots available.</p>
              )}
            </div>

            <button
              className="btn mt-4"
              onClick={handleBook}
              style={{
                background: palette.mid,
                color: "#fff",
                padding: "10px 22px",
                borderRadius: 10,
              }}
            >
              Book Appointment
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
