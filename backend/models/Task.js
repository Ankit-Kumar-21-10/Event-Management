const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  name: { type: String, required: true },
  status: { 
    type: String, 
    enum: ['Pending', 'Completed'], 
    default: 'Pending' 
  },
  event: { type: mongoose.Schema.Types.ObjectId, ref: 'Event' },
  deadline: { type: Date, required: true }, // Added deadline field
  attendee: { type: mongoose.Schema.Types.ObjectId, ref: 'Attendee' }, // Added attendee reference
});

const Task = mongoose.model('Task', taskSchema);
module.exports = Task;
