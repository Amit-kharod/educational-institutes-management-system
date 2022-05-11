import React from 'react';

const Popup = (props) => {
  return (
    <div className="popup">
      <div className="popup-inner">
        <button className="popup-close" onClick={() => props.setTrigger(false)}>
          <img src="./img/icons/close.png" alt="close" />
        </button>
        Your account is created successfully
        <br />
        {props.children}
        <div id="popup-end">
         <span>This code will be used in case of Forgot-Password</span>
          Take a screenshot or save this code secretly
        </div>
      </div>
    </div>
  );
};

export default Popup;
