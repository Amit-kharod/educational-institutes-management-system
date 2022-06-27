import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../actions/auth';

const Navbar = ({
  auth: { isAuthenticated, loading, isAdmin, student, admin, isTeacher },
  logout,
}) => {
  const studentLinks = (
    <Fragment>
      <li id="st-dashboard">Dashboard</li>
      <li id="leaderboard">LeaderBoard</li>
      <li id="students">Poll</li>
      <li id="profile">Profile</li>
      <li id="logout">
        <Link onClick={logout} className="text-link purple-btn" to="/">
          Log Out
        </Link>
      </li>
    </Fragment>
  );

  const adminLinks = (
    <Fragment>
      <li id="admin-dashboard">
        <Link className="text-link" to="/adminDashboard">
          Dashboard
        </Link>
      </li>
      <li id="departments">
        <Link className="text-link" to="/departments">
          Departments
        </Link>
      </li>
      <li id="admin-logout">
        <Link onClick={logout} className="text-link purple-btn" to="/">
          Log Out
        </Link>
      </li>
    </Fragment>
  );
  const teacherLinks = (
    <Fragment>
      <li id="admin-dashboard">
        <Link className="text-link" to="/teacherDashboard">
          Dashboard
        </Link>
      </li>
      <li id="admin-logout">
        <Link onClick={logout} className="text-link purple-btn" to="/">
          Log Out
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
      {isAdmin && (
        <li id="admin">
          <Link className="text-link" to="/admin">
            Admin
          </Link>
        </li>
      )}

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
        {!loading && (
          <Fragment>
            {isAuthenticated && student && studentLinks}
            {isAuthenticated && admin && adminLinks}
            {!isAuthenticated && guestLinks}
            {isTeacher && teacherLinks}
          </Fragment>
        )}
      </ul>
      
    </div>
  );
};

Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logout })(Navbar);
