const mongoose = require('mongoose');

const AdminSchema = mongoose.Schema({
  adminID: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('admin', AdminSchema);
