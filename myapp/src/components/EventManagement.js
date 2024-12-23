import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "../App.css"
// Function to format date
const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
        weekday: 'short',
        year: 'numeric',
        month: 'short',
        day: 'numeric',
    }).format(date);
};

const EventManagement = () => {
    const [events, setEvents] = useState([]);
    const [newEvent, setNewEvent] = useState({ name: '', description: '', date: '', location: '' });
    const [editingEvent, setEditingEvent] = useState(null);

    useEffect(() => {
        fetchEvents();
    }, []);

    const fetchEvents = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/events'); // Replace with your API endpoint
            setEvents(response.data);
        } catch (error) {
            console.error('Error fetching events:', error.message);
        }
    };

    const handleEventSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editingEvent) {
                await axios.put(`http://localhost:5000/api/events/${editingEvent._id}`, newEvent);
                setEditingEvent(null);
            } else {
                await axios.post('http://localhost:5000/api/events', newEvent);
            }
            setNewEvent({ name: '', description: '', date: '', location: '' });
            fetchEvents();
        } catch (error) {
            console.error('Error creating/updating event:', error.message);
        }
    };

    const handleEditEvent = (event) => {
        setEditingEvent(event);
        setNewEvent({ ...event });
    };

    const handleDeleteEvent = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/api/events/${id}`);
            fetchEvents();
        } catch (error) {
            console.error('Error deleting event:', error.message);
        }
    };

    return (
        <div className="event-management bg-darkest">
            <h1 className="text-lightest title-font">Event Management</h1>

            <form onSubmit={handleEventSubmit} className="event-form"> {/* Added form class */}
                <input type="text" placeholder="Event Name" value={newEvent.name} onChange={(e) => setNewEvent({ ...newEvent, name: e.target.value })} required className="bg-dark text-lightest input-field" />
                <input type="text" placeholder="Description" value={newEvent.description} onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })} required className="bg-dark text-lightest input-field" />
                <input type="date" value={newEvent.date} onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })} required className="bg-dark text-lightest input-field" />
                <input type="text" placeholder="Location" value={newEvent.location} onChange={(e) => setNewEvent({ ...newEvent, location: e.target.value })} required className="bg-dark text-lightest input-field" />
                <button type="submit" className="bg-medium text-lightest form-button">{editingEvent ? 'Update Event' : 'Create Event'}</button>
            </form>

            <div className="events-display bg-dark">
                <h2 className="text-lightest card-title-font">All Events</h2>
                {events.map((event) => (
                    <div key={event._id} className="event-card bg-light">
                        <h3 className="text-dark card-title-font">{event.name}</h3> {/* Changed text color */}
                        <p className="text-medium card-text-font">{event.description}</p>
                        <p className="text-medium card-text-font">{formatDate(event.date)}</p>
                        <p className="text-medium card-text-font">{event.location}</p>
                        <div className="button-container">
                        <button onClick={() => handleEditEvent(event)} className="bg-medium text-lightest form-button">Edit</button>
                        <button onClick={() => handleDeleteEvent(event._id)} className="bg-medium text-lightest form-button">Delete</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default EventManagement;