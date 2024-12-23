const express = require('express');
const Attendee = require('../models/Attendee');
const router = express.Router();

// Create a new attendee
router.post('/', async (req, res) => {
  const { name, contact, event } = req.body;
  try {
    const newAttendee = new Attendee({ name, contact, event });
    await newAttendee.save();
    res.status(201).json(newAttendee);
  } catch (error) {
    res.status(400).json({ error: 'Error creating attendee' });
  }
});

// Get attendees by event
router.get('/:eventId', async (req, res) => {
  try {
    const attendees = await Attendee.find({ event: req.params.eventId });
    if (!attendees.length) {
      return res.status(404).json({ message: 'No attendees found for this event' });
    }
    res.status(200).json(attendees);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching attendees' });
  }
});

// Get all attendees
router.get('/', async (req, res) => {
  try {
    const attendees = await Attendee.find();
    res.status(200).json(attendees);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching all attendees' });
  }
});

// Update an attendee
router.put('/:id', async (req, res) => {
  const { name, contact, event } = req.body;
  try {
    const updatedAttendee = await Attendee.findByIdAndUpdate(
      req.params.id,
      { name, contact, event },
      { new: true }
    );
    if (!updatedAttendee) {
      return res.status(404).json({ message: 'Attendee not found' });
    }
    res.status(200).json(updatedAttendee);
  } catch (error) {
    res.status(400).json({ error: 'Error updating attendee' });
  }
});

// Delete an attendee
router.delete('/:id', async (req, res) => {
  try {
    const deletedAttendee = await Attendee.findByIdAndDelete(req.params.id);
    if (!deletedAttendee) {
      return res.status(404).json({ message: 'Attendee not found' });
    }
    res.status(200).json({ message: 'Attendee deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error deleting attendee' });
  }
});

module.exports = router;
