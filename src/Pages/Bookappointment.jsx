import React, { useMemo, useState } from "react";
import { useLocation } from "react-router-dom";
import doctorsData from "../data/doctors.json";
import Navbar from "../Components/Navbar.jsx";
const defaultSlots = [
  "09:00 AM", "09:30 AM", "10:00 AM", "10:30 AM",
  "11:00 AM", "02:00 PM", "02:30 PM", "03:00 PM", "04:00 PM"
];

export default function BookAppointment() {
  const location = useLocation();
  const { doctorId, doctorName } = location.state || {};

  const doctor = useMemo(
    () => doctorsData.find((d) => d.id === doctorId),
    [doctorId]
  );

  const slots = doctor?.slots?.map((s) => {
    // convert "09:00" -> "09:00 AM" style if needed
    if (s.includes(":") && !s.toLowerCase().includes("am") && !s.toLowerCase().includes("pm")) {
      const [h, m] = s.split(":");
      const hour = parseInt(h, 10);
      const suffix = hour < 12 ? "AM" : "PM";
      const normalizedHour = ((hour - 1) % 12) + 1; // 13 -> 1, 14 -> 2, etc.
      return `${normalizedHour.toString().padStart(2, "0")}:${m} ${suffix}`;
    }
    return s;
  }) || defaultSlots;

  const [date, setDate] = useState("");
  const [slot, setSlot] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState("");

  const todayStr = new Date().toISOString().split("T")[0];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!date) return setError("Please select a date.");
    if (!slot) return setError("Please select a time slot.");

    setLoading(true);
    setSuccess(null);

    // Simulated API call
    setTimeout(() => {
      setLoading(false);
      setSuccess({
        id: Math.random().toString(36).slice(2, 9),
        date,
        slot,
        doctorName: doctor?.name || doctorName || "Selected Doctor",
      });
    }, 900);
  };

  return (<> <Navbar/>
    <div className="container py-5" style={{ maxWidth: 760 }}>
      <h2 className="mb-1">Book Appointment</h2>

      {doctor || doctorName ? (
        <p className="text-muted mb-4">
          Booking with <strong>{doctor?.name || doctorName}</strong>
        </p>
      ) : (
        <p className="text-muted mb-4">
          Choose a doctor from the list to link your booking, or continue with a general slot.
        </p>
      )}

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Choose Date</label>
          <input
            type="date"
            className="form-control"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            min={todayStr}
          />
        </div>

        <div className="mb-3">
          <label className="form-label d-block">Available Time Slots</label>
          <div className="d-flex flex-wrap gap-2">
            {slots.map((t) => (
              <button
                type="button"
                key={t}
                className={`btn ${slot === t ? "btn-primary" : "btn-outline-secondary"}`}
                onClick={() => setSlot(t)}
                style={{ borderRadius: 8 }}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        {error && <div className="alert alert-danger">{error}</div>}

        <button type="submit" className="btn btn-success" disabled={loading}>
          {loading ? "Booking..." : "Confirm Booking"}
        </button>
      </form>

      {success && (
        <div className="alert alert-success mt-4">
          <h5>Appointment confirmed ✅</h5>
          <p>
            <strong>Doctor:</strong> {success.doctorName}
          </p>
          <p>
            <strong>Date:</strong> {success.date} — <strong>Slot:</strong> {success.slot}
          </p>
          <p>
            Appointment ID: <strong>{success.id}</strong>
          </p>
          <small className="text-muted">
            (In the real project, this would be saved to backend / localStorage.)
          </small>
        </div>
      )}
    </div></>
  );
}
