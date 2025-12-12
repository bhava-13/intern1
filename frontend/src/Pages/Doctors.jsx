import Navbar from "../Components/Navbar";
import React, { useEffect, useState, useMemo } from "react";
import { Link } from "react-router-dom";
import api from "../api/axios";
import axios from "axios";

const palette = {
  dark: "#0E4D64",
  mid: "#1D8A99",
  light: "#6A9AB0",
  accent: "#F7FFF7",
};

export default function Doctors() {
  const [doctors, setDoctors] = useState([]);
  const [specialization, setSpecialization] = useState("All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // GET all doctors from backend
useEffect(() => {
  axios
    .get("https://doctor-appointment-system-backend-2ulw.onrender.com/api/doctors")
    .then((res) => {
      console.log(res.data);
      setDoctors(res.data.doctors);  // <-- FIXED
      setLoading(false);
    })
    .catch((err) => {
      console.error("Error fetching doctors", err);
      setLoading(false);
    });
}, []);


  // Extract unique specializations for dropdown
  const specializations = useMemo(() => {
    const set = new Set(doctors.map((d) => d.specialization));
    return ["All", ...Array.from(set)];
  }, [doctors]);

  // Filter doctors when specialization changes
  const filteredDoctors = useMemo(() => {
    if (specialization === "All") return doctors;
    return doctors.filter((d) => d.specialization === specialization);
  }, [doctors, specialization]);

  return (
    <>
      <Navbar />
      <div
        style={{
          background: palette.dark,
          minHeight: "100vh",
          color: palette.accent,
        }}
      >
        <div className="container py-5">
          <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-3">
            <div>
              <h2 className="mb-1">Find a Doctor</h2>
              <p className="mb-0 text-light" style={{ color: "#cbdbe6" }}>
                Browse verified specialists and view their availability.
              </p>
            </div>

            {/* Specialization Filter */}
            <div>
              <label className="form-label me-2 mb-0">Specialization</label>
              <select
                className="form-select"
                style={{ minWidth: 220 }}
                value={specialization}
                onChange={(e) => setSpecialization(e.target.value)}
              >
                {specializations.map((spec) => (
                  <option key={spec} value={spec}>
                    {spec}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Loading State */}
          {loading && <p style={{ color: "#cbdbe6" }}>Loading doctors...</p>}

          {/* Error State */}
          {error && <div className="alert alert-danger">{error}</div>}

          {/* No doctors */}
          {!loading && filteredDoctors.length === 0 && (
            <p style={{ color: "#cbdbe6" }}>No doctors found.</p>
          )}

          {/* Doctors Grid */}
          <div className="row">
            {filteredDoctors.map((doctor) => (
              <div className="col-md-4 mb-4" key={doctor._id}>
                <DoctorCard doctor={doctor} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

function DoctorCard({ doctor }) {
  return (
    <div
      className="card h-100 border border-light"
      style={{
        background: "rgba(255,255,255,0.03)",
        border: "3px solid rgba(255,255,255,0.08)",
        color: "#f5f5f5",
      }}
    >
      <div className="card-body d-flex flex-column">
        <h5 className="card-title mb-1">{doctor.name}</h5>
        <p className="card-subtitle mb-2" style={{ color: "#cbdbe6" }}>
          {doctor.specialization}
        </p>

        <p className="mb-1" style={{ color: "#cbdbe6", fontSize: 14 }}>
          Experience: <strong>{doctor.experience} years</strong>
        </p>
        <p className="mb-3" style={{ color: "#cbdbe6", fontSize: 14 }}>
          Fees: <strong>₹{doctor.fees}</strong>
        </p>

        <div className="mt-auto d-flex justify-content-between align-items-center">
          <span style={{ fontSize: 13, color: "#9fb7c8" }}>
            Slots: {doctor.slots?.slice(0, 2).join(", ")}
            {doctor.slots && doctor.slots.length > 2 ? "..." : ""}
          </span>

          <Link to={`/doctors/${doctor._id}`} className="btn btn-outline-light">
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
}
