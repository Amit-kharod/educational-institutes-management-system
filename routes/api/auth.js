const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Student = require('../../models/Student')

// @route   GET api/auth
// @desc    Test route
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
      const student = await Student.findById(req.student.id).select('-password');
      res.json(student);
  } catch (err) {
      console.error(err.toString())
      res.status(500).send('Server error')
  }
}); 

module.exports = router;
