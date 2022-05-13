const mongoose = require('mongoose');

const DepartmentSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  programme: {
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'programme' }],
  },
  teacher: {
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'teacher' }],
  },
});

module.exports = mongoose.model('department', DepartmentSchema);
