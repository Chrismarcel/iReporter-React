import React from 'react';
import { mount, shallow } from 'enzyme';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import ReduxPromise from 'redux-promise';
import { BrowserRouter as Router } from 'react-router-dom';
import reducers from '../../redux/reducers';
import SignUp, { SignUpComponent } from '../../views/SignUp';

const store = createStore(reducers, applyMiddleware(ReduxPromise));
describe('test Sign up component', () => {
  const signUpComponent = mount(
    <Provider store={store}>
      <Router>
        <SignUp clearAuthErrors={jest.fn()} />
      </Router>
    </Provider>
  );
  it('should ensure that header exists', () => {
    expect(signUpComponent.find('.section-title').text()).toEqual('Sign Up');
  });

  it('should mock form submission', async () => {
    const mockFn = jest.fn();
    const signUpForm = signUpComponent.find('form.form-card');
    signUpForm.simulate('submit', { preventDefault: mockFn });
  });

  it('should mock user input', async () => {
    const mockFn = jest.fn();
    const inputField = signUpComponent.find('InputField').at(0);
    inputField.find('input').simulate('change', { preventDefault: mockFn });
  });
});

describe('test Sign Up component with Errors', () => {
  const mockErrorMsg = { error: 'Incorrect username' };
  const signUpComponent = shallow(
    <SignUpComponent errors={{ error: mockErrorMsg }} clearAuthErrors={jest.fn} />
  );
  it('should display error tag', () => {
    expect(signUpComponent.find('p.error').exists()).toBe(true);
  });
});
