import React from 'react';
import { Link } from 'react-router-dom';

const SignupBox = () => {
  return (
    <div className="container">
      <h3 className="signup-caption">Fill in the details</h3>
      <div className="signup-box">
        <div id="name-dmc">
          <input
            type="text"
            name="name-dmc"
            placeholder="Name(as per your DMC)"
          />
        </div>
        <div id="registration-no">
          <input type="text" name="pass" placeholder="Registration No." />
        </div>
        <div id="signup-email">
          <input type="text" name="pass" placeholder="Email Address" />
        </div>
        <div id="signup-password">
          <input
            type="text"
            name="pass"
            placeholder="Password(at least 6 characters)"
          />
        </div>
        <div className="big-blue-btn">
          <span id="login-text">Create Account</span>
        </div>
        <div class="inline-link">
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

export default SignupBox;
