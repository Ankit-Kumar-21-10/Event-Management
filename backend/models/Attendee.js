const mongoose = require('mongoose');

const attendeeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  contact: { type: String, required: true },
  event: { type: mongoose.Schema.Types.ObjectId, ref: 'Event' },
});

const Attendee = mongoose.model('Attendee', attendeeSchema);
module.exports = Attendee;
