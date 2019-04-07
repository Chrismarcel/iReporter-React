import React from 'react';
import { Route, Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import logo from '../assets/img/logo.png';

const Logo = () => {
  return (
    <a href="./" className="navbar-logo">
      <img className="logo" src={logo} />
    </a>
  );
};

const MenuLink = ({ to, ...props }) => (
  <li className="navbar-link" id={props.id}>
    <Route path={to} exact>
      {({ match }) => (
        <Link to={to} replace={Boolean(match)}>
          {props.linkName}
        </Link>
      )}
    </Route>
  </li>
);

const Menu = () => {
  return (
    <ul className="navbar-menu">
      <MenuLink to="/login" id={'login'} linkName={'Login'} />
      <MenuLink to="/signup" id={'signup'} linkName={'Sign Up'} />
    </ul>
  );
};
const Header = () => {
  return (
    <header>
      <nav className="navbar">
        <Logo />
        <button className="hamburger-menu">
          <a className="hamburger" />
        </button>
        <Menu />
      </nav>
    </header>
  );
};

MenuLink.propTypes = {
  id: PropTypes.string,
  linkName: PropTypes.string,
  to: PropTypes.string,
  replace: PropTypes.bool
};

export { Logo, Menu, MenuLink };
export default Header;
