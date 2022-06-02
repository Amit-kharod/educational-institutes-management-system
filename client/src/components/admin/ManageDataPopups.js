import React, { Fragment, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import {
  addDepartment,
  addProgramme,
  resetDepartment,
} from '../../actions/data';
import { setAlert } from '../../actions/alert';
import PropTypes from 'prop-types';

const ManageDataPopups = ({
  currentPopup,
  currentModificationState,
  setPopup,
  setAlert,
  addDepartment,
  addProgramme,
  adminData,
  resetDepartment,
}) => {
  const { isDepartmentAdded, currentDepartment } = adminData;
  const { department, programme, sem, subject, teacher } = currentModificationState;
  let popup = <Fragment></Fragment>;
  const [departmentData, setDepartmentData] = useState({
    name: '',
  });
  const { name } = departmentData;
  const [programmeData, setProgrammeData] = useState({
    fullName: '',
    shortForm: '',
    duration: '',
    isOdd: false,
  });
  useEffect(() => {
    isDepartmentAdded && setPopup('programme');
  }, [isDepartmentAdded]);

  const { fullName, shortForm, duration, isOdd } = programmeData;
  const isNameValid = /^[a-z A-Z]+$/.test(name);
  const isFullNameValid = /^[a-z A-Z]+$/.test(fullName);
  const isDurationValid = /^[1-9]{1,2}$/.test(duration);

  const onDepartmentChange = (e) =>
    setDepartmentData({ ...departmentData, [e.target.name]: e.target.value });

  const onProgrammeChange = (e) =>
    setProgrammeData({ ...programmeData, [e.target.name]: e.target.value });

  const departmentNext = () => {
    if (isNameValid) {
      addDepartment(name);
      console.log(currentDepartment);
      currentDepartment && setPopup('programme');
    } else {
      setAlert('Enter a valid name', 'danger');
    }
  };

  const addNewProgramme = () => {
    if (isFullNameValid) {
      if (isDurationValid) {
        addProgramme(fullName, shortForm, isOdd, duration, currentDepartment);
      } else {
        setAlert('Enter a valid duration', 'danger');
      }
    } else {
      setAlert('Enter a valid Program name', 'danger');
    }
  };
  const addDepartmentPopup = (
    <div className="popup">
      <div className="big-popup-inner popup-center">
        <button
          className="popup-close"
          onClick={() => {
            setPopup(null);
            resetDepartment();
          }}
        >
          <img src="./img/icons/close.png" alt="close" />
        </button>
        Enter the name of the department
        <br />
        <input
          id="departmentName"
          type="text"
          name="name"
          placeholder="eg. Department of Biology"
          value={name}
          onChange={(e) => onDepartmentChange(e)}
        />
        <button className="next-popup" onClick={departmentNext}>
          Next
        </button>
      </div>
    </div>
  );

  const editDepartmentPopup = (
    <div className="popup">
      <div className="big-popup-inner popup-center">
        <button
          className="popup-close"
          onClick={() => {
            setPopup(null);
            resetDepartment();
          }}
        >
          <img src="./img/icons/close.png" alt="close" />
        </button>
        {department}
        <br />
        <input
          id="departmentName"
          type="text"
          name="name"
          placeholder="eg. Department of Biology"
          value={name}
          onChange={(e) => onDepartmentChange(e)}
        />
        <button className="next-popup" onClick={departmentNext}>
          Next
        </button>
      </div>
    </div>
  );

  const programmePopup = (
    <div className="popup">
      <div className="big-popup-inner">
        <button
          className="popup-close"
          onClick={() => {
            setPopup(null);
            resetDepartment();
          }}
        >
          <img src="./img/icons/close.png" alt="close" />
        </button>
        <strong>Programmes</strong>
        <em>no programmes to show</em>
        <br />
        <strong>New Programme</strong>
        <div id="programme-grid">
          <div id="full-name">
            <label>Full Name</label>
            <input
              type="text"
              name="fullName"
              placeholder="eg. Bachelor's of Arts"
              value={fullName}
              onChange={(e) => onProgrammeChange(e)}
            />
          </div>
          <div id="short-name">
            <label>Short Form</label>
            <input
              type="text"
              name="shortForm"
              placeholder="eg. B.A."
              value={shortForm}
              onChange={(e) => onProgrammeChange(e)}
            />
          </div>
          <div id="duration">
            <label>Duration</label>
            <input
              type="text"
              name="duration"
              value={duration}
              onChange={(e) => onProgrammeChange(e)}
            />
            <label>years</label>
          </div>
          <div id="current-sem">
            <label>Current Sem</label>
            <button
              className={isOdd === true ? 'sem-btn-active' : 'sem-btn'}
              onClick={() =>
                setProgrammeData({ ...programmeData, isOdd: true })
              }
            >
              Odd
            </button>
            <button
              className={isOdd === false ? 'sem-btn-active' : 'sem-btn'}
              onClick={() =>
                setProgrammeData({ ...programmeData, isOdd: false })
              }
            >
              Even
            </button>
          </div>
          <div id="add-programme-btn">
            <button onClick={addNewProgramme}>Add</button>
          </div>
        </div>
        <button className="next-popup next-subject" onClick={departmentNext}>
          Add Subjects
        </button>
        <button
          className="next-popup finish-popup"
          onClick={() => setPopup(null)}
        >
          Finish
        </button>
      </div>
    </div>
  );
  const subjectPopup = (
    <div className="popup">
      <div className="big-popup-inner">
        <button className="popup-close" onClick={() => setPopup(null)}>
          <img src="./img/icons/close.png" alt="close" />
        </button>
        Enter the name of the department
        <br />
        <input
          id="departmentName"
          type="text"
          name="name"
          placeholder="eg. Department of Biology"
          value={name}
          onChange={(e) => onProgrammeChange(e)}
        />
        <button className="next-popup" onClick={departmentNext}>
          Next
        </button>
      </div>
    </div>
  );

  const teacherPopup = (
    <div className="popup">
      <div className="big-popup-inner">
        <button className="popup-close" onClick={() => setPopup(null)}>
          <img src="./img/icons/close.png" alt="close" />
        </button>
        Enter the name of the department
        <br />
        <input
          id="departmentName"
          type="text"
          name="name"
          placeholder="eg. Department of Biology"
          value={name}
          onChange={(e) => onProgrammeChange(e)}
        />
        <button className="next-popup" onClick={departmentNext}>
          Next
        </button>
      </div>
    </div>
  );

  switch (currentPopup) {
    case null:
      popup = <Fragment></Fragment>;
      break;
    case 'addDepartment':
      popup = addDepartmentPopup;
      break;
    case 'editDepartment':
      popup = editDepartmentPopup;
      break;
    case 'programme':
      popup = programmePopup;
      break;
    case 'subject':
      popup = subjectPopup;
      break;
    case 'teacher':
      popup = teacherPopup;
      break;
  }
  return <>{popup}</>;
};

ManageDataPopups.propTypes = {
  addDepartment: PropTypes.func.isRequired,
  addProgramme: PropTypes.func.isRequired,
  setAlert: PropTypes.func.isRequired,
  resetDepartment: PropTypes.func.isRequired,
  adminData: PropTypes.object,
  data: PropTypes.array.isRequired
};
const mapStateToProps = (state) => ({
  adminData: state.auth.adminData,
  data: state.data
});

export default connect(mapStateToProps, {
  addDepartment,
  resetDepartment,
  addProgramme,
  setAlert,
})(ManageDataPopups);
