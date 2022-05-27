import React, { Fragment, useState } from 'react';
import ManageDataPopups from './ManageDataPopups';

const AdminDashboard = () => {
  const [currentPopup, setCurrentPopup] = useState(null);

  return (
    <Fragment>
      <div id="admin-container">
        <ManageDataPopups
          setPopup={setCurrentPopup}
          currentPopup={currentPopup}
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
      </div>
    </Fragment>
  );
};

export default AdminDashboard;
