import React from 'react';
import { string, bool, func } from 'prop-types';

/**
 * @method InputField
 * @description InputField component
 * @param {object} props React props object
 * @returns {JSX} JSX Markup
 */
const InputField = (props) => {
  const {
    forAttr,
    label,
    required,
    fieldType,
    fieldId,
    fieldName,
    placeHolder,
    inputChangeHandler
  } = props;
  return (
    <React.Fragment>
      <label htmlFor={forAttr}>
        {label}
        {' '}
        <span>{required && '*'}</span>
      </label>
      <input
        type={fieldType}
        id={fieldId}
        name={fieldName}
        className="form-element"
        placeholder={placeHolder}
        onChange={inputChangeHandler}
        required={required}
      />
    </React.Fragment>
  );
};

InputField.propTypes = {
  forAttr: string.isRequired,
  label: string.isRequired,
  fieldType: string.isRequired,
  required: bool,
  fieldId: string.isRequired,
  fieldName: string.isRequired,
  placeHolder: string.isRequired,
  inputChangeHandler: func.isRequired
};

InputField.defaultProps = {
  required: false
};

export default InputField;
