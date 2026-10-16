import { NavLink } from 'react-router-dom';

const linkStyle = ({ isActive }) => ({
  marginRight: 16,
  fontWeight: isActive ? 'bold' : 'normal',
  color: isActive ? '#0EA5A0' : '#333',
});

export default function Navbar() {
  return (
    <nav style={{ padding: 12, borderBottom: '1px solid #ccc' }}>
      <NavLink to="/" end style={linkStyle}>Home</NavLink>
      <NavLink to="/students" style={linkStyle}>Students</NavLink>
      <NavLink to="/about" style={linkStyle}>About</NavLink>
    </nav>
  );
}
