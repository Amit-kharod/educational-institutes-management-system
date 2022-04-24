const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const StudentProfile = require('../../models/StudentProfile');
const { check, validationResult } = require('express-validator');

// @route   GET api/studentProfile/me
// @desc    Get current student profile
// @access  Private
router.get('/me', auth, async (req, res) => {
  try {
    const profile = await StudentProfile.findOne({
      student: req.student.id,
    }).populate('student', ['name', 'avatar', 'email', 'registration_no']);

    if (!profile) {
      return res.status(400).json({ msg: 'There is no profile for this user' });
    }
    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   POST api/studentProfile
// @desc    Create or update user profile
// @access  Private

router.post(
  '/',
  [
    auth,
    [
      check('roll_no', 'Roll number is required').not().isEmpty(),
      check('course', 'Course is required').not().isEmpty(),
      check('sem', 'Semester is required').not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { roll_no, course, sem } = req.body;

    // Build profile object
    const profileFeilds = {};
    profileFeilds.student = req.student.id;
    profileFeilds.roll_no = roll_no;
    profileFeilds.course = course;
    profileFeilds.sem = sem;

    try {
      let profile = await StudentProfile.findOne({ student: req.student.id });
      if (profile) {
        // Update profile
        profile = await StudentProfile.findOneAndUpdate(
          { student: req.student.id },
          { $set: profileFeilds },
          { new: true }
        );
        return res.json(profile);
      }

      // Create Profile
      profile = new StudentProfile(profileFeilds);
      await profile.save();
      res.json(profile);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

module.exports = router;
