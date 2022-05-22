const mongoose = require('mongoose');

const LectureSchema = mongoose.Schema({
  time: {
    type: {
      hour: {
        type: Number,
        required: true,
      },
      min: {
        type: Number,
        required: true,
      }
    },
    required: true,
  },
  weekDay: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('lecture', LectureSchema);
