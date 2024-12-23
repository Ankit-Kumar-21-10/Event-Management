import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext.js';
import { useNavigate } from 'react-router-dom';
import '../App.css'; // Add the CSS file

function Login() {
  const { login } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', {
        username,
        password
      });
      login(response.data.token);  // Save the JWT token in the context and localStorage
      navigate('/');  // Redirect to home page after successful login
    } catch (err) {
      console.error(err);
      alert('Invalid login details');
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
          <div className="input-container">
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="input-container">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="login-btn">Login</button>
        </form>
        <p className="signup-link">
          Don't have an account? <a href="/signup">Signup</a>
        </p>
      </div>
    </div>
  );
}

export default Login;
