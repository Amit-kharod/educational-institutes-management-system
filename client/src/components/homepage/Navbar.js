import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../actions/auth';

const Navbar = ({ auth: { isAuthenticated, loading }, logout }) => {
  const studentLinks = (
    <Fragment>
            <li id="st-dashboard">Dashboard</li>
      <li id="leaderboard">LeaderBoard</li>
      <li id="poll">Poll</li>
      <li id="profile">Profile</li>
      <li id="logout">
        <Link onClick={logout} className="text-link purple-btn" to="/">
          Logout
        </Link>
      </li>
    </Fragment>
  );

  const guestLinks = (
    <Fragment>
      <li id="home">
        <Link className="text-link" to="/">
          Home
        </Link>
      </li>
      <li id="about">
        <Link className="text-link" to="/about">
          About
        </Link>
      </li>
      <li id="log-in">
        <Link className="text-link blue-btn" to="/login">
          Log In
        </Link>
      </li>
      <li id="sign-up">
        <Link className="text-link purple-btn" to="/signup">
          Sign Up
        </Link>
      </li>
    </Fragment>
  );
  
  return (
    <div id="nav">
      <ul id="nav-items">
        { !loading && (<Fragment>{ isAuthenticated ? studentLinks : guestLinks }</Fragment>)}
      </ul>
    </div>
  );
}

Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logout })(Navbar);
