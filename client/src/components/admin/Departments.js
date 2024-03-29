import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { toTitleCase } from '../../utils/stringFunctions';
import ManageDataPopups from './ManageDataPopups';
import { modifyDepartment, cha } from '../../actions/data';

const Departments = ({ data, modifyDepartment }) => {
  const [currentPopup, setCurrentPopup] = useState(null);
  const [modificationState, setModificationState] = useState({
    department: '',
    programme: '',
    sem: '',
    teacher: '',
    subject: '',
  });

  const editDepartment = (e) => {
    setCurrentPopup('editDepartment');
    setModificationState({ ...modificationState, department: toTitleCase(e.target.id) });
  };
  return (
    <div className="department-container">
      <ManageDataPopups
        setPopup={setCurrentPopup}
        currentPopup={currentPopup}
        currentModificationState={modificationState}
        setModificationState={setModificationState}
      />
      <div className="heading-red">DEPARTMENTS</div>
      {data.length > 0 ? data.map((item, i) => {
        return (
          <div className="department" key={i}>
            <div className="dep-serial">{i + 1}.</div>
            <div className="dep-name">{toTitleCase(item.name)}</div>
            <div
              className="edit"
              id={item.name}
              onClick={(e) => editDepartment(e)}
            >
              <img
                src="./img/icons/edit.png"
                id={item.name}
                alt="edit"
              />
              <span id={item.name}>Edit</span>
            </div>
          </div>
        );
      }): <em>No departments to show</em>}
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
