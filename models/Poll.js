const mongoose = require('mongoose');

const PollSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  options: {
    type: [String],
    required: true,
  },
  postedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'teacher',
    required: true,
  },
  time: {
    type: Date,
    required: true,
  },
  reuslt: {
    type: Number,
  },
});

module.exports = mongoose.model('poll', PollSchema);
