import React from 'react';

const AdminDashboard = () => {
  return (
    <div id="admin-container">
      <div id="statistics">
        <span>Total students registered: </span>
        <span>Verified Students: </span>
        <span>Teachers: </span>
      </div>
      <button className="medium-blue-btn"><img src="./img/icons/plus.png" alt="+" />New Teacher</button>
      <button className="medium-blue-btn"><img src="./img/icons/plus.png" alt="" />New Department</button>
    </div>
  );
};

export default AdminDashboard;
