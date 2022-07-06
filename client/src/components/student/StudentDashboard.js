import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { useState } from 'react';
import Popup from '../layout/Popup';
import PropTypes from 'prop-types';
import { toTitleCase, nToNth } from '../../utils/stringFunctions';

const StudentDashboard = ({ assignments, student, isFirstLogin }) => {
  console.log(student);
  const [buttonPopup, setButtonPopup] = useState(true);
  const { name, secretCode, sem, programme } = student;
  const [studentData, setStudentData] = useState({
    name: name,
  });

  function padTo2Digits(num) {
    return num.toString().padStart(2, '0');
  }

  function formatDate(date) {
    return [
      padTo2Digits(date.getDate()),
      padTo2Digits(date.getMonth() + 1),
      date.getFullYear(),
    ].join('/');
  }

  const assignment = [];
  assignments.map((item) => {
    item.programme == programme && item.sem == sem && assignment.push(item);
  });
  console.log(assignment);
  const notVerified = (
    <div>You are not verified yet. Wait until the admin verifies you.</div>
  );

  const verified = (
    <div className="grid-container">
      <span className='heading-white'>Assignments</span>
      <div className="assignment-grid">
        <span className="heading-red-small">Assignment</span>
        <span className="heading-red-small">Last Date</span>
        <span className="heading-red-small">Subject</span>
        {assignment[0] ? (
          assignment.map((item, i) => {
            var mydate = new Date(item.date);
            return (
              <Fragment key={i}>
                <span>{toTitleCase(item.name)}</span>
                <span>{formatDate(mydate)}</span>
                <span>{item.subject.toUpperCase()}{item.isHardCopy ? '(Hard Copy)' : '(Soft Copy)'}</span>
              </Fragment>
            );
          })
        ) : (
          <em>No Assignments to show</em>
        )}
      </div>
    </div>
  );
  return (
    <Fragment>
      <br />
      <div className="dashboard-heading">Hi {name}! Welcome Back</div>
      {student.verification ? verified : notVerified}
      {isFirstLogin && buttonPopup && (
        <Popup setTrigger={setButtonPopup}>
          <div id="secret-code">
            <span>Your Secret Code- &nbsp;</span>
            <span id="popup-code">{secretCode}</span>
          </div>
        </Popup>
      )}
    </Fragment>
  );
};

StudentDashboard.propTypes = {
  student: PropTypes.object.isRequired,
  assignments: PropTypes.array.isRequired,
  isFirstLogin: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  student: state.auth.student,
  assignments: state.auth.assignments,
  isFirstLogin: state.auth.firstLogin,
});
export default connect(mapStateToProps)(StudentDashboard);
