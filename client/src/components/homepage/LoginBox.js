import React, { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { setAlert } from '../../actions/alert';
import { login } from '../../actions/auth';
import PropTypes from 'prop-types';

const LoginBox = ({ setState, setAlert, login, isAuthenticated, student, isTeacher }) => {
  const [formData, setFormData] = useState({
    registrationNo: '',
    password: '',
  });

  const { registrationNo, password } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const studentLogin = () => {
    const isRegistrationValid = registrationNo.length === 10;
    const isPasswordValid = password.length >= 6;
    if (isRegistrationValid) {
      if (!isPasswordValid) {
        setAlert('Enter a valid Password', 'danger');
      } else {
        login(registrationNo, password, true);
      }
    } else setAlert('Enter a valid Registration No', 'danger');
  };
  const teacherLogin = () => {
    const isRegistrationValid = registrationNo.length === 4;
    const isPasswordValid = password.length === 4;
    if (isRegistrationValid) {
      if (!isPasswordValid) {
        setAlert('Invalid credentials', 'danger');
      } else {
        login(registrationNo, password, false);
      }
    } else setAlert('Invalid credentials', 'danger');
  };

  if (isAuthenticated && student) {
    console.log('after');
    setState(true);
    return <Navigate to="/studentDashboard"/>
  }
  if ( isTeacher ) {
    setState(true);
    return <Navigate to="/teacherDashboard"/>
  }

  return (
    <div className="container">
      <h3 id="login-caption">Log into your account</h3>
      <div id="login-box">
        <div id="user-name">
          <input
            type="text"
            name="registrationNo"
            placeholder="Registration no/ User ID"
            value={registrationNo}
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
        <div className="big-blue-btn" onClick={()=>{
          registrationNo.length < 5 ? teacherLogin(): studentLogin()
        }}>
          <span id="login-text">Log In</span>
        </div>
        <div className="inline-link">
          <span>
            <Link className="text-link" to="/forgot-password">
              Forgot Password?
            </Link>
          </span>
        </div>
        <div className="inline-link">
          New User?{' '}
          <span>
            <Link className="text-link" to="/signup">
              Sign Up
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
};

LoginBox.propTypes = {
  setAlert: PropTypes.func.isRequired,
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
  student: PropTypes.object,
  isTeacher: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  student: state.auth.student,
  isTeacher: state.auth.isTeacher
})

export default connect(mapStateToProps, { login, setAlert })(LoginBox);
