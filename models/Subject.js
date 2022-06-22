const mongoose = require('mongoose');

const SubjectSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  lecture: {
    type: Object,
    required: true,
  }
});

module.exports = mongoose.model('subject', SubjectSchema);
