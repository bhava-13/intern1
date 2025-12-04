import React, { useMemo } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import doctorsData from "../data/doctors.json";

const palette = {
  dark: "#001F3F",
  mid: "#3A6D8C",
  light: "#6A9AB0",
  accent: "#EAD8B1",
};

export default function DoctorDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

 
  const doctor = useMemo(
    () => doctorsData.find((d) => d.id === id),
    [id]
  );

  const handleBook = () => {
    if (!doctor) return;
    navigate("/book", {
      state: {
        doctorId: doctor.id,
        doctorName: doctor.name,
      },
    });
  };

  const notFound = !doctor;

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
          ⬅ 
        </Link>

        {notFound ? (
          <div className="alert alert-danger mt-3">
            Doctor not found. Please go back and select from the list.
          </div>
        ) : (
          <div
  className="d-flex flex-column align-items-center text-center"
  style={{ width: "100%" }}
>
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
                Dr. {doctor.name.split(" ").slice(1).join(" ") || doctor.name} is
                a trusted specialist with a strong track record of patient care,
                known for clear diagnosis and patient-friendly explanations.
              </p>

              <div className="d-flex flex-column align-items-center text-center">
                <h5>Available Slots</h5>
                {doctor.slots && doctor.slots.length > 0 ? (
                  <div className="d-flex justify-center gap-2">
                    {doctor.slots.map((s) => (
                      <span
                        key={s}
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
                        {s}
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
        )}
      </div>
    </div>
  );
}
