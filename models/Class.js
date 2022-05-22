const mongoose = require('mongoose');

const ClassSchema = mongoose.Schema({
  programme: {
    type: String,
    required: true,
  },
  sem: {
    type: Number,
    required: true,
  },
  student: {
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'student' }],
  },
  subject: {
    type: [{ type: String }],
  },
  poll: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'poll',
  },
  test: {
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'test' }],
  },
  assignment: {
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'assignment' }],
  },
});

module.exports = mongoose.model('class', ClassSchema);
