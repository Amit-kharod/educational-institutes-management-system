const express = require('express');
const router = express.Router();
const Department = require('../../models/Department');
const Class = require('../../models/Class');
const { MongoServerError } = require('mongodb');
const { check, validationResult, Result } = require('express-validator');
const adminAuth = require('../../middleware/adminAuth');

// @route   POST api/department
// @desc    Add new department
// @access  Private
router.post(
  '/',
  adminAuth,
  [check('name', 'Department name is required').not().isEmpty().isString()],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      let { name } = req.body;
      name = name.toLowerCase();
      const departmentFields = {
        name: name,
      };

      let department = await Department.findOne({ name: name });
      if (department) {
        return res.status(400).json({ msg: 'Department already exits' });
      }
      department = new Department(departmentFields);
      await department.save();
      res.status(200).json({ msg: 'Department added', name: name });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route   GET api/department
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

module.exports = router;
