const mongoose = require('mongoose');

const SubjectSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  programme: {
    type: String,
    required: true,
  },
  sem: {
    type: Number,
    required: true,
  },
  lecture: {
    type: Object,
    required: true,
  },
  isOccupied: {
    type: Boolean,
    required: true,
  }
});

module.exports = mongoose.model('subject', SubjectSchema);
