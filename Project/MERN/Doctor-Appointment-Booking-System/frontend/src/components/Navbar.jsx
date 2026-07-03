import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav
      style={{
        display: "flex",
        justifyContent: "space-between",
        padding: "15px 30px",
        background: "#2563eb",
      }}
    >
      <Link to="/" style={{ color: "white", textDecoration: "none" }}>
        🩺 Doctor Booking
      </Link>

      <div style={{ display: "flex", gap: "20px" }}>
        <Link to="/doctors" style={{ color: "white" }}>
          Doctors
        </Link>

        <Link to="/appointments" style={{ color: "white" }}>
          My Appointments
        </Link>

        <Link to="/login" style={{ color: "white" }}>
          Login
        </Link>

        <Link to="/register" style={{ color: "white" }}>
          Register
        </Link>
      </div>
    </nav>
  );
}