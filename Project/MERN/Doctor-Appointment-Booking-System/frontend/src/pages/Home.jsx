import Navbar from "../components/Navbar";

export default function Home() {
  return (
    <>
      <Navbar />

      <div
        style={{
          textAlign: "center",
          marginTop: "80px",
        }}
      >
        <h1>Doctor Appointment Booking System</h1>

        <p>
          Book appointments with doctors quickly and easily.
        </p>
      </div>
    </>
  );
}