import React from 'react';
import { Route, Link } from 'react-router-dom';
import { string, bool } from 'prop-types';

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

export default MenuLink;

MenuLink.propTypes = {
  id: string.isRequired,
  linkName: string.isRequired,
  to: string.isRequired,
  replace: bool.isRequired
};
