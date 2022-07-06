const express = require('express');
const router = express.Router();
const Assignment = require('../../models/Assignment');
const { check, validationResult } = require('express-validator');
const Class = require('../../models/Class');
const teacherAuth = require('../../middleware/teacherAuth');

// @route   POST api/assignment
// @desc    Add new assignment
// @access  Private
router.post(
  '/',
  teacherAuth,
  [
    check('name', 'Assignment name is required').not().isEmpty().isString(),
    check('subject', 'Subject name is required').not().isEmpty().isString(),
    check('programme', 'Programme name is required').not().isEmpty().isString(),
    check('sem', 'Semester is required').not().isEmpty().isNumeric(),
    check('isHardCopy', 'Type is required').not().isEmpty().isBoolean(),
    check('topics', 'Topics are required').not().isEmpty().isString(),
    check('date', 'Date is required').not().isEmpty().isString(),
  ],
  async (req, res) => {
    try {
      let newClass;
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      let { name, subject, programme, sem, isHardCopy, topics, date } =
        req.body;
      subject = subject.toLowerCase();
      name = name.toLowerCase();
      programme = programme.toLowerCase();
      let programmeClass = await Class.findOne({
        programme: programme,
        sem: sem,
      });
      if(!programmeClass){
        return res.status(400).json({ msg: 'Invalid programme or sem' });
      }
      // adding new assignment
      let assignment;
      const assignmentFields = {
        programme: programme,
        sem: sem,
        name: name,
        subject: subject,
        lastdate: date,
        isHardCopy: isHardCopy,
        topics: topics,
        date: date
      };
      assignment = new Assignment(assignmentFields);
      await assignment.save((err, item) => {
        if(err){
          return res.status(500).send('Server Error');
        }
        else {
          programmeClass.assignment.push(item._id.toString());
          newClass = new Class(programmeClass);
          newClass.save();
        }
      });
      res.status(200).json({ msg: 'Assignment added' });
    } catch (err) {
      console.error(err);
      return res.status(500).send('Server Error');
    }
  }
);

module.exports = router;
