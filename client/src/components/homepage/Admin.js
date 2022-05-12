import React, { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { setAlert } from '../../actions/alert';
import { adminLogin } from '../../actions/auth';
import PropTypes from 'prop-types';

const Admin = ({ isAuthenticated, admin, setAlert, adminLogin }) => {
  const [formData, setFormData] = useState({
    id: '',
    password: '',
  });

  const { id, password } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = () => {
    adminLogin(id, password);
  };
  if (isAuthenticated && admin.token) {
    return <Navigate to="/adminDashboard"/>
  }
  return (
    <div className="container">
      <h3 id="login-caption">ADMIN LOGIN</h3>
      <div id="login-box">
        <div id="user-name">
          <input
            type="text"
            name="id"
            placeholder="Enter your user id"
            value={id}
            onChange={(e) => onChange(e)}
          />
        </div>
        <div id="password">
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={password}
            onChange={(e) => onChange(e)}
          />
        </div>
        <div className="big-blue-btn" onClick={onSubmit}>
          <span id="login-text">Log In</span>
        </div>
      </div>
    </div>
  );
};

Admin.propTypes = {
  setAlert: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};
const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  admin: state.auth.admin
})

export default connect(mapStateToProps, {adminLogin, setAlert })(Admin);
