const mongoose = require('mongoose');

const LectureSchema = mongoose.Schema({
  time: {
    type: Number,
    required: true,
  },
  weekDay: {
    type: String,
    required: true,
  }
});

module.exports = mongoose.model('lecture', LectureSchema);
