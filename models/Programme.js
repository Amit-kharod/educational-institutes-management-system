const mongoose = require('mongoose');

const ProgrammeSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  department: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'department',
  },
  duration: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model('programme', ProgrammeSchema);
