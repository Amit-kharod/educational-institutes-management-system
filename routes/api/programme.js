const express = require('express');
const router = express.Router();
const Programme = require('../../models/Programme');
const Department = require('../../models/Department');
const Class = require('../../models/Class');
const { MongoServerError } = require('mongodb');
const { check, validationResult } = require('express-validator');
const adminAuth = require('../../middleware/adminAuth');

// @route   POST api/programme
// @desc    Add new Programme
// @access  Private
router.post(
  '/',
  adminAuth,
  [
    check('fullName', 'Full name is required').not().isEmpty().isString(),
    check('shortForm', 'Short name is required').not().isEmpty().isString(),
    check('isOdd', 'Semester is required').not().isEmpty().isBoolean(),
    check('duration', 'Duration is required').not().isEmpty().isNumeric(),
    check('departmentName', 'Department is required')
      .not()
      .isEmpty()
      .isString(),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      let { fullName, shortForm, isOdd, duration, departmentName } = req.body;
      fullName = fullName.toLowerCase();
      departmentName = departmentName.toLowerCase();
      shortForm = shortForm.toLowerCase();
      const programmeFields = {
        fullName: fullName,
        shortForm: shortForm,
        isOdd: isOdd,
        duration: duration,
      };
      let programme = await Programme.findOne({ shortForm: shortForm });
      if (programme) {
        return res.status(400).json({ msg: 'Programme already exits' });
      }
      programme = new Programme(programmeFields);
      await programme.save();

      // adding programme to department
      let department = await Department.findOne({ name: departmentName });
      if (!department) {
        await Programme.deleteOne({ shortForm: shortForm });
        return res.status(400).json({ msg: 'No such department found' });
      }
      department.programme.push(programme.shortForm);
      await department.save();

      // add new Classes based on duration and term
      for (let i = 1; i <= duration; i++) {
        let sem = isOdd ? 2*i-1 : 2*i;
        classFeilds = {
          programme: programme.shortForm,
          sem: sem,
        };
        const programmeClass = new Class(classFeilds);
        await programmeClass.save();
      }
      res.json({ msg: 'Programme added' });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

module.exports = router;
