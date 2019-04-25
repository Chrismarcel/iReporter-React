import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { bool } from 'prop-types';
import logo from '../assets/img/logo.png';
import MenuLink from './MenuLink';

/**
 * @method Header
 * @param {object} props React props object
 * @description Header component
 * @returns {JSX} JSX Markup
 */
const Header = ({ isLoggedIn }) => (
  <header>
    <nav className="navbar">
      <a href="./" className="navbar-logo">
        <img className="logo" src={logo} alt="Logo" />
      </a>
      <button type="button" className="hamburger-menu">
        <span className="hamburger" />
      </button>
      <ul className="navbar-menu">
        {!isLoggedIn && (
          <Fragment>
            <MenuLink to="/login" id="login" linkName="Login" />
            <MenuLink to="/signup" id="signup" linkName="Sign Up" />
          </Fragment>
        )}
        {isLoggedIn && (
          <Fragment>
            <MenuLink to="/create-report" id="login" linkName="Create Report" />
            <MenuLink to="/dashboard" id="signup" linkName="Dashboard" />
            <MenuLink to="/logout" id="signup" linkName="Logout" />
          </Fragment>
        )}
      </ul>
    </nav>
  </header>
);

/**
 * @method mapStateToProps
 * @description maps reducer states to props
 * @param {object} * destructured reducer state object
 * @returns {object} state
 */
export const mapStateToProps = ({ auth }) => {
  const { isLoggedIn } = auth;
  return { isLoggedIn };
};

export default connect(mapStateToProps)(Header);

Header.propTypes = {
  isLoggedIn: bool.isRequired
};
