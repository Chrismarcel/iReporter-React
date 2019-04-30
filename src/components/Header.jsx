import React, { Fragment, Component } from 'react';
import { connect } from 'react-redux';
import { bool, func } from 'prop-types';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';
import logo from '../assets/img/logo.png';
import MenuLink from './MenuLink';
import { logoutUser } from '../redux/actions/authActions';

/**
 * @method Header
 * @param {object} event React synthetic event object
 * @description Header component
 * @returns {JSX} JSX Markup
 */
class Header extends Component {
  state = {
    menuOpen: false
  };

  handleUserLogout = (event) => {
    event.preventDefault();
    const { logoutUserFn } = this.props;
    logoutUserFn();
  };

  toggleHamburgerMenu = () => {
    const { menuOpen } = this.state;
    this.setState({ menuOpen: !menuOpen });
  };

  /**
   * @method render
   * @description React render method
   * @returns {JSX} React component markup
   */
  render() {
    const { isLoggedIn, isAdmin } = this.props;
    const { menuOpen } = this.state;

    const activeHamburgerClass = menuOpen ? 'menu-open' : '';

    return (
      <header>
        <nav className="navbar">
          <Link to="./" className="navbar-logo">
            <img className="logo" src={logo} alt="Logo" />
          </Link>
          <button
            type="button"
            onClick={this.toggleHamburgerMenu}
            className={`hamburger-menu ${activeHamburgerClass}`}
          >
            <span className="hamburger" />
          </button>
          <ul
            onClick={this.toggleHamburgerMenu}
            role="presentation"
            className={`navbar-menu ${activeHamburgerClass}`}
          >
            {!isLoggedIn && (
              <Fragment>
                <MenuLink to="/login" id="login" linkName="Login" />
                <MenuLink to="/signup" id="signup" linkName="Sign Up" />
              </Fragment>
            )}
            {isLoggedIn && !isAdmin && (
              <Fragment>
                <MenuLink to="/create-report" id="login" linkName="Create Report" />
                <MenuLink to="/dashboard" id="signup" linkName="Dashboard" />
              </Fragment>
            )}
            {isLoggedIn && isAdmin && (
              <Fragment>
                <MenuLink to="/admin" id="signup" linkName="Admin" />
              </Fragment>
            )}
            {isLoggedIn && (
              <MenuLink
                to="/logout"
                id="signup"
                linkName="Logout"
                handleClick={this.handleUserLogout}
              />
            )}
          </ul>
        </nav>
      </header>
    );
  }
}

/**
 * @method mapStateToProps
 * @description maps reducer states to props
 * @param {object} * destructured reducer state object
 * @returns {object} state
 */
export const mapStateToProps = ({ auth }) => {
  const { isLoggedIn, isAdmin } = auth;
  return { isLoggedIn, isAdmin };
};

/**
 * @method mapDispatchToProps
 * @returns {object} dispatchable actions
 * @param {callback} dispatch
 */
export const mapDispatchToProps = dispatch => bindActionCreators(
  {
    logoutUserFn: logoutUser
  },
  dispatch
);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Header);

Header.propTypes = {
  isLoggedIn: bool.isRequired,
  isAdmin: bool.isRequired,
  logoutUserFn: func.isRequired
};
