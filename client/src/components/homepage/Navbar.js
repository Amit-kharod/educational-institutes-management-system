import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <div id="nav">
      <ul id="nav-items">
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
      </ul>
    </div>
  );
};

export default Navbar;
