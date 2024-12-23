// AttendeeManagement.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "../App.css"
const AttendeeManagement = () => {
    const [attendees, setAttendees] = useState([]);
    const [newAttendee, setNewAttendee] = useState({ name: '', contact: '', event: '' });
    const [events, setEvents] = useState([]);
    const [editingAttendee, setEditingAttendee] = useState(null);

    useEffect(() => {
        fetchAttendees();
        fetchEvents();
    }, []);

    const fetchAttendees = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/attendees');
            const attendeesWithEventData = await Promise.all(response.data.map(async (attendee) => {
                const eventResponse = await axios.get(`http://localhost:5000/api/events/${attendee.event}`);
                return { ...attendee, event: eventResponse.data };
            }));
            setAttendees(attendeesWithEventData);
        } catch (error) {
            console.error('Error fetching attendees:', error.message);
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

    const handleAttendeeSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editingAttendee) {
                await axios.put(`http://localhost:5000/api/attendees/${editingAttendee._id}`, newAttendee);
                setEditingAttendee(null);
            } else {
                await axios.post('http://localhost:5000/api/attendees', newAttendee);
            }
            setNewAttendee({ name: '', contact: '', event: '' });
            fetchAttendees();
        } catch (error) {
            console.error('Error creating/updating attendee:', error.message);
        }
    };

    const handleEditAttendee = (attendee) => {
        setEditingAttendee(attendee);
        setNewAttendee({ ...attendee });
    };

    const handleDeleteAttendee = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/api/attendees/${id}`);
            fetchAttendees();
        } catch (error) {
            console.error('Error deleting attendee:', error.message);
        }
    };

    return (
        <div className="page-container bg-darkest"> {/* Common page container and background */}
            <h1 className="text-lightest title-font">Attendee Management</h1>
            <div className="page-content bg-dark">
            <form onSubmit={handleAttendeeSubmit} className="event-form">
                <input type="text" placeholder="Attendee Name" value={newAttendee.name} onChange={(e) => setNewAttendee({ ...newAttendee, name: e.target.value })} required className="bg-dark text-lightest input-field" />
                <input type="text" placeholder="Contact" value={newAttendee.contact} onChange={(e) => setNewAttendee({ ...newAttendee, contact: e.target.value })} required className="bg-dark text-lightest input-field" />
                <select value={newAttendee.event} onChange={(e) => setNewAttendee({ ...newAttendee, event: e.target.value })} required className="bg-dark text-lightest input-field">
                    <option value="">Select Event</option>
                    {events.map((event) => (
                        <option key={event._id} value={event._id}>
                            {event.name}
                        </option>
                    ))}
                </select>
                <button type="submit" className="bg-medium text-lightest form-button">{editingAttendee ? 'Update Attendee' : 'Create Attendee'}</button>
            </form>

            <div className="events-display"> {/* Using events-display for consistent card layout */}
                <h2 className="text-lightest card-title-font">All Attendees</h2>
                {attendees.map((attendee) => (
                    <div key={attendee._id} className="event-card bg-light"> {/* Using event-card for consistent card styling */}
                        <h3 className="text-dark card-title-font">{attendee.name}</h3>
                        <p className="text-medium card-text-font">{attendee.contact}</p>
                        <p className="text-medium card-text-font">Event: {attendee.event ? attendee.event.name : "No Event"}</p>
                        <div className="button-container">
                            <button onClick={() => handleEditAttendee(attendee)} className="bg-medium text-lightest form-button">Edit</button>
                            <button onClick={() => handleDeleteAttendee(attendee._id)} className="bg-medium text-lightest form-button">Delete</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </div>
    );
};

export default AttendeeManagement;