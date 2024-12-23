const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();
const eventRoutes = require('./routes/events');
const taskRoutes = require('./routes/tasks');
const attendeeRoutes = require('./routes/attendees');
const authRoutes = require('./routes/auth');
const app = express();
const port =  5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use('/api/events', eventRoutes);
app.use('/api/tasks', taskRoutes);
app.use('/api/attendees', attendeeRoutes);
app.use('/api/auth', authRoutes);

// Connect to MongoDB
mongoose.connect("mongodb+srv://aryan04sinha:9kFioY4gzd9EbEA4@cluster0.dj45v.mongodb.net/")
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Failed to connect to MongoDB:', err));

// Sample route for testing
app.get('/', (req, res) => {
  res.send('Welcome to the Event Management API');
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
