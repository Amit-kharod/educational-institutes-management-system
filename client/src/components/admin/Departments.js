import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { toTitleCase } from '../../utils/stringFunctions';
import ManageDataPopups from './ManageDataPopups';
import { modifyDepartment } from '../../actions/data';

const Departments = ({ data, modifyDepartment }) => {
  const [currentPopup, setCurrentPopup] = useState(null);
  const [modificationState, setModificationState] = useState({
    department: null,
    programme: null,
    sem: null,
    teacher: null,
    subject: null,
  });

  const editDepartment = (e) => {
    setCurrentPopup('editDepartment');
    setModificationState({ ...modificationState, department: e.target.id });
  };
  console.log(modificationState);
  return (
    <div className="department-container">
      <ManageDataPopups
        setPopup={setCurrentPopup}
        currentPopup={currentPopup}
        currentModificationState={modificationState}
      />
      <div className="heading-red">DEPARTMENTS</div>
      {data.map((item, i) => {
        return (
          <div className="department" key={i}>
            <div className="dep-serial">{i + 1}.</div>
            <div className="dep-name">{toTitleCase(item.name)}</div>
            <div
              className="dep-action"
              id={toTitleCase(item.name)}
              onClick={(e) => editDepartment(e)}
            >
              <img
                src="./img/icons/edit.png"
                id={toTitleCase(item.name)}
                alt="edit"
              />
              <span id={toTitleCase(item.name)}>edit</span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

Departments.propTypes = {
  data: PropTypes.array.isRequired,
  modifyDepartment: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  data: state.data,
});

export default connect(mapStateToProps, { modifyDepartment })(Departments);
