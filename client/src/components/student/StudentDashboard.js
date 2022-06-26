import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { useState } from 'react';
import Popup from '../layout/Popup';
import PropTypes from 'prop-types';

const StudentDashboard = ({ student, isFirstLogin }) => {
  console.log(student);
  const [buttonPopup, setButtonPopup] = useState(true);
  const { name, secretCode } = student;
  const [studentData, setStudentData] = useState({
    name: name,
  });

  const notVerified = 
  <div>
    You are not verified yet. Wait until the admin verifies you.
  </div>

  const verified = <div>you are verified</div>
  return (
    <Fragment>
      <div>Welcome back {name},</div>
      {student.verification ?  verified : notVerified}
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
