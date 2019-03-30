import React from 'react';
import { Link, BrowserRouter as Router } from 'react-router-dom';
import PropTypes from 'prop-types';
import img from '../assets/img/logo.png';

const Logo = () => {
  return (
    <a href="./" className="navbar-logo">
      <img className="logo" src={img} />
    </a>
  );
};

const MenuLink = props => {
  return (
    <li className="navbar-link" id={props.id}>
      <Link to={props.location}>{props.linkName}</Link>
    </li>
  );
};

const Menu = () => {
  return (
    <ul className="navbar-menu">
      <Router>
        <MenuLink id={'login'} location={'/login'} linkName={'Login'} />
        <MenuLink id={'signup'} location={'/signup'} linkName={'Sign Up'} />
      </Router>
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
  location: PropTypes.string,
  linkName: PropTypes.string
};

export default Header;
