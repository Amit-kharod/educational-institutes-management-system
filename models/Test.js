const mongoose = require('mongoose');

const TestSchema = mongoose.Schema({
  subject: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'subject',
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  test:{
    type: String,
    required: true,
  }
});

module.exports = mongoose.model('test', TestSchema);
