import React, { useState, useEffect } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { setAlert } from '../../actions/alert';
import { register } from '../../actions/auth';
import { validate } from 'email-validator';
import PropTypes from 'prop-types';

const SignupBox = ({ data, setAlert, register, isAuthenticated, student }) => {
  let programmes = [];
  let selectedProgramme;
  data &&
    data.map((item) => {
      item.programmes.map((item2) => {
        programmes.push(item2);
      });
    });
  console.log(programmes);
  let semList = programmes[0] && programmes[0].sem;
  console.log(data)
  console.log(semList);
  const [formData, setFormData] = useState({
    name: '',
    registrationNo: '',
    rollNo: '',
    email: '',
    password: '',
    password2: '',
    programme: 'mca',
    sem: '2',
  });
  console.log(formData);

  const {
    name,
    registrationNo,
    rollNo,
    email,
    password,
    password2,
    programme,
    sem,
  } = formData;

  const setProgramme = () => {};
  const onProgrammeChange = (e) => {
    console.log(e.target.value);
    setFormData({ ...formData, programme: e.target.value });
  };
  const onSemChange = (e) => {
    console.log(e.target.value);
    setFormData({ ...formData, sem: e.target.value });
  };
  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = () => {
    const isNameValid = /^[a-z A-Z]+$/.test(name);
    const isRegistrationValid = registrationNo.length === 10;
    const isRollNoValid = /^-?\d+$/.test(rollNo);
    const isEmailValid = validate(email);
    const isPasswordValid = password.length >= 6;
    const isSamePassword = password === password2;

    if (isNameValid) {
      if (isRegistrationValid) {
        if (isRollNoValid) {
          if (isEmailValid) {
            if (isPasswordValid) {
              if (isSamePassword) {
                register({ name, email, registrationNo, rollNo, password, programme, sem });
              } else {
                setAlert("Passwords don't match", 'danger');
              }
            } else {
              setAlert('Enter a valid Password', 'danger');
            }
          } else setAlert('Enter a valid Email', 'danger');
        } else setAlert('Enter a valid Roll No', 'danger');
      } else setAlert('Enter a valid Registration No', 'danger');
    } else setAlert('Enter a valid Name', 'danger');
  };

  if (isAuthenticated && student) {
    return <Navigate to="/studentDashboard" />;
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
        <div id="roll-no">
          <input
            type="text"
            name="rollNo"
            placeholder="Roll No"
            value={rollNo}
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
        <label>Programme</label>
        <select
          name="programme"
          className="programme-select"
          onChange={(e) => onProgrammeChange(e)}
        >
          {programmes.map((item) => {
            return (
              <option key={item.name} value={item.name}>
                {item.name.toUpperCase()}
              </option>
            );
          })}
        </select>
        <label>Sem</label>
        <select name="sem" className="programme-select" onChange={(e) => onSemChange(e)}>
          {
            data && semList.map((item)=>{
              return (
                <option key={item} value={item}>
                  {item}
                </option>
              );
            })
          }
        </select>
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
  student: PropTypes.object,
  data: PropTypes.array,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  student: state.auth.student,
  data: state.data,
});

export default connect(mapStateToProps, { setAlert, register })(SignupBox);
