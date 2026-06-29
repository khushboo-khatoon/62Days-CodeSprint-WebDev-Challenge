import { NavLink } from 'react-router-dom';
import './Sidebar.css';

const navLinks = [
  { to: '/dashboard', label: 'Dashboard' },
  { to: '/analyzer', label: 'Analyzer' },
  { to: '/reports', label: 'Reports' },
  { to: '/history', label: 'History' },
  { to: '/settings', label: 'Settings' },
  { to: '/about', label: 'About' },
];

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <nav className="sidebar-nav">
        {navLinks.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            className={({ isActive }) => (isActive ? 'active' : '')}
          >
            {link.label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
