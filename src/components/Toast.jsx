import React from 'react';
import { string, bool, func } from 'prop-types';

/**
 * @method Toast
 * @description Toast component
 * @returns {JSX} JSX Markup
 */
const Toast = ({
  toastClass, toastShow, toastMessage, closeBtn, handleCloseToast
}) => (
  <div className={`toast ${toastClass} ${toastShow}`}>
    <div className="toast-message">{toastMessage}</div>
    {closeBtn && (
      <span className="toast-hide" role="presentation" onClick={handleCloseToast}>
        ×
      </span>
    )}
  </div>
);

export default Toast;

Toast.propTypes = {
  toastClass: string.isRequired,
  toastShow: string.isRequired,
  toastMessage: string.isRequired,
  handleCloseToast: func.isRequired,
  closeBtn: bool
};

Toast.defaultProps = {
  closeBtn: false
};
