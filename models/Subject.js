const mongoose = require('mongoose');

const SubjectSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  programme: {
    type: mongoose.Schema.Types.ObjectId,
  },
  topics: {
    type: [String],
    required: true,
  },
});

module.exports = mongoose.model('subject', SubjectSchema);
