const express = require('express');
const router = express.Router();
const Department = require('../../models/Department');
const Class = require('../../models/Class');
const { MongoServerError } = require('mongodb');
const { check, validationResult, Result } = require('express-validator');
const adminAuth = require('../../middleware/adminAuth');

// @route   POST api/department
// @desc    Add new department
// @access  Private
router.post(
  '/',
  adminAuth,
  [check('name', 'Department name is required').not().isEmpty().isString()],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      let { name } = req.body;
      name = name.toLowerCase();
      const departmentFields = {
        name: name,
      };

      let department = await Department.findOne({ name: name });
      if (department) {
        return res.status(400).json({ msg: 'Department already exits' });
      }
      department = new Department(departmentFields);
      await department.save();
      res.status(200).json({ msg: 'Department added', name: name });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

module.exports = router;
