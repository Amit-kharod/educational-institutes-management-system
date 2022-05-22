const mongoose = require('mongoose');

const ProgrammeSchema = mongoose.Schema({
  fullName: {
    type: String,
    required: true,
  },
  shortForm: {
    type: String,
    required: true,
  },
  department: {
    type: String,
  },
  duration: {
    type: Number,
    required: true,
  },
  isOdd: {
    type: Boolean,
    required: true,
  },
});

module.exports = mongoose.model('programme', ProgrammeSchema);
