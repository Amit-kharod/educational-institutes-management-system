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
  department: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  subject: {
    type: [{ type: Object }],
    required: true,
  },
});

module.exports = mongoose.model('teacher', TeacherSchema);
