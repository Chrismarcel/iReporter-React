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
    inputChangeHandler,
    fieldValue
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
        value={fieldValue}
      />
    </React.Fragment>
  );
};

/**
 * @method InputField
 * @description InputField component
 * @param {object} props React props object
 * @returns {JSX} JSX Markup
 */
const TextField = (props) => {
  const {
    forAttr,
    label,
    required,
    fieldId,
    fieldName,
    inputChangeHandler,
    columnSize,
    placeHolder,
    minCharLength
  } = props;
  return (
    <React.Fragment>
      <label htmlFor={forAttr}>
        {label}
        {' '}
        <span>{required && '*'}</span>
      </label>
      <textarea
        id={fieldId}
        name={fieldName}
        className="form-element"
        onChange={inputChangeHandler}
        required={required}
        col={columnSize}
        placeholder={placeHolder}
        minLength={minCharLength}
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
  inputChangeHandler: func.isRequired,
  fieldValue: string
};

TextField.propTypes = {
  forAttr: string.isRequired,
  label: string.isRequired,
  required: bool,
  fieldId: string.isRequired,
  fieldName: string.isRequired,
  placeHolder: string.isRequired,
  inputChangeHandler: func.isRequired,
  columnSize: string,
  minCharLength: string
};

InputField.defaultProps = {
  required: false,
  fieldValue: ''
};

TextField.defaultProps = {
  required: false,
  columnSize: '10',
  minCharLength: '10'
};

export { InputField, TextField };
