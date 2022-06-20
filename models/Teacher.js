const mongoose = require('mongoose');

const TeacherSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  userID: {
    type: String,
  },
  password: {
    type: String,
  },
  subject: {
    type: [{ type: Object }],
    required: true,
  },
});

module.exports = mongoose.model('teacher', TeacherSchema);
