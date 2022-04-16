const express = require('express');
const router = express.Router();

// @route   GET api/students
// @desc    Test route
// @access  Private
router.get('/', (req, res) => {
    res.send('Students route')
})

module.exports = router;