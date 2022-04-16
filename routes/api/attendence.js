const express = require('express');
const router = express.Router();

// @route   GET api/attendence
// @desc    Test route
// @access  Private
router.get('/', (req, res) => {
    res.send('Attendence route')
})

module.exports = router;