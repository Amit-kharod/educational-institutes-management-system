import React from 'react';

function LoginBox() {
  return (
    <div className='login-box'>
      <div className='user-name'>
        <input type='text' name='userId' placeholder='ENTER YOUR USER ID' />
      </div>
      <div className='password'>
        <input type='text' name='pass' placeholder='ENTER YOUR PASSWORD' />
      </div>
      <div className='login-button'>
        <span id='login-text'>Log In</span>
      </div>
      <div className='sign-up'>
        NEW USER? <span className='link'>SIGN UP</span>
      </div>
    </div>
  );
}

export default LoginBox;
