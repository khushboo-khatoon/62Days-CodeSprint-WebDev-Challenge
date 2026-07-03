import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import api from "../services/api";

export default function MyAppointments() {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      const res = await api.get("/appointments");
      setAppointments(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const cancelAppointment = async (id) => {
    try {
      await api.patch(`/appointments/${id}/cancel`);
      alert("Appointment Cancelled");
      fetchAppointments();
    } catch (err) {
      alert("Unable to cancel appointment");
    }
  };

  return (
    <>
      <Navbar />

      <div style={{ padding: "30px" }}>
        <h1>My Appointments</h1>

        {appointments.length === 0 ? (
          <p>No appointments found.</p>
        ) : (
          appointments.map((appointment) => (
            <div
              key={appointment._id}
              style={{
                border: "1px solid #ddd",
                padding: "15px",
                marginBottom: "15px",
                borderRadius: "8px",
              }}
            >
              <p><strong>Doctor:</strong> {appointment.doctor?.user?.name || "N/A"}</p>
              <p><strong>Date:</strong> {new Date(appointment.appointmentDate).toLocaleDateString()}</p>
              <p><strong>Time:</strong> {appointment.timeSlot}</p>
              <p><strong>Status:</strong> {appointment.status}</p>

              {appointment.status === "Booked" && (
                <button onClick={() => cancelAppointment(appointment._id)}>
                  Cancel Appointment
                </button>
              )}
            </div>
          ))
        )}
      </div>
    </>
  );
}