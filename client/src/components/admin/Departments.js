import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { toTitleCase } from '../../utils/stringFunctions';
const Departments = ({ data }) => {
  const [depCount, setDepCount] = useState(0);
  const depIncreament = () => {
    setDepCount(depCount + 1);
  };
  return (
    <div className="department-container">
      <div className="heading-red">DEPARTMENTS</div>
      {data.map((item, i) => {
        console.log(item.name);
        return (
          <div className="department" key={i}>
            <div className="dep-serial">{i+1}.</div>
            <div className="dep-name">{toTitleCase(item.name)}</div>
            <div className="dep-action"><img src="./img/icons/edit.png" alt="edit" /></div>
            <span>edit</span>
          </div>
        );
      })}
    </div>
  );
};

Departments.propTypes = {
  data: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  data: state.data,
});

export default connect(mapStateToProps, {})(Departments);
