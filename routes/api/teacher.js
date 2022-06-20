const express = require('express');
const router = express.Router();
const Teacher = require('../../models/Teacher');
const Department = require('../../models/Department');
const { check, validationResult } = require('express-validator');
const adminAuth = require('../../middleware/adminAuth');

// @route   POST api/teacher
// @desc    Add new teacher
// @access  Private
router.post(
    '/',
    adminAuth,
    [
      check('name', 'Teacher name is required').not().isEmpty().isString(),
      check('department', 'Deapartment name is required').not().isEmpty().isString(),
      check('subjects', 'Subjects are required').not().isEmpty().isArray(),
    ],
    async (req, res) => {
      try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
        }
        let { name, department, subjects } = req.body;
        name = name.toLowerCase();
        department = department.toLowerCase();
  
        // adding new subject
        let teacher = await Teacher.findOne({ name: name });
        if (teacher) {
          return res.status(400).json({ msg: 'Teacher already exits' });
        }
        const teacherFields = {
          name: name,
          subject: subjects,
        };
        teacher = new Teacher(teacherFields);
        await teacher.save();
  
        let findDepartment = await Department.findOne({
          name: department,
        });
        if (findDepartment) {
          findDepartment.teacher.push(name);
          const newDepartment = new Department(findDepartment);
          await newDepartment.save();
        }
        res.status(200).json({ msg: 'Teacher added' });
      } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
      }
    }
  );
module.exports = router;