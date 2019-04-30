import React from 'react';
import { string } from 'prop-types';

/**
 * @method Spinner
 * @description - Spinner component to display loading state
 * @returns {JSX} JSX markup
 */
const Spinner = ({ loadingText }) => (
  <div className="spinner">
    <i className="fas fa-circle-notch fa-spin" />
    <span>{loadingText}</span>
  </div>
);

export default Spinner;

Spinner.propTypes = {
  loadingText: string.isRequired
};
