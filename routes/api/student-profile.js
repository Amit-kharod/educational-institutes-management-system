const express = require('express');
const router = express.Router();

// @route   GET api/students-profile
// @desc    Test route
// @access  Private
router.get('/', (req, res) => {
    res.send('Student-profile route')
})

module.exports = router;