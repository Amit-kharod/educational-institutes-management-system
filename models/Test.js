const mongoose = require('mongoose');

const TestSchema = mongoose.Schema({
  programme: {
    type: String,
    required: true,
  },
  sem: {
    type: Number,
    required: true,
  },
  subject: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  isWritten: {
    type: Boolean,
    required: true,
  },
  topics: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('test', TestSchema);
