const mongoose = require('mongoose');

const ProgrammeSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  department: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  sem: {
    type: Number,
    required: true,
  },
  fee: {
    type: number,
    required: true,
  },
});

module.exports = mongoose.model('programme', ProgrammeSchema);
