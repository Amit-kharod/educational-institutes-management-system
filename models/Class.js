const mongoose = require('mongoose');

const ClassSchema = mongoose.Schema({
  programme: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'programme',
  },
  sem: {
    type: Number,
    required: true,
  },
  teacher: {
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'teacher' }],
  },
  student: {
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'student' }],
  },
  subject: {
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'subject' }],
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
