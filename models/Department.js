const mongoose = require('mongoose');

const DepartmentSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  programme: {
    type: [{ type: String }],
  },
  teacher: {
    type: [{ type: String }],
  },
});

module.exports = mongoose.model('department', DepartmentSchema);
