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
import { addNewSubject, addNewTeacher } from '../../actions/data';
import PropTypes from 'prop-types';
import LectureGrid from '../popup/LectureGrid';
import SubjectList from '../popup/SubjectList';

const ManageDataPopups = ({
  currentPopup,
  currentModificationState,
  setModificationState,
  setPopup,
  setAlert,
  addDepartment,
  addProgramme,
  changeCurrentDepartment,
  adminData,
  resetDepartment,
  data,
  addNewSubject,
  addNewTeacher,
}) => {
  const { isDepartmentAdded, currentDepartment } = adminData;
  const { department, programme, sem, subject, teacher } =
    currentModificationState;
  let containProgramme = false;
  let unoccupiedSubjects = [];
  let popup = <Fragment></Fragment>;
  const [departmentData, setDepartmentData] = useState({
    name: '',
  });
  const { name } = departmentData;
  const isTeacher = false;
  const [programmeData, setProgrammeData] = useState({
    fullName: '',
    shortForm: '',
    duration: '',
    isOdd: false,
  });
  const popupStages = [
    'editDepartment',
    'programme',
    'editProgramme',
    'subject',
    'lecture',
    'editSubject',
    'teacher',
    'editTeacher',
  ];

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
        containProgramme = true;
      } else {
        setAlert('Enter a valid duration', 'danger');
      }
    } else {
      setAlert('Enter a valid Program name', 'danger');
    }
  };

  const subjectValidation = (subject) => {
    const isSubjectValid = /^[a-z A-Z]+$/.test(subject);
    if (isSubjectValid) {
      setPopup('lecture');
      setPopupStage(3);
      setModificationState({ ...currentModificationState, subject: subject });
    } else {
      setAlert('Enter a valid Subject name', 'danger');
    }
  };
  const setProgrammeSemState = (e) => {
    let semElements = e.parentNode.parentNode.childNodes[1].childNodes;
    let semElementsLength = semElements.length;
    for (let i = 0; i < semElementsLength; i++) {
      if (semElements[i].childNodes[0]) {
        if (semElements[i].childNodes[0].checked) {
          setModificationState({
            ...currentModificationState,
            sem: semElements[i].id,
            programme: e.id.toUpperCase(),
          });
          setPopupStage(1);
        }
      }
    }
  };

  const validateTeacher = () => {
    const isTeacherValid = /^[a-z A-Z]+$/.test(teacher);
    if (isTeacherValid) {
      let element = document.getElementsByClassName('subject-checkbox');
      var arr = [...element];
      let newTeacher = {
        name: teacher.toLowerCase(),
        department: department.toLowerCase(),
        subjects: [],
      };
      arr.map((item) => {
        if (item.checked) {
          newTeacher = {
            ...newTeacher,
            subjects: [
              ...newTeacher.subjects,
              { name: item.value, programme: item.id, sem: item.name },
            ],
          };
        }
      });
      addNewTeacher(newTeacher);
      setPopup('editDepartment');
      setPopupStage(0);
    } else {
      setAlert('Enter a valid teacher name', 'danger');
    }
  };
  const addSubject = (allLectures) => {
    let lectures = { lectures: {} };
    for (const item in allLectures) {
      console.log(allLectures[item]);
      if (allLectures[item]) {
        lectures = {
          lectures: { ...lectures.lectures, [item]: allLectures[item] },
        };
      }
    }
    console.log(lectures);
    addNewSubject(subject, programme, sem.charAt(0), lectures);
    setPopup(popupStages[popupStage]);
    setPopupStage(0);
  };

  const loginDetailsToggle = (e) => {
    let element;
    if (e.target.parentNode.className === 'action img-action') {
      element = e.target.parentNode.parentNode.childNodes[2];
    } else {
      element = e.target.parentNode.childNodes[2];
    }
    if (element.className === 'hide') {
      console.log('dfdf');
      element.className = '';
    } else {
      console.log('dfvcvcvdf');
      element.className = 'hide';
    }
  };
  // Fetch programmes details from department and render them
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
              containProgramme = true;
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
                        <div
                          className="sem-radio"
                          id={`${semName}${nToNth(semName)}`}
                          key={k}
                        >
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
                    <span
                      id={`${item3.name}`}
                      className="action img-action"
                      onClick={(e) => {
                        setProgrammeSemState(e.target);
                        setPopup('subject');
                      }}
                    >
                      <img src="./img/icons/subject.png" alt="subject" />
                      Subjects
                    </span>
                    <span
                      id={`${item3.name}`}
                      className="action img-action"
                      onClick={(e) => {
                        setProgrammeSemState(e.target);
                      }}
                    >
                      <img src="./img/icons/edit.png" alt="edit" /> Edit
                    </span>
                    <span
                      id={`${item3.name}`}
                      className="action img-action"
                      onClick={(e) => {
                        setProgrammeSemState(e.target);
                      }}
                    >
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
  console.log(currentModificationState);
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
  console.log(data);
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
          {containProgramme ? (
            programmeActionElement
          ) : (
            <em className="no-programme">no programmes to show</em>
          )}
          <div id="new-programme">
            <button
              className="medium-blue-btn edit"
              onClick={() => {
                setPopupStage(0);
                openProgrammePopup(department);
              }}
            >
              <img src="./img/icons/plus.png" alt="delete" />
              New Programme
            </button>
          </div>
          <div id="teacher-section">
            <div id="teacher-heading" className="heading-red-small">
              Teachers
            </div>
            {department &&
              adminData.teachers.map((item, i) => {
                if (department.toLowerCase() === item.department) {
                  return (
                    <div key={i} className="flex">
                      <div>{toTitleCase(item.name)}</div>
                      <span
                        className="action img-action"
                        onClick={(e) => loginDetailsToggle(e)}
                      >
                        <img src="./img/icons/eye.png" alt="" />
                        Login Details
                      </span>
                      <div id="login-details" className="hide">
                        Id: {item.userID} Pass: {item.password}
                      </div>
                    </div>
                  );
                }
              })}
            <br />
            <button
              className="medium-blue-btn edit2"
              onClick={() => {
                setPopupStage(6);
                setPopup('teacher');
              }}
            >
              <img src="./img/icons/plus.png" alt="delete" />
              New Teacher
            </button>
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
          {adminData.currentDepartment &&
            toTitleCase(adminData.currentDepartment)}
        </span>
        <strong className="programme-heading">Programmes</strong>

        {containProgramme ? (
          programmeActionElement
        ) : (
          <em className="no-programme">no programmes to show</em>
        )}
        <strong className="heading-margin">New Programme</strong>
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
        <button
          className="next-popup back-btn"
          onClick={() => {
            setPopup(popupStages[popupStage]);
          }}
        >
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
  const lecturePopup = (
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
        <span className="small-heading-white">
          {currentModificationState.subject}
        </span>
        <span id="lecture-caption">Enter Lectures in a Week</span>
        <LectureGrid addSubject={addSubject} />
        <button
          className="next-popup back-btn"
          onClick={() => {
            setPopup(popupStages[popupStage]);
            setPopupStage(0);
          }}
        >
          Back
        </button>
      </div>
    </div>
  );

  const subjectPopup = (
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
        <SubjectList
          currentModificationState={currentModificationState}
          subjectValidation={subjectValidation}
        />
        <button
          className="next-popup back-btn"
          onClick={() => {
            setPopup(popupStages[popupStage]);
            setPopupStage(0);
          }}
        >
          Back
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
        <strong>New Teacher</strong>
        <div className="teacher-name">
          <label>Name</label>
          <input
            id="teacherName"
            type="text"
            name="teacher"
            placeholder=""
            value={teacher}
            onChange={(e) =>
              setModificationState({
                ...currentModificationState,
                teacher: e.target.value,
              })
            }
          />
        </div>
        <br />
        <strong>Choose Subjects</strong>
        {adminData.subjects.map((item, i) => {
          if (!item.isOccupied) {
            unoccupiedSubjects.push(item);
            return (
              <div key={i}>
                <input
                  className="subject-checkbox"
                  type="checkbox"
                  id={item.programme}
                  name={item.sem}
                  value={item.name}
                />
                <label htmlFor={`subject${i}`}>{toTitleCase(item.name)}</label>
              </div>
            );
          }
        })}
        {
          !unoccupiedSubjects[0] && <span>No subjects to choose from</span>
        }
        <button className="next-popup" onClick={validateTeacher}>
          Add
        </button>
        <button
          className="next-popup back-btn"
          onClick={() => {
            console.log(popupStage);
            setPopup('editDepartment');
            setPopupStage(0);
          }}
        >
          Back
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
    case 'lecture':
      popup = lecturePopup;
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
  addNewSubject: PropTypes.func.isRequired,
  addNewTeacher: PropTypes.func.isRequired,
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
  addNewSubject,
  addNewTeacher,
})(ManageDataPopups);
