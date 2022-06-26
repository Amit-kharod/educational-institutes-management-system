const mongoose = require('mongoose');

const StudentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  registrationNo: {
    type: String,
    required: true,
    unique: true,
  },
  rollNo: {
    type: Number,
    required: true,
    unique: true,
  },
  avatar: {
    type: String,
  },
  password: {
    type: String,
    required: true,
  },
  class: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'class',
    required: true,
  },
  programme: {
    type: String,
    required: true,
  },sem: {
    type: Number,
    required: true,
  },
  secretCode: {
    type: String,
    required: true,
    unique: true,
  },
  verification: {
    type: Boolean,
    required: true
  }
});

module.exports = mongoose.model('student', StudentSchema);
