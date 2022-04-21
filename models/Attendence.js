const mongoose = require('mongoose');

const AttendenceSchema = mongoose.Schema({
  subject: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  attendence: {
    type: [
      {
        student: { type: mongoose.Schema.Types.ObjectId, required: true },
        isPresent: {
          type: Boolean,
          required: true,
        },
      },
    ],
  },
});

module.exports = mongoose.model('attendence', AttendenceSchema);
