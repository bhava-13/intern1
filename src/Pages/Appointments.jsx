import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../Components/Navbar.jsx";
import axios from "axios";

const palette = {
  dark: "#0E4D64", // Deep Teal
  mid: "#1D8A99", // Medium Calm Teal
  light: "#70C1B3", // Soft Mint
  accent: "#F7FFF7", // Soft White Green
  neutral: "#DDECEC",
};

export default function Appointments() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadAppointments = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        "http://localhost:5000/api/appointments/user"
      );
      setAppointments(response.data);
    } catch (err) {
      setError("Failed to load appointments");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAppointments();
  }, []);


  const handleCancel = async (id) => {
    try {
      await axios.put(`http://localhost:5000/api/appointments/cancel/${id}`);
      
      setAppointments(appointments.filter((a) => a.id !== id));
    } catch (err) {
      console.error(err);
      alert("Failed to cancel appointment");
    }
  };

  return (
    <>
      <Navbar />
      <div style={{ backgroundColor: palette.dark, minHeight: "100vh",}}>

      <div
        className="container py-4"
        style={{ maxWidth: 700, backgroundColor: palette.neutral, borderRadius: 8, padding: 20 }}
      >
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h2>My Appointments</h2>
          <Link to="/book">
            <button className="btn btn-outline-primary">Book New Slot</button>
          </Link>
        </div>

        {loading && <p>Loading...</p>}
        {error && <div className="alert alert-danger">{error}</div>}

        {!loading && appointments.length === 0 && (
          <div className="alert alert-info">
            You have no booked appointments yet.
          </div>
        )}

        {!loading && appointments.length > 0 && (
          <div className="list-group">
            {appointments.map((appt) => (
              <div
                key={appt.id}
                className="list-group-item d-flex justify-content-between align-items-center mb-2"
              >
                <div>
                  <h5 className="mb-1">{appt.doctorName}</h5>
                  <p className="mb-0">
                    <strong>Date:</strong> {appt.date}
                    <br />
                    <strong>Time:</strong> {appt.slot}
                  </p>
                </div>

                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => handleCancel(appt.id)}
                >
                  Cancel
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
      </div>
    </>
  );
}
