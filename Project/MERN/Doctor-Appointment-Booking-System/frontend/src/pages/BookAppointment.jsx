import { useState } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";

export default function BookAppointment() {
  const { id } = useParams();

  const [form, setForm] = useState({
    appointmentDate: "",
    timeSlot: "",
    reason: "",
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.post("/appointments", {
        doctor: id,
        ...form,
      });

      alert("Appointment Booked Successfully");
    } catch (err) {
      alert(err.response?.data?.message || "Booking Failed");
    }
  };

  return (
    <div style={{ padding: "40px" }}>
      <h2>Book Appointment</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="date"
          name="appointmentDate"
          onChange={handleChange}
        />

        <br /><br />

        <input
          name="timeSlot"
          placeholder="10:00 AM - 10:30 AM"
          onChange={handleChange}
        />

        <br /><br />

        <textarea
          name="reason"
          placeholder="Reason for appointment"
          onChange={handleChange}
        />

        <br /><br />

        <button type="submit">
          Book
        </button>
      </form>
    </div>
  );
}