import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../dbcss/dashboard.css'; // Import the new, unique CSS file

const Dashboard = () => {
  const [events, setEvents] = useState([]);
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetchEvents();
    fetchTasks();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/events');
      setEvents(response.data);
    } catch (error) {
      console.error('Error fetching events:', error.message);
    }
  };

  const fetchTasks = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/tasks');
      setTasks(response.data);
    } catch (error) {
      console.error('Error fetching tasks:', error.message);
    }
  };

  const calculateTaskCompletion = (eventId) => {
    const eventTasks = tasks.filter(task => task.event && task.event._id === eventId);
    if (eventTasks.length === 0) return 0;
    const completedTasks = eventTasks.filter(task => task.status === 'Completed');
    return completedTasks.length / eventTasks.length;
  };

  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">Dashboard</h1>

      {events.map((event) => {
        const completionRatio = calculateTaskCompletion(event._id);

        return (
          <div key={event._id} className="dashboard-event-card">
            <h3 className="dashboard-event-name">{event.name}</h3>
            <p className="dashboard-event-description">{event.description}</p>
            <p className="dashboard-event-location">Location: {event.location}</p>

            {/* Progress Bar */}
            <div className="dashboard-progress-bar-container">
              <div
                className="dashboard-progress-bar"
                style={{
                  width: `${completionRatio * 100}%`,
                }}
              ></div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Dashboard;
