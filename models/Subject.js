const mongoose = require('mongoose');

const SubjectSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  lecture: {
    type: Object,
    required: true,
  },
  attendence: {
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'attendence' }],
  }
});

module.exports = mongoose.model('subject', SubjectSchema);
