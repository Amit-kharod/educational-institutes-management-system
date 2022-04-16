const express = require('express');
const router = express.Router();

// @route   GET api/poll
// @desc    Test route
// @access  Private
router.get('/', (req, res) => {
    res.send('Poll route')
})

module.exports = router;