const express = require('express');
const router = express.Router();
const adminAuth = require('../../middleware/admin');
const { check, validationResult } = require('express-validator');
const Admin = require('../../models/Admin');
const { randomBytes } = require('crypto');
const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');
const { MongoServerError } = require('mongodb');

// @route   GET api/admin/verify
// @desc    IP address verification of admin
// @access  Private
router.get('/verify', adminAuth, (req, res) => {
  if (req.admin) {
    res.json({ msg: 'Admin verified' });
  }
});

// @route   POST api/admin
// @desc    Authorisation of admin by login details
// @access  Public
router.post(
  '/',
  [
    adminAuth,
    [
      check('adminID', 'Admin ID is required').not().isEmpty(),
      check('password', 'Password is required').exists(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);

    // Check for errors
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    let { adminID, password } = req.body;
    try {
      let admin = await Admin.findOne({ adminID: 'admin' });
      if (!admin) {
        console.log('a')
        const password = randomBytes(4).toString('hex');
        const salt = await bcrypt.genSalt(10);
        const adminPassword = await bcrypt.hash(password, salt);
        const adminFields = {
            adminID: 'admin',
            password: adminPassword,
        }
        admin = new Admin(adminFields);
        admin.save();
        return res.json({ pass: password })
      }
      console.log('a')
      const isMatch = await bcrypt.compare(password, admin.password);
      if (!isMatch) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Invalid Credentials' }] });
      }
      const paylaod = {
        admin: {
          id: admin.id,
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
