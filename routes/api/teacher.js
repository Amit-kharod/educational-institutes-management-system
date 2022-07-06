const express = require('express');
const router = express.Router();
const Teacher = require('../../models/Teacher');
const Department = require('../../models/Department');
const { check, validationResult } = require('express-validator');
const adminAuth = require('../../middleware/adminAuth');
const jwt = require('jsonwebtoken');
const config = require('config');
const { randomBytes } = require('crypto');
const Subject = require('../../models/Subject');

// @route   POST api/teacher
// @desc    Add new teacher
// @access  Private
router.post(
  '/',
  adminAuth,
  [
    check('name', 'Teacher name is required').not().isEmpty().isString(),
    check('department', 'Deapartment name is required')
      .not()
      .isEmpty()
      .isString(),
    check('subjects', 'Subjects are required').not().isEmpty().isArray(),
  ],
  async (req, res) => {
    try {
      let newDepartment = {};
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      let { name, department, subjects } = req.body;
      name = name.toLowerCase();
      department = department.toLowerCase();
      // adding new Teacher
      // let teacher = await Teacher.findOne({ name: name });
      // if (teacher) {
      //   return res.status(400).json({ msg: 'Teacher already exits' });
      // }
      // generating userID and password
      const userID = Math.round(Math.random() * (8999) + 1000);
      const password = randomBytes(2).toString('hex');
      const teacherFields = {
        name: name,
        subject: subjects,
        department:department,
        userID: userID,
        password: password
      };
      let teacher = new Teacher(teacherFields);
      let findDepartment = await Department.findOne({
        name: department,
      });
      if (findDepartment) {
          findDepartment.teacher.push(name);
          newDepartment = new Department(findDepartment);
      } else {
        return res.status(400).json({ msg: 'Department is invalid' });
      }
      await teacher.save();
      await newDepartment.save();
      subjects.map(async(item) => {
        const subject = await Subject.findOne({name: item.name, programme: item.programme, sem:item.sem});
        subject.isOccupied = true;
        const newSubject = new Subject(subject);
        await newSubject.save();
      })
      res.status(200).json({ msg: 'Teacher added' });
    } catch (err) {
      console.error(err);
      res.status(500).send('Server Error');
    }
  }
);

// @route   POST api/teacher/login
// @desc    Authentication using teacher userID and password
// @access  Private
router.post(
  '/login',
  [
    check('userID', 'User Id is required')
      .not()
      .isEmpty(),
    check(
      'password',
      'Password is required'
    ).exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);

    // Check for errors
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { userID, password } = req.body;
    try {
      // See if teacher exists
      let teacher = await Teacher.findOne({ userID: userID });
      if (!teacher) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Invalid Credentials' }] });
      }

      const isMatch = teacher.password === password;

      if (!isMatch) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Invalid Credentials' }] });
      }
      // Return jsonebtoken
      const paylaod = {
        teacher: {
          id: teacher.id,
        },
      };

      jwt.sign(
        paylaod,
        config.get('jwtSecret2'),
        { expiresIn: 360000 },
        (err, token) => {
          if (err) throw err;
          res.json({ token, teacher });
        }
      );
    } catch (err) {
      if (err instanceof MongoServerError && err.code === 11000) {
        return res.status(400).send('Server Error');
      }
      console.log(err.toString());
      res.status(500).send('Server error');
    }
  }
);


module.exports = router;
