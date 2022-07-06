import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { toTitleCase, nToNth } from '../../utils/stringFunctions';
import AssignmentPopup from './AssignmentPopup';
import { setAlert } from '../../actions/alert';
import { addAssignment } from '../../actions/data';

const TeacherDashboard = ({
  teacher,
  adminData,
  data,
  addAssignment,
  setAlert,
}) => {
  const [currentPopup, setCurrentPopup] = useState(null);
  const [modificationState, setModificationState] = useState({
    name: '',
    programme: '',
    sem: '',
    subject: '',
    isHardCopy: true,
    topics: '',
    date: '',
  });
  let popup;
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

  const assignmentPopup = (e) => {
    let element;
    if (e.target.className === 'action img-action') {
      element = e.target.parentNode.parentNode;
    } else {
      element = e.target.parentNode.parentNode.parentNode;
    }
    console.log(element);
    setModificationState({
      ...modificationState,
      programme: element.childNodes[0].id,
      sem: element.id,
      subject: element.className,
    });
    setCurrentPopup('assignment');
  };
  console.log(modificationState);

  switch (currentPopup) {
    case null:
      popup = <Fragment></Fragment>;
      break;
    case 'assignment':
      popup = (
        <AssignmentPopup
          setPopup={setCurrentPopup}
          currentState={modificationState}
          setModificationState={setModificationState}
          addAssignment={addAssignment}
          setAlert={setAlert}
          adminData={adminData}
        />
      );
      break;
  }

  return (
    <Fragment>
      {popup}
      <div className="dashboard-heading">
        <br/>
        Welcome back, {teacher && toTitleCase(teacher.name)}
      </div>
      <br />
      <br />
      <br />
      <div className="teacher-lectures heading-white margin-left">Today's Lectures</div>
      <br />
      {lectures &&
        lectures.map((item, i) => {
          console.log(Object.values(item.lecture.lectures)[0].hour);
          return (
            <div key={i} id={item.sem} className={item.name}>
              <div className="lecture-flex margin-left" id={item.programme}>
                <span>{i + 1}.{` `}{toTitleCase(item.name)}</span>
                <span>
                  {Object.values(item.lecture.lectures)[0].hour}:
                  {Object.values(item.lecture.lectures)[0].minute} {` `}
                  {Object.values(item.lecture.lectures)[0].isAM ? `AM` : 'PM'}
                </span>
                <span>
                  {item.programme.toUpperCase()} {item.sem}{nToNth(item.sem)} sem
                </span>
              </div>
              <div className="actions">
                <span
                  className="action img-action"
                  onClick={(e) => {
                    assignmentPopup(e);
                  }}
                >
                  <img src="./img/icons/test.png" alt="#" />
                  Assignments
                </span>
              </div>
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
  addAssignment: PropTypes.func.isRequired,
  setAlert: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  teacher: state.auth.teacher,
  adminData: state.auth.adminData,
  data: state.data,
});

export default connect(mapStateToProps, { addAssignment, setAlert })(
  TeacherDashboard
);
