const express = require('express');
const router = express.Router();
const Department = require('../../models/Department');
const Class = require('../../models/Class');
const Student = require('../../models/Student');
const Subject = require('../../models/Subject');
const Assignment = require('../../models/Assignment');
const Teacher = require('../../models/Teacher');
const { MongoServerError } = require('mongodb');
const adminAuth = require('../../middleware/adminAuth');
const teacherAuth = require('../../middleware/teacherAuth');

// @route   GET api/data
// @desc    Get department details
// @access  Public
router.get('/', async (req, res) => {
  try {
    const departments = [];
    let department = {
      name: '',
      programmes: [],
      teachers: [],
    };
    const allDepartments = await Department.find({});
    const allClasses = await Class.find({});
    console.log(allDepartments);
    console.log(allClasses);
    allDepartments.map(async (item) => {
      let programmes = [];
      item.programme.map((item2) => {
        let sem = [];
        allClasses.find((programmeClass) => {
          if (programmeClass.programme === item2) {
            sem.push(programmeClass.sem);
          }
        });
        const programme = { name: item2, sem: sem };
        programmes.push(programme);
      });
      department = {
        name: item.name,
        programmes: programmes,
        teachers: item.teacher,
      };
      departments.push(department);
    });
    res.status(200).json({ departments });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET api/data/admin
// @desc    Get data for admin
// @access  Private
router.get('/admin', adminAuth, async (req, res) => {
  try {
    let subjects = await Subject.find({});
    const students = [];
    const unverifiedStudents = [];
    let teachers = await Teacher.find({});
    let student = {
      name: '',
      registrationNo: '',
      rollNo: '',
      programme: '',
      sem: '',
    };
    const allStudents = await Student.find({});
    allStudents.map(async (item) => {
      student = {
        name: item.name,
        registrationNo: item.registrationNo,
        rollNo: item.rollNo,
        programme: item.programme,
        sem: item.sem,
      };
      !item.verification && unverifiedStudents.push(student);
      students.push(student);
    });
    res.status(200).json({ students, unverifiedStudents, subjects, teachers });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET api/data/teacher
// @desc    Get data for teacher
// @access  Private
router.get('/teacher', teacherAuth, async (req, res) => {
  try {
    let assignments = await Assignment.find({});
    let subjects = await Subject.find({});
    const students = [];
    const unverifiedStudents = [];
    let teachers = await Teacher.find({});
    let student = {
      name: '',
      registrationNo: '',
      rollNo: '',
      programme: '',
      sem: '',
    };
    const allStudents = await Student.find({});
    allStudents.map(async (item) => {
      student = {
        name: item.name,
        registrationNo: item.registrationNo,
        rollNo: item.rollNo,
        programme: item.programme,
        sem: item.sem,
      };
      !item.verification && unverifiedStudents.push(student);
      students.push(student);
    });
    res.status(200).json({ students, unverifiedStudents, subjects, teachers, assignments });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});
module.exports = router;
