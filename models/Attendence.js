const mongoose = require('mongoose');

const AttendenceSchema = mongoose.Schema({
  date: {
    type: String,
    required: true,
  },
  attendence: {
    type: [
      {
        student: {
          type: Number,
          required: true,
        },
        isPresent: {
          type: Boolean,
          required: true,
        },
      },
    ],
  },
});

module.exports = mongoose.model('attendence', AttendenceSchema);
