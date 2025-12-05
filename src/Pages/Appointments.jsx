import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../Components/Navbar.jsx";
import axios from "axios";

export default function Appointments() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch all user appointments
  const loadAppointments = async () => {
    try {
      setLoading(true);
      const response = await axios.get("http://localhost:5000/api/appointments/user");
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

  // Cancel appointment
  const handleCancel = async (id) => {
    try {
      await axios.put(`http://localhost:5000/api/appointments/cancel/${id}`);
      // Remove cancelled appointment from UI
      setAppointments(appointments.filter((a) => a.id !== id));
    } catch (err) {
      console.error(err);
      alert("Failed to cancel appointment");
    }
  };

  return (
    <>
      <Navbar />

      <div className="container py-4" style={{ maxWidth: 700 }}>
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h2>My Appointments</h2>
          <Link to="/book">
            <button className="btn btn-primary">Book New Slot</button>
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
                className="list-group-item d-flex justify-content-between align-items-center"
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
    </>
  );
}

