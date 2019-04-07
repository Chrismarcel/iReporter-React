import React from 'react';
import PropTypes from 'prop-types';

const InputField = props => {
  return (
    <React.Fragment>
      <label htmlFor={props.forAttr}>
        {props.label} <span>{props.required}</span>
      </label>
      <input
        type={props.fieldType}
        id={props.fieldId}
        name={props.fieldName}
        className="form-element"
        placeholder={props.placeHolder}
        onChange={props.inputChangeHandler}
        required
      />
    </React.Fragment>
  );
};

InputField.propTypes = {
  forAttr: PropTypes.string,
  label: PropTypes.string,
  fieldType: PropTypes.string,
  required: PropTypes.string,
  fieldId: PropTypes.string,
  fieldName: PropTypes.string,
  placeHolder: PropTypes.string,
  inputChangeHandler: PropTypes.func
};

export default InputField;
