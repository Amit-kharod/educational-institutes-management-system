import React from 'react';
import { Link } from 'react-router-dom'

const LoginBox = () => {
  return (
    <div className="container">
      <h3 id='login-caption'>Log into your account</h3>
      <div id='login-box'>
        <div id='user-name'>
          <input
            type='text'
            name='userId'
            placeholder='Registration no/ User ID'
          />
        </div>
        <div id='password'>
          <input type='text' name='pass' placeholder='Password' />
        </div>
        <div className='big-blue-btn'>
          <span id='login-text'>Log In</span>
        </div>
        <div className="inline-link"><span><Link className="text-link" to="/forgot-password">Forgot Password?</Link></span></div>
        <div className='inline-link'>
          New User? <span><Link className="text-link" to="/signup">Sign Up</Link></span>
        </div>
      </div>
    </div>
  );
}

export default LoginBox;
