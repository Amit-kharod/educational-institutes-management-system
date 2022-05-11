import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { useState } from 'react';
import Popup from '../layout/Popup';
import PropTypes from 'prop-types';

const StudentDashboard = ({ student, isFirstLogin }) => {
  console.log(student);
  const [buttonPopup, setButtonPopup] = useState('true');
  const { name, secretCode } = student;
  const [studentData, setStudentData] = useState({
    name: name,
  });
  return (
    <Fragment>
      <div>Welcome back {name}</div>
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
  student: PropTypes.object,
  isFirstLogin: PropTypes.bool
};

const mapStateToProps = (state) => ({
  student: state.auth.student,
  isFirstLogin: state.auth.firstLogin
});
export default connect(mapStateToProps)(StudentDashboard);
