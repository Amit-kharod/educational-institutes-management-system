const express = require('express');
const router = express.Router();
const Attendence = require('../../models/Attendence');
const { check, validationResult } = require('express-validator');
const Class = require('../../models/Class');
const Subject = require('../../models/Subject');
const teacherAuth = require('../../middleware/teacherAuth');

// @route   POST api/attendence
// @desc    Add class attendence
// @access  Private
router.post(
  '/',
  teacherAuth,
  [
    check('date', 'Date is required').not().isEmpty().isString(),
    check('attendence', 'Attendence is required').not().isEmpty().isArray(),
    check('programme', 'Programme name is required').not().isEmpty().isString(),
    check('sem', 'Semester is required').not().isEmpty().isNumeric(),
    check('subject', 'Semester is required').not().isEmpty().isString(),
  ],
  async (req, res) => {
    try {
      let newClass;
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      let { date, attendence, programme, sem, subject } = req.body;

      let programmeClass = await Class.findOne({
        programme: programme,
        sem: sem,
      });
      if (!programmeClass) {
        return res.status(400).json({ msg: 'Invalid programme or sem' });
      }
      await programmeClass.subject.map(async (item) => {
        let sub = await Subject.findOne({ _id: item });
        programmeClass.attendence = {... programmeClass.attendence, [sub.name]: []}
      })
  
      // adding new assignment
      let attendenceObj;
      const attendenceFields = {
        date: date,
        attendence: attendence,
      };
      attendenceObj = new Attendence(attendenceFields);
      await attendenceObj.save(async (err, item) => {
        if (err) {
          res.status(500).send('Server Error');
        } else {
          programmeClass.attendence = {...programmeClass.attendence, [subject]: [[programmeClass.attendence.subject], item._id.toString()]}
          newClass = new Class(programmeClass);
          await newClass.save();
          res.status(200).json({ msg: 'Attendence added' });
        }
      });
    } catch (err) {
      console.error(err);
      res.status(500).send('Server Error');
    }
  }
);

module.exports = router;
