import React, { Fragment, useState } from 'react';
import ManageDataPopups from './ManageDataPopups';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { verifyStudent, setAdminData } from '../../actions/data';
import { toTitleCase, nToNth } from '../../utils/stringFunctions';

const AdminDashboard = ({
  students,
  unverifiedStudents,
  verifyStudent,
  setAdminData,
}) => {
  const [currentPopup, setCurrentPopup] = useState(null);
  const modificationState = {
    department: null,
    programme: null,
    sem: null,
    teacher: null,
    subject: null,
  };

  console.log(students);
  const verify = (e) => {
    console.log(unverifiedStudents[e].registrationNo);
    verifyStudent(
      unverifiedStudents[e].registrationNo,
      unverifiedStudents[e].programme,
      unverifiedStudents[e].sem,
      true
    );
  };
  const reject = (e) => {
    console.log(unverifiedStudents[e].registrationNo);
    verifyStudent(
      unverifiedStudents[e].registrationNo,
      unverifiedStudents[e].programme,
      unverifiedStudents[e].sem,
      false
    );
  };

  return (
    <Fragment>
      <div id="admin-container">
        <ManageDataPopups
          setPopup={setCurrentPopup}
          currentPopup={currentPopup}
          currentModificationState={modificationState}
        />
        <div id="statistics">
          <span>Total students registered: </span>
          <span>Verified Students: </span>
          <span>Teachers: </span>
        </div>
        <button className="medium-blue-btn">
          <img src="./img/icons/plus.png" alt="+" />
          New Teacher
        </button>
        <button
          className="medium-blue-btn"
          onClick={() => setCurrentPopup('addDepartment')}
        >
          <img src="./img/icons/plus.png" alt="" />
          New Department
        </button>
        <br />
        <br />
        <br />
        <br />
        <br />
        <div id="student-verification">
          <div className="heading-white">Student Verification</div>
          <div className="verification-grid">
            <span className="verification-grid-heading">Name</span>
            <span className="verification-grid-heading">Reg. No.</span>
            <span className="verification-grid-heading">Roll No.</span>
            <span className="verification-grid-heading">Class</span>
            <span className="verification-grid-heading">Action</span>
            {unverifiedStudents.map((item, i) => {
              return (
                <Fragment key={i}>
                  <span className="verification-grid-item">{item.name}</span>
                  <span className="verification-grid-item">
                    {item.registrationNo}
                  </span>
                  <span className="verification-grid-item">{item.rollNo}</span>
                  <span className="verification-grid-item">
                    {item.programme.toUpperCase()} {item.sem}
                    {nToNth(item.sem)}
                  </span>
                  <span className="verification-grid-action">
                    <img
                      src="./img/icons/tick.png"
                      alt=""
                      id={i}
                      onClick={(e) => verify(e.target.id)}
                    />
                    <img
                      src="./img/icons/close.png"
                      alt=""
                      id={i}
                      onClick={(e) => reject(e.target.id)}
                    />
                  </span>
                </Fragment>
              );
            })}
          </div>
        </div>
      </div>
    </Fragment>
  );
};

AdminDashboard.propTypes = {
  students: PropTypes.array.isRequired,
  unverifiedStudents: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  students: state.auth.adminData.students,
  unverifiedStudents: state.auth.adminData.unverifiedStudents,
});

export default connect(mapStateToProps, { verifyStudent, setAdminData })(
  AdminDashboard
);
