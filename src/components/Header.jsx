import React from 'react';
import { Route, Link } from 'react-router-dom';
import { string, bool } from 'prop-types';
import logo from '../assets/img/logo.png';

/**
 * @method Logo
 * @description Logo component
 * @returns {JSX} JSX Markup
 */
const Logo = () => (
  <a href="./" className="navbar-logo">
    <img className="logo" src={logo} alt="Logo" />
  </a>
);

/**
 * @method MenuLink
 * @description Custom Menu links component
 * @returns {JSX} JSX Markup
 */
const MenuLink = ({ to, ...props }) => {
  const { id, linkName } = props;
  return (
    <li className="navbar-link" id={id}>
      <Route path={to} exact>
        {({ match }) => (
          <Link to={to} replace={Boolean(match)}>
            {linkName}
          </Link>
        )}
      </Route>
    </li>
  );
};

/**
 * @method Menu
 * @description Menu component
 * @returns {JSX} JSX Markup
 */
const Menu = () => (
  <ul className="navbar-menu">
    <MenuLink to="/login" id="login" linkName="Login" />
    <MenuLink to="/signup" id="signup" linkName="Sign Up" />
  </ul>
);

/**
 * @method Header
 * @description Header component
 * @returns {JSX} JSX Markup
 */
const Header = () => (
  <header>
    <nav className="navbar">
      <Logo />
      <button type="button" className="hamburger-menu">
        <span className="hamburger" />
      </button>
      <Menu />
    </nav>
  </header>
);

MenuLink.propTypes = {
  id: string.isRequired,
  linkName: string.isRequired,
  to: string.isRequired,
  replace: bool.isRequired
};

export { Logo, Menu, MenuLink };
export default Header;
