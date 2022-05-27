const express = require('express');
const router = express.Router();
const Department = require('../../models/Department');
const Class = require('../../models/Class');
const { MongoServerError } = require('mongodb');
const adminAuth = require('../../middleware/adminAuth');

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
    allDepartments.map(async (item) => {
      let programmes = [];
      let sem = [];
      item.programme.map((item2) => {
        allClasses.find((o,i) => {
          if(o.programme === item2) {
            sem.push(o.sem);
          }
        })
        const programme = {name: item2, sem:sem}
        programmes.push(programme)
      })
      department = {
        name: item.name,
        programmes: programmes,
        teachers: item.teacher
      }
      departments.push(department);
    })
    res.status(200).json({ departments });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET api/data/admin
// @desc    Get data for admin
// @access  Private
router.get('/admin',adminAuth, async (req, res) => {
  try {
    const departments = [];
    let department = {
      name: '',
      programmes: [],
      teachers: [],
    };
    const allDepartments = await Department.find({});
    const allClasses = await Class.find({});
    allDepartments.map(async (item) => {
      let programmes = [];
      let sem = [];
      item.programme.map((item2) => {
        allClasses.find((o,i) => {
          if(o.programme === item2) {
            sem.push(o.sem);
          }
        })
        const programme = {name: item2, sem:sem}
        programmes.push(programme)
      })
      department = {
        name: item.name,
        programmes: programmes,
        teachers: item.teacher
      }
      departments.push(department);
    })
    res.status(200).json({ departments });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;