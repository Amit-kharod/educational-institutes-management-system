const mongoose = require('mongoose');

const TeacherSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  userID: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  subject: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'subject',
    required: true,
  },
  schedule: {
    type: [String],
    required: true,
  },
});

module.exports = mongoose.model('teacher', TeacherSchema);
