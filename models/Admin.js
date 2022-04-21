const mongoose = require('mongoose');

const AdminSchema = mongoose.Schema({
  userID: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('admin', AdminSchema);
