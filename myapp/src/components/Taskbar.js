import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.js';
import { useNavigate } from 'react-router-dom';
import '../App.css';

function Taskbar() {
  const { authToken, logout } = useAuth(); 
  const navigate = useNavigate();

  const getUsernameFromToken = (token) => {
    if (!token) return null;
    const payload = JSON.parse(atob(token.split('.')[1])); // Decode the JWT token
    return payload.username; 
  };

  const username = getUsernameFromToken(authToken);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="taskbar">
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/events">Event Management</Link>
        </li>
        <li>
          <Link to="/attendees">Attendee Management</Link>
        </li>
        <li>
          <Link to="/tasks">Task Management</Link>
        </li>
        {authToken && (
          <div className="auth-actions">
            <li className="welcome-message">Welcome, {username ? username : 'User'}!</li>
            <li>
              <button className="logout-btn" onClick={handleLogout}>Logout</button>
            </li>
          </div>
        )}
      </ul>
    </nav>
  );
}

export default Taskbar;
