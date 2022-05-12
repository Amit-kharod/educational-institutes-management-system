import React, { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { setAlert } from '../../actions/alert';
import { register } from '../../actions/auth';
import { validate } from 'email-validator';
import PropTypes from 'prop-types';

const SignupBox = ({ setAlert, register, isAuthenticated, student }) => {
  const [formData, setFormData] = useState({
    name: '',
    registrationNo: '',
    email: '',
    password: '',
    password2: '',
  });

  const { name, registrationNo, email, password, password2 } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = () => {
    const isNameValid = /^[a-zA-Z]+$/.test(name);
    const isRegistrationValid = registrationNo.length === 10;
    const isEmailValid = validate(email);
    const isPasswordValid = password.length >= 6;
    const isSamePassword = password === password2;

    if (isNameValid) {
      if (isRegistrationValid) {
        if (isEmailValid) {
          if (isPasswordValid) {
            if (isSamePassword) {
              register({ name, email, registrationNo, password });
            } else {
              setAlert("Passwords don't match", 'danger');
            }
          } else {
            setAlert('Enter a valid Password', 'danger');
          }
        } else setAlert('Enter a valid Email', 'danger');
      } else setAlert('Enter a valid Registration No', 'danger');
    } else setAlert('Enter a valid Name', 'danger');
  };

  if (isAuthenticated && student) {
    return <Navigate to="/studentDashboard"/>
  }

  return (
    <div className="container">
      <h3 className="signup-caption">Fill in the details</h3>
      <div className="signup-box">
        <div id="name-dmc">
          <input
            type="text"
            name="name"
            placeholder="Name(as per your DMC)"
            value={name}
            onChange={(e) => onChange(e)}
          />
        </div>
        <div id="registration-no">
          <input
            type="text"
            name="registrationNo"
            placeholder="Registration No."
            value={registrationNo}
            onChange={(e) => onChange(e)}
          />
        </div>
        <div id="signup-email">
          <input
            type="text"
            name="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => onChange(e)}
            required
          />
        </div>
        <div id="signup-password">
          <input
            type="password"
            name="password"
            placeholder="Password(at least 6 characters)"
            value={password}
            onChange={(e) => onChange(e)}
          />
        </div>
        <div id="signup-password-confirm">
          <input
            type="password"
            name="password2"
            placeholder="Confirm Password"
            value={password2}
            onChange={(e) => onChange(e)}
          />
        </div>
        <div className="big-blue-btn" onClick={onSubmit}>
          <span id="login-text">Create Account</span>
        </div>
        <div className="inline-link">
          Already a User?{' '}
          <span>
            <Link className="text-link" to="/login">
              Log In
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
};

SignupBox.propTypes = {
  setAlert: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
  student: PropTypes.object
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  student: state.auth.student
});

export default connect(mapStateToProps, { setAlert, register })(SignupBox);
