import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from './components/Dashboard.js';
import EventManagement from './components/EventManagement.js';
import AttendeeManagement from './components/AttendeeManagement.js';
import TaskManagement from './components/TaskManagement.js';
import Signup from './components/Signup.js';
import Login from './components/Login.js';
import Taskbar from './components/Taskbar.js';
import { useAuth } from './context/AuthContext.js';

function App() {
  const { isAuthenticated } = useAuth();

  return (
    <div className="App">
      {isAuthenticated && <Taskbar />}
      <Routes>
        <Route path="/" element={isAuthenticated ? <Dashboard /> : <Navigate to="/signup" />} />
        <Route path="/events" element={isAuthenticated ? <EventManagement /> : <Navigate to="/signup" />} />
        <Route path="/attendees" element={isAuthenticated ? <AttendeeManagement /> : <Navigate to="/signup" />} />
        <Route path="/tasks" element={isAuthenticated ? <TaskManagement /> : <Navigate to="/signup" />} />
        <Route path="/signup" element={!isAuthenticated ? <Signup /> : <Navigate to="/" />} />
        <Route path="/login" element={!isAuthenticated ? <Login /> : <Navigate to="/" />} />
      </Routes>
    </div>
  );
}

export default App;
