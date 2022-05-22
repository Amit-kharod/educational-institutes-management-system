const mongoose = require('mongoose');

const AssignmentSchema = mongoose.Schema({
  subject: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'subject',
    required: true,
  },
  lastdate: {
    type: Date,
    required: true,
  },
  assignment: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('assignment', AssignmentSchema);
