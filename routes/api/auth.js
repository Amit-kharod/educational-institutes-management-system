const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const Student = require('../../models/Student');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const { MongoServerError } = require('mongodb');

// @route   GET api/auth
// @desc    Get Student details using token
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    const student = await Student.findById(req.student.id).select('-password');
    res.json(student);
  } catch (err) {
    console.error(err.toString());
    res.status(500).send('Server error');
  }
});

// @route   POST api/auth
// @desc    Authenticate student and get token
// @access  Public

router.post(
  '/',
  [
    check('registration_no', 'Enter a valid Registration Number')
      .not()
      .isEmpty()
      .isLength({ min: 10, max: 10 }),
    check(
      'password',
      'Please enter a password with 6 or more characters'
    ).exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);

    // Check for errors
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { registration_no, password } = req.body;
    try {
      // See if student exists
      let student = await Student.findOne({ registration_no });

      if (!student) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Invalid Credentials' }] });
      }

      const isMatch = await bcrypt.compare(password, student.password);

      if (!isMatch) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Invalid Credentials' }] });
      }
      // Return jsonebtoken
      const paylaod = {
        student: {
          id: student.id,
        },
      };

      jwt.sign(
        paylaod,
        config.get('jwtSecret'),
        { expiresIn: 360000 },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      if (err instanceof MongoServerError && err.code === 11000) {
        return res.status(400).send('Student already registered');
      }
      console.log(err.toString());
      res.status(500).send('Server error');
    }
  }
);

// @route   POST api/auth/secretCode
// @desc    Authenticate user by secret code and get token
// @access  Public

router.post(
  '/secretCode',
  [
    check('registration_no', 'Invalid Credentials')
      .not()
      .isEmpty()
      .isLength({ min: 10, max: 10 }),
    check('secretCode', 'Invalid Credentials').not().isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);

    // Check for errors
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { registration_no, secretCode } = req.body;
    try {
      // See if student exists
      let student = await Student.findOne({ registration_no });

      if (!student) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Invalid Credentials' }] });
      }
      const isMatch = secretCode === student.secretCode;
      if (!isMatch) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Invalid Credentials' }] });
      }
      // Return jsonebtoken
      const paylaod = {
        student: {
          id: student.id,
        },
      };

      jwt.sign(
        paylaod,
        config.get('jwtSecret'),
        { expiresIn: 360000 },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      if (err instanceof MongoServerError && err.code === 11000) {
        return res.status(400).send('Student already registered');
      }
      console.log(err.toString());
      res.status(500).send('Server error');
    }
  }
);

module.exports = router;
