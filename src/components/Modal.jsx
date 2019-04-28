import React, { Fragment } from 'react';
import { string, node, func } from 'prop-types';

/**
 * @method Modal
 * @description Modal component
 * @returns {JSX} JSX Markup
 */
const Modal = ({
  title, modalClass, children, closeModal
}) => (
  <Fragment>
    <div className="modal-toggle modal-open" />
    <div className={`modal ${modalClass}`}>
      <div className="modal-header">
        <p className="modal-title">{title}</p>
        <span role="presentation" onClick={closeModal} className="modal-close">
          ×
        </span>
      </div>
      <div className="modal-body">{children}</div>
    </div>
  </Fragment>
);

Modal.propTypes = {
  title: string.isRequired,
  modalClass: string.isRequired,
  children: node.isRequired,
  closeModal: func.isRequired
};

export default Modal;
