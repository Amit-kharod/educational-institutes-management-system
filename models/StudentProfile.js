const { numberParser } = require('config/parser');
const mongoose = require('mongoose');

const StudentProfileSchema = mongoose.Schema({
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'student',
  },
  roll_no: {
    type: Number,
    required: true,
  },
  course: {
    type: String,
    required: true,
  },
  sem: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model('studentProfile', StudentProfileSchema);
