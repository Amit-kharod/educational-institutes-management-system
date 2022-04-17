const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const Student = require('../../models/Student');
const { MongoServerError } = require('mongodb');
const req = require('express/lib/request');

// @route   POST api/students
// @desc    Register a Student
// @access  Public
router.post(
  '/',
  [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Please enter valid email').isEmail(),
    check('registration_no', 'Enter a valid Registration Number')
      .not()
      .isEmpty()
      .isLength({ min: 10, max: 10 }),
    check(
      'password',
      'Please enter a password with 6 or more characters'
    ).isLength({
      min: 6,
    }),
  ],
  async (req, res) => {
    const errors = validationResult(req);

    // Check for errors
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { name, email, registration_no, password } = req.body;

    try {
      // See if student exists
      let student = await Student.findOne({ registration_no });

      if (student) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Student already exits' }] });
      }
      // Get studend avatar
      const avatar = gravatar.url(email, {
        s: '200',
        r: 'pg',
        d: 'identicon',
      });

      student = new Student({
        name,
        email,
        registration_no,
        avatar,
        password,
      });
      // Encrypt password
      const salt = await bcrypt.genSalt(10);

      student.password = await bcrypt.hash(password, salt);

      await student.save();

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
