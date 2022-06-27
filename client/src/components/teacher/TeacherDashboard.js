import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { toTitleCase, nToNth } from '../../utils/stringFunctions';

const TeacherDashboard = ({ teacher, adminData, data }) => {
  console.log(teacher);
  let teacherSubject = [];
  let lectures = [];
  teacher &&
    teacher.subject.map((item) => {
      teacherSubject.push(item.name);
    });
  adminData.subjects &&
    adminData.subjects.map((item) => {
      if (teacherSubject.includes(item.name)) {
        lectures.push(item);
      }
    });
  console.log(lectures);
  return (
    <Fragment>
      <div>Welcome back {teacher && toTitleCase(teacher.name)}</div>
      <br />
      <br />
      <br />
      <div className="teacher-lectures heading-white">Today's Lectures</div>
      {lectures &&
        lectures.map((item, i) => {
          console.log(Object.values(item.lecture.lectures)[0].hour);
          return (
            <div key={i} className="lecture-flex">
              <span>
                {i+1}.{` `}
                {Object.values(item.lecture.lectures)[0].hour}:
                {Object.values(item.lecture.lectures)[0].minute} {` `}
                {Object.values(item.lecture.lectures)[0].isAM ? `AM` : 'PM'}
              </span>
              <span>{toTitleCase(item.name)}</span>
              <span>{item.programme.toUpperCase()} {item.sem} sem</span>
            </div>
          );
        })}
    </Fragment>
  );
};
TeacherDashboard.propTypes = {
  teacher: PropTypes.object,
  adminData: PropTypes.object,
  data: PropTypes.array,
};
const mapStateToProps = (state) => ({
  teacher: state.auth.teacher,
  adminData: state.auth.adminData,
  data: state.data,
});

export default connect(mapStateToProps, {})(TeacherDashboard);
