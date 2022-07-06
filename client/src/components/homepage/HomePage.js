import React from 'react';
import { Navigate } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const HomePage = ({ admin, isAdmin }) => {
  if(admin && isAdmin){
    return <Navigate to="/adminDashboard"/>
  }
  return (
    <div id="homepage">
      <div id="project-name">
        <div id="eims2" className="eims">
          U<span>niversity</span>
        </div>
        <div id="eims3" className="eims">
          M<span>anagement</span>
        </div>
        <div id="eims4" className="eims">
          S<span>ystem</span>
        </div>
      </div>
      <div id="headline">
        <div className="headline-text">
          A one-stop system for managing and processing
        </div>
        <div className="headline-text">
          academic data about students and staff
        </div>
        <div className="headline-text">with additional features.</div>
      </div>
      <div id="key-features">
        <div className="big-heading-white">Key Features</div>
        <ul id="features">
          <li className="feature"><span>&#11044;</span> University Data Management</li>
          <li className="feature"><span>&#11044;</span> Teachers Management</li>
          <li className="feature"><span>&#11044;</span> Assignment Management</li>
          <li className="feature"><span>&#11044;</span> Student Verification</li>
        </ul>
      </div>
    </div>
  );
};

HomePage.propTypes = {
  admin: PropTypes.object,
  isAdmin: PropTypes.bool
};

const mapStateToProps = state => ({
  admin: state.auth.admin,
  isAdmin: state.auth.isAdmin
})

export default connect(mapStateToProps)(HomePage);
