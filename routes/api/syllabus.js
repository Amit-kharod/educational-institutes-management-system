const express = require('express');
const router = express.Router();

// @route   GET api/Syllabus
// @desc    Test route
// @access  Private
router.get('/', (req, res) => {
    res.send('Syllabus route')
})

module.exports = router;