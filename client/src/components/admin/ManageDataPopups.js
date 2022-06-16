import React, { Fragment, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import {
  addDepartment,
  addProgramme,
  resetDepartment,
  changeCurrentDepartment,
} from '../../actions/data';
import { toTitleCase, nToNth } from '../../utils/stringFunctions';
import { setAlert } from '../../actions/alert';
import PropTypes from 'prop-types';

const ManageDataPopups = ({
  currentPopup,
  currentModificationState,
  setPopup,
  setAlert,
  addDepartment,
  addProgramme,
  changeCurrentDepartment,
  adminData,
  resetDepartment,
  data,
}) => {
  console.log(currentPopup);
  const { isDepartmentAdded, currentDepartment } = adminData;
  const { department, programme, sem, subject, teacher } =
    currentModificationState;
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
  const popupStages = ['editDepartment', 'addProgramme', 'editProgramme','subject', 'editSubject', 'teacher', 'editTeacher']
  const [popupStage, setPopupStage] = useState(null);
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

  // Fectch programmes details from department and render them
  const programmeActionElement = data.map((item, i) => {
    console.log(item.name);
    let programmeArray = false;
    if (toTitleCase(item.name) === department) {
      programmeArray = [];
      item.programmes.map((item2) => {
        programmeArray.push({ name: item2.name, sem: item2.sem });
      });
      return (
        <div id="programme-list" key={i}>
          {programmeArray.map((item3, j) => {
            {
              let programmeName = item3.name;
              return (
                <div className="programme-actions" key={j}>
                  <span className="programme-short">
                    <span>{`${j + 1}.`}</span>
                    <span>{programmeName.toUpperCase()}</span>
                  </span>
                  <div className="sem-radio-group">
                    {item3.sem.map((sem, k) => {
                      let semName = item3.sem[k];
                      return (
                        <div className="sem-radio" key={k}>
                          <input
                            type="radio"
                            name={`sem${j}`}
                            id={`${programmeName}${item3.sem[k]}`}
                            defaultChecked={k == 0 ? 'checked' : ''}
                          />
                          <label htmlFor={`${programmeName}${item3.sem[k]}`}>
                            {semName}
                            {nToNth(semName)}
                          </label>
                        </div>
                      );
                    })}
                  </div>
                  <div className="actions">
                    <span className="action img-action">
                      <img src="./img/icons/subject.png" alt="subject" />
                      Subjects
                    </span>
                    <span className="action img-action">
                      <img src="./img/icons/edit.png" alt="edit" /> Edit
                    </span>
                    <span className="action img-action">
                      <img src="./img/icons/delete.png" alt="delete" />
                      Delete
                    </span>
                  </div>
                </div>
              );
            }
          })}
        </div>
      );
    }
  });

  const openProgrammePopup = (dep) => {
    changeCurrentDepartment(dep);
    setPopup('programme');
  };
  const addDepartmentPopup = (
    <div className="popup">
      <div className="big-popup-inner popup-center">
        <button
          className="popup-close"
          onClick={() => {
            setPopup(null);
            resetDepartment();
            setPopupStage(null);
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
      <div className="big-popup-inner">
        <button
          className="popup-close"
          onClick={() => {
            setPopup(null);
            resetDepartment();
            setPopupStage(null);
          }}
        >
          <img src="./img/icons/close.png" alt="close" />
        </button>
        <div id="modify-dep">
          <span className="heading-white-small">{department}</span>
          <div className="edit">
            <img src="./img/icons/edit.png" alt="edit" />
            <span>Edit</span>
          </div>
          <div className="heading-red-small programme-heading">Programmes</div>
          {programmeActionElement[0] ? (
            programmeActionElement
          ) : (
            <em className="no-programme">no programmes to show</em>
          )}
          <div id="new-programme">
            <button
              className="medium-blue-btn edit"
              onClick={() => {
                setPopupStage(0);
                openProgrammePopup(department)}}
            >
              <img src="./img/icons/plus.png" alt="delete" />
              New Programme
            </button>
          </div>
          <div id="teacher-section">
            <div id="teacher-heading" className="heading-red-small">
              Teachers
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const programmePopup = (
    <div className="popup">
      <div className="big-popup-inner large-popup">
        <button
          className="popup-close"
          onClick={() => {
            console.log('close');
            setPopup(null);
            resetDepartment();
            setPopupStage(null);
          }}
        >
          <img src="./img/icons/close.png" alt="close" />
        </button>
        <span className="heading-white-small">
          {adminData.currentDepartment}
        </span>
        <strong className="programme-heading">Programmes</strong>

        {programmeActionElement[0] ? (
          programmeActionElement
        ) : (
          <em className="no-programme">no programmes to show</em>
        )}
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
        <button className="next-popup back-btn" onClick={()=> {setPopup(popupStages[popupStage])}}>
          Back
        </button>
        <button
          className="next-popup finish-popup"
          onClick={() => {
            setPopup(null);
            resetDepartment();
          }}
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
  changeCurrentDepartment: PropTypes.func.isRequired,
  setAlert: PropTypes.func.isRequired,
  resetDepartment: PropTypes.func.isRequired,
  adminData: PropTypes.object,
  data: PropTypes.array.isRequired,
};
const mapStateToProps = (state) => ({
  adminData: state.auth.adminData,
  data: state.data,
});

export default connect(mapStateToProps, {
  addDepartment,
  resetDepartment,
  addProgramme,
  setAlert,
  changeCurrentDepartment,
})(ManageDataPopups);
