const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const Student = require('../../models/Student');
const Class = require('../../models/Class');
const { MongoServerError } = require('mongodb');
const req = require('express/lib/request');
const { randomBytes } = require('crypto');
const auth = require('../../middleware/auth');

// @route   POST api/students
// @desc    Register a Student
// @access  Public

router.post(
  '/',
  [
    check('name', 'Name is required').not().isEmpty().isString(),
    check('email', 'Please enter valid email').isEmail(),
    check('registrationNo', 'Enter a valid Registration Number')
      .not()
      .isEmpty()
      .isLength({ min: 10, max: 10 }),
    check('rollNo', 'Name is required').not().isEmpty().isNumeric(),
    check(
      'password',
      'Please enter a password with 6 or more characters'
    ).isLength({
      min: 6,
    }),
    check('programme', 'Programme name is required').not().isEmpty().isString(),
    check('sem', 'Semester is required').not().isEmpty().isNumeric(),
  ],
  async (req, res) => {
    const errors = validationResult(req);

    // Check for errors
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { name, email, registrationNo, rollNo, password, programme, sem } =
      req.body;

    try {
      // See if student exists
      let student = await Student.findOne({ registrationNo });

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
      let programmeClass = await Class.findOne({
        programme: programme,
        sem: sem,
      });
      if (!programmeClass) {
        return res.status(400).json({ msg: 'Invalid programme or sem' });
      }
      // Generate secret code for new profile
      const secretCode = randomBytes(6).toString('hex');
      console.log(secretCode);
      student = new Student({
        name,
        email,
        registrationNo,
        rollNo: rollNo,
        avatar,
        password,
        class:programmeClass._id.toString(),
        secretCode,
        verification: false,
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
          res.json({ token, secretCode });
        }
      );
    } catch (err) {
      if (err instanceof MongoServerError && err.code === 11000) {
        console.log(err.toString());
        return res
          .status(400)
          .json({ errors: [{ msg: 'Student already exits' }] });
      }
      console.log(err.toString());
      res.status(500).send('Server error');
    }
  }
);

// @route   POST api/students
// @desc    Change password
// @access  Private

router.post(
  '/changePassword',
  [
    auth,
    [
      check(
        'password',
        'Please enter a password with 6 or more characters'
      ).isLength({
        min: 6,
      }),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);

    // Check for errors
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { password } = req.body;

    try {
      const student = await Student.findById(req.student.id);

      // Encrypting password
      const salt = await bcrypt.genSalt(10);
      student.password = await bcrypt.hash(password, salt);

      await student.save();

      res.json({ msg: 'Password updated Succesfully' });
    } catch (err) {
      res.status(500).send('Server error');
    }
  }
);
module.exports = router;
