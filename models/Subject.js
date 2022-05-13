const mongoose = require('mongoose');

const SubjectSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  class: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'class',
  },
  lecture: {
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'lecture' }],
  },
  topics: {
    type: [String],
    required: true,
  },
  attendence: {
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'attendence' }],
  }
});

module.exports = mongoose.model('subject', SubjectSchema);
