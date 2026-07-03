import { Link } from "react-router-dom";

export default function DoctorCard({ doctor }) {
  return (
    <div
      style={{
        border: "1px solid #ddd",
        padding: "20px",
        marginBottom: "20px",
        borderRadius: "10px",
      }}
    >
      <h2>{doctor.user?.name}</h2>

      <p>
        <strong>Specialization:</strong> {doctor.specialization}
      </p>

      <p>
        <strong>Experience:</strong> {doctor.experience} Years
      </p>

      <p>
        <strong>Consultation Fee:</strong> ₹{doctor.consultationFee}
      </p>

      <Link to={`/book/${doctor._id}`}>
        <button>Book Appointment</button>
      </Link>
    </div>
  );
}