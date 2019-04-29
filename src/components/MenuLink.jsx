import React from 'react';
import { Route, Link } from 'react-router-dom';
import { string, bool, func } from 'prop-types';

/**
 * @method MenuLink
 * @description Custom Menu links component
 * @returns {JSX} JSX Markup
 */
const MenuLink = ({ to, ...props }) => {
  const { id, linkName, handleClick } = props;
  return (
    <li className="navbar-link" id={id}>
      <Route path={to} exact>
        {({ match }) => (
          <Link to={to} onClick={handleClick} replace={Boolean(match)}>
            {linkName}
          </Link>
        )}
      </Route>
    </li>
  );
};

export default MenuLink;

MenuLink.propTypes = {
  id: string.isRequired,
  linkName: string.isRequired,
  to: string.isRequired,
  replace: bool.isRequired,
  handleClick: func
};

MenuLink.defaultProps = {
  handleClick: () => {}
};
