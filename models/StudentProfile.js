const { numberParser } = require('config/parser');
const mongoose = require('mongoose');

const StudentProfileSchema = mongoose.Schema({
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'student',
  },
  rollNum: {
    type: Number,
    required: true,
  },
  class: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
});

module.exports = mongoose.model('studentProfile', StudentProfileSchema);
