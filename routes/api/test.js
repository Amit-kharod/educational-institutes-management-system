const express = require('express');
const router = express.Router();
const Test = require('../../models/Test')
const { check, validationResult } = require('express-validator');
const Class = require('../../models/Class');
const teacherAuth = require('../../middleware/teacherAuth');

// @route   POST api/test
// @desc    Add new test
// @access  Private
router.post(
  '/',
  teacherAuth,
  [
    check('subject', 'Subject name is required').not().isEmpty().isString(),
    check('programme', 'Programme name is required').not().isEmpty().isString(),
    check('sem', 'Semester is required').not().isEmpty().isNumeric(),
    check('isWritten', 'Type is required').not().isEmpty().isBoolean(),
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
      let { subject, programme, sem, isWritten, topics, date } =
        req.body;
      subject = subject.toLowerCase();
      programme = programme.toLowerCase();
      
      let programmeClass = await Class.findOne({
        programme: programme,
        sem: sem,
      });
      if(!programmeClass){
        return res.status(400).json({ msg: 'Invalid programme or sem' });
      }
      // adding new test
      let test;
      const testFields = {
        subject: subject,
        date: date,
        isWritten: isWritten,
        topics: topics,
      };
      test = new Test(testFields);
      await test.save((err, item) => {
        if(err){
          return res.status(500).send('Server Error');
        }
        else {
          programmeClass.test.push(item._id.toString());
          newClass = new Class(programmeClass);
          newClass.save();
        }
      });
      return res.status(200).json({ msg: 'Test added' });
    } catch (err) {
      console.error(err);
      res.status(500).send('Server Error');
    }
  }
);


module.exports = router;