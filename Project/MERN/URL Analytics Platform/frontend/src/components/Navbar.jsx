import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="navbar">
      <div className="brand">
        Link<span>Pulse</span>
      </div>
      {user && (
        <nav>
          <NavLink to="/dashboard" className={({ isActive }) => (isActive ? 'active' : '')}>
            Dashboard
          </NavLink>
          <NavLink to="/utm-builder" className={({ isActive }) => (isActive ? 'active' : '')}>
            UTM Builder
          </NavLink>
          <NavLink to="/api-keys" className={({ isActive }) => (isActive ? 'active' : '')}>
            API Keys
          </NavLink>
          <span style={{ color: '#8fc9c1' }}>Hi, {user.username}</span>
          <button onClick={handleLogout}>Logout</button>
        </nav>
      )}
    </header>
  );
}
