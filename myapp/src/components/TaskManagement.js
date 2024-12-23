import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "../App.css"
const TaskManagement = () => {
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState({ name: '', status: 'Pending', event: '', deadline: '', attendee: '' });
    const [events, setEvents] = useState([]);
    const [attendees, setAttendees] = useState([]);
    const [editingTask, setEditingTask] = useState(null);

    useEffect(() => {
        fetchTasks();
        fetchEvents();
        fetchAttendees();
    }, []);

    const fetchTasks = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/tasks');
        setTasks(response.data);
      } catch (error) {
        console.error('Error fetching tasks:', error.message);
      }
    };
    const fetchEvents = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/events');
        setEvents(response.data);
      } catch (error) {
        console.error('Error fetching events:', error.message);
      }
    };
    const fetchAttendees = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/attendees');
        setAttendees(response.data);
      } catch (error) {
        console.error('Error fetching attendees:', error.message);
      }
    };
    const formatDate = (dateString) => {
      const date = new Date(dateString);
      return new Intl.DateTimeFormat('en-US', {
        weekday: 'short',
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      }).format(date);
    };
    const handleTaskSubmit = async (e) => {
      e.preventDefault();
      try {
        if (editingTask) {
          // Update task
          await axios.put(`http://localhost:5000/api/tasks/${editingTask._id}`, newTask);
          setEditingTask(null);
        } else {
          // Create new task
          await axios.post('http://localhost:5000/api/tasks', newTask);
        }
        setNewTask({ name: '', status: 'Pending', event: '', deadline: '', attendee: '' });
        fetchTasks(); // Refresh tasks list
      } catch (error) {
        console.error('Error submitting task:', error.message);
      }
    };
    const handleTaskDelete = async (taskId) => {
      try {
        await axios.delete(`http://localhost:5000/api/tasks/${taskId}`);
        fetchTasks(); // Refresh tasks list after delete
      } catch (error) {
        console.error('Error deleting task:', error.message);
      }
    };
  
    const handleTaskEdit = (task) => {
      setEditingTask(task);
      setNewTask({
        name: task.name,
        status: task.status,
        event: task.event._id,
        deadline: task.deadline,
        attendee: task.attendee._id,
      });
    };

    return (
        <div className="page-container bg-darkest">
            <h2 className="text-lightest title-font">Task Management</h2>
            <div className="page-content bg-dark">
                <form onSubmit={handleTaskSubmit} className="task-management-form">
                    <input type="text" placeholder="Task Name" value={newTask.name} onChange={(e) => setNewTask({ ...newTask, name: e.target.value })} required className="bg-dark text-lightest input-field" />
                    <select value={newTask.status} onChange={(e) => setNewTask({ ...newTask, status: e.target.value })} className="bg-dark text-lightest input-field">
                        <option value="Pending">Pending</option>
                        <option value="Completed">Completed</option>
                    </select>
                    <select value={newTask.event} onChange={(e) => setNewTask({ ...newTask, event: e.target.value })} required className="bg-dark text-lightest input-field">
                        <option value="">Select Event</option>
                        {events.map((event) => (
                            <option key={event._id} value={event._id}>{event.name}</option>
                        ))}
                    </select>
                    <input type="date" placeholder="Deadline" value={newTask.deadline} onChange={(e) => setNewTask({ ...newTask, deadline: e.target.value })} required className="bg-dark text-lightest input-field" />
                    <select value={newTask.attendee} onChange={(e) => setNewTask({ ...newTask, attendee: e.target.value })} required className="bg-dark text-lightest input-field">
                        <option value="">Select Attendee</option>
                        {attendees.map((attendee) => (
                            <option key={attendee._id} value={attendee._id}>{attendee.name}</option>
                        ))}
                    </select>
                    <button type="submit" className="bg-medium text-lightest form-button">{editingTask ? 'Update Task' : 'Add Task'}</button>
                </form>

                <div className="tasks-section">
                    {tasks.map((task) => (
                        <div key={task._id} className="task-card bg-light">
                            <p className="text-dark card-text-font">{task.name}</p>
                            <p className="text-medium card-text-font">Status: {task.status}</p>
                            <p className="text-medium card-text-font">Event: {task.event ? task.event.name : 'No Event'}</p>
                            <p className="text-medium card-text-font">Attendee: {task.attendee ? task.attendee.name : 'No Attendee'}</p>
                            <p className="text-medium card-text-font">Deadline: {task.deadline ? formatDate(task.deadline) : 'No Deadline'}</p>
                            <div className="button-container">
                                <button onClick={() => handleTaskEdit(task)} className="bg-medium text-lightest form-button">Edit</button>
                                <button onClick={() => handleTaskDelete(task._id)} className="bg-medium text-lightest form-button">Delete</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default TaskManagement;