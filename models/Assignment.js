const mongoose = require('mongoose');

const AssignmentSchema = mongoose.Schema({
  programme: {
    type: String,
    required: true,
  },
  sem: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  subject: {
    type: String,
    required: true,
  },
  date: {
    type: Object,
    required: true,
  },
  isHardCopy: {
    type: Boolean,
    required: true,
  },
  topics: {
    type: String,
    required: true,
  }
});

module.exports = mongoose.model('assignment', AssignmentSchema);
