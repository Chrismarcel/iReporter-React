import React from 'react';
import { shallow } from 'enzyme';
import { TextField, InputField } from '../../components/FormComponents';

describe('Text field component should be rendered', () => {
  const mockProps = {
    forAttr: 'comment',
    label: 'Please enter comment',
    required: 'true',
    fieldId: 'comment',
    fieldName: 'comment',
    inputChangeHandler: jest.fn(),
    columnSize: 20,
    placeHolder: 'Enter comment',
    minCharLength: '10'
  };
  const textFieldComponent = shallow(<TextField {...mockProps} />);

  it('should render a text field with the passed in prop', () => {
    expect(textFieldComponent.find('textarea').exists()).toBe(true);
  });
});

describe('Input field component should be rendered', () => {
  const mockProps = {
    forAttr: 'comment',
    label: 'Please enter comment',
    required: 'true',
    fieldId: 'comment',
    fieldName: 'comment',
    inputChangeHandler: jest.fn(),
    columnSize: 20,
    placeHolder: 'Enter comment',
    minCharLength: '10'
  };
  const textFieldComponent = shallow(<InputField {...mockProps} />);

  it('should render a text field with the passed in prop', () => {
    expect(textFieldComponent.find('input').exists()).toBe(true);
  });
});
