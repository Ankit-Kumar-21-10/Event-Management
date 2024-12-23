const express = require('express');
const Task = require('../models/Task');
const Attendee = require('../models/Attendee'); // Assuming you have an Attendee model
const Event = require('../models/Event'); // Assuming you have an Event model

const router = express.Router();

// Create new task
router.post('/', async (req, res) => {
  const { name, status, event, deadline, attendee } = req.body;
  try {
    const newTask = new Task({
      name,
      status,
      event,
      deadline,
      attendee,
    });
    await newTask.save();
    res.status(201).json(newTask);
  } catch (error) {
    res.status(400).json({ error: 'Error creating task' });
  }
});

// Get all tasks with populated event and attendee references
router.get('/', async (req, res) => {
  try {
    const tasks = await Task.find()
      .populate('event')
      .populate('attendee'); // Populate attendee reference
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching tasks' });
  }
});

// Update task
router.put('/:id', async (req, res) => {
  const { name, status, event, deadline, attendee } = req.body;
  try {
    const task = await Task.findByIdAndUpdate(
      req.params.id,
      { name, status, event, deadline, attendee },
      { new: true }
    );
    res.status(200).json(task);
  } catch (error) {
    res.status(400).json({ error: 'Error updating task' });
  }
});

// Delete task
router.delete('/:id', async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Task deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Error deleting task' });
  }
});

module.exports = router;
