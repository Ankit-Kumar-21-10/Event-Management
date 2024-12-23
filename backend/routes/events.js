const express = require('express');
const Event = require('../models/Event');
const router = express.Router();

// Create a new event
router.post('/', async (req, res) => {
  const { name, description, date, location } = req.body;
  try {
    const newEvent = new Event({ name, description, date, location });
    await newEvent.save();
    res.status(201).json(newEvent);
  } catch (error) {
    res.status(400).json({ error: 'Error creating event' });
  }
});

// Get all events
router.get('/', async (req, res) => {
  try {
    const events = await Event.find();
    res.status(200).json(events);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching events' });
  }
});

// Get a single event by ID
router.get('/:id', async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }
    res.status(200).json(event);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching event' });
  }
});

// Update an event
router.put('/:id', async (req, res) => {
  const { name, description, date, location } = req.body;
  try {
    const updatedEvent = await Event.findByIdAndUpdate(
      req.params.id,
      { name, description, date, location },
      { new: true }
    );
    if (!updatedEvent) {
      return res.status(404).json({ message: 'Event not found' });
    }
    res.status(200).json(updatedEvent);
  } catch (error) {
    res.status(400).json({ error: 'Error updating event' });
  }
});

// Delete an event
router.delete('/:id', async (req, res) => {
  try {
    const deletedEvent = await Event.findByIdAndDelete(req.params.id);
    if (!deletedEvent) {
      return res.status(404).json({ message: 'Event not found' });
    }
    res.status(200).json({ message: 'Event deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error deleting event' });
  }
});

module.exports = router;
