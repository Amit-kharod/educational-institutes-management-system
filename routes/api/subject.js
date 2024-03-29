const express = require('express');
const router = express.Router();
const Subject = require('../../models/Subject');
const Class = require('../../models/Class');
const Programme = require('../../models/Programme');
const { check, validationResult } = require('express-validator');
const adminAuth = require('../../middleware/adminAuth');
const Lecture = require('../../models/Lecture');

// @route   POST api/subject
// @desc    Add new subject
// @access  Private
router.post(
  '/',
  adminAuth,
  [
    check('name', 'Subject name is required').not().isEmpty().isString(),
    check('programme', 'Programme name is required').not().isEmpty().isString(),
    check('sem', 'Semester is required').not().isEmpty().isNumeric(),
    check('lectures', 'Lectures are required').not().isEmpty().isObject(),
  ],
  async (req, res) => {
    try {
      let newClass;

      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      let { name, programme, sem, lectures } = req.body;
      name = name.toLowerCase();
      programme = programme.toLowerCase();

      let programmeClass = await Class.findOne({
        programme: programme,
        sem: sem,
      });
      const subjectFields = {
        name: name,
        programme: programme,
        sem:sem,
        lecture: lectures,
        isOccupied: false
      };
      let subject = new Subject(subjectFields);

      if (!programmeClass) {
        return res.status(400).json({ msg: 'Invalid programme or sem' });
      }
      // adding new subject
      await subject.save((err, item) => {
        if (err) {
          return res.status(500).send('Server Error');
        } else {
          programmeClass.subject.push(item._id.toString());
          newClass = new Class(programmeClass);
          newClass.save();
          return res.status(200).json({ msg: 'Subject added' });
        }
      });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

module.exports = router;
