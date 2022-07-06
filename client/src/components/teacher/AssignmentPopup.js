import React, { useState } from 'react';
import { toTitleCase, nToNth } from '../../utils/stringFunctions';

const AssignmentPopup = ({
  setPopup,
  currentState,
  setModificationState,
  addAssignment,
  setAlert,
  adminData,
}) => {
  const { name, programme, sem, subject, isHardCopy, topics, date } =
    currentState;

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

  const assignmentVerification = () => {
    if (name === '') {
      setAlert('Enter the assignment name', 'danger');
    } else {
      if (topics === '') {
        setAlert('Enter some topics', 'danger');
      } else {
        date
          ? addAssignment(
              name,
              subject,
              programme,
              sem,
              isHardCopy,
              topics,
              date
            )
          : setAlert('Please enter date', 'danger');
      }
    }
  };
  const assignments = [];
  adminData.assignments.map((item) => {
    item.programme == programme && item.sem == sem && assignments.push(item);
  });
  console.log(assignments);

  return (
    <div className="popup">
      <div className="big-popup-inner">
        <button
          className="popup-close"
          onClick={() => {
            setPopup(null);
          }}
        >
          <img src="./img/icons/close.png" alt="close" />
        </button>
        <span className="heading-red-small">Assignments</span>
        {assignments[0] ? (
          assignments.map((item, i) => {
            var mydate = new Date(item.date);
            console.log(item);
            return (
              <div className="assignment">
                <span>{i + 1}.</span>
                <span>{toTitleCase(item.name)}</span>
                <span>{formatDate(mydate)}</span>
              </div>
            );
          })
        ) : (
          <em>no assignments to show</em>
        )}
        <br />
        <br />
        <div id="programme-grid">
          <div id="assignment-name">
            <label>Name</label>
            <input
              type="text"
              name="name"
              placeholder="eg. Theory Assignment 1"
              value={name}
              onChange={(e) =>
                setModificationState({
                  ...currentState,
                  [e.target.name]: e.target.value,
                })
              }
            />
          </div>
          <div id="assignment-topics">
            <label>Topics</label>
            <input
              type="text"
              name="topics"
              placeholder="Enter topics for assignment"
              value={topics}
              onChange={(e) =>
                setModificationState({
                  ...currentState,
                  [e.target.name]: e.target.value,
                })
              }
            />
          </div>
          <div id="current-sem">
            <label>Submission</label>
            <button
              id="hard-btn"
              className={isHardCopy === true ? 'sem-btn-active' : 'sem-btn'}
              onClick={() =>
                setModificationState({ ...currentState, isHardCopy: true })
              }
            >
              Hard Copy
            </button>
            <button
              id="hard-btn"
              className={isHardCopy === false ? 'sem-btn-active' : 'sem-btn'}
              onClick={() =>
                setModificationState({ ...currentState, isHardCopy: false })
              }
            >
              Soft Copy
            </button>
          </div>
          <div className="date">
            <label htmlFor="date">Date</label>
            <input
              type="date"
              id="date"
              name="date"
              onChange={(e) => {
                setModificationState({ ...currentState, date: e.target.value });
              }}
            />
          </div>
          <div id="add-programme-btn">
            <button onClick={assignmentVerification}>Add</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssignmentPopup;
