import React, { Fragment, Component } from 'react';
import { connect } from 'react-redux';
import { bool, func } from 'prop-types';
import { bindActionCreators } from 'redux';
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
  handleUserLogout = (event) => {
    event.preventDefault();
    const { logoutUserFn } = this.props;
    logoutUserFn();
  };

  /**
   * @method render
   * @description React render method
   * @returns {JSX} React component markup
   */
  render() {
    const { isLoggedIn } = this.props;
    return (
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
                <MenuLink
                  to="/logout"
                  id="signup"
                  linkName="Logout"
                  handleClick={this.handleUserLogout}
                />
              </Fragment>
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
  const { isLoggedIn } = auth;
  return { isLoggedIn };
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
  logoutUserFn: func.isRequired
};
