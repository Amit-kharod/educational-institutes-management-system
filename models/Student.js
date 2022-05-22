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
