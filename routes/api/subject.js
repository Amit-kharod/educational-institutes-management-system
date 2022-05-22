const express = require('express');
const router = express.Router();
const Subject = require('../../models/Subject');
const Class = require('../../models/Class');
const Programme = require('../../models/Programme');
const { MongoServerError } = require('mongodb');
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
    check('topics', 'Topics name is required').not().isEmpty().isArray(),
    check('sem', 'Semester is required').not().isEmpty().isNumeric(),
    check('lectures', 'Lectures are required').not().isEmpty().isArray(),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      let { name, programme, topics, sem, lectures } = req.body;
      name = name.toLowerCase();
      programme = programme.toLowerCase();

      // adding new subject
      let subject = Subject.findOne({ name: name });
      if (subject) {
        return res.status(400).json({ msg: 'Subject already exits' });
      }
      const subjectFields = {
        name: name,
        topics: topics,
      };
      subject = new Subject(subjectFields);
      await subject.save();

      // adding new lectures
      lectures.map(async lecture => {
        const lectureFields = {
          time: lecture.time,
          weekDay: lecture.weekDay,
        }
        let classLecture = Lecture.findOne({lectureFields});
        if(classLecture){
          await Subject.deleteOne({name: name})
          return res.status(400).json({ msg: 'Lecture already exits' });
        }
        classLecture = new Lecture(lectureFields);
        await classLecture.save();
      })
      
      // adding lectures to subject
      const programmeId = await Programme.findOne({ shortName: programme }).id;
      const programmeClass = await Class.findOne({
        programme: programmeId,
        sem: sem,
      });
      let department = await Department.findOne({ name: name });
      if (department) {
        return res.status(400).json({ msg: 'Department already exits' });
      }
      department = new Department(departmentFeilds);
      await department.save();
      res.json({ msg: 'Department added' });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

module.exports = router;
