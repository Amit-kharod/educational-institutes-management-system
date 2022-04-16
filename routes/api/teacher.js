const express = require('express');
const router = express.Router();

// @route   GET api/teacher
// @desc    Test route
// @access  Private
router.get('/', (req, res) => {
    res.send('Teacher route')
})

module.exports = router;