import React from 'react';
import { mount, shallow } from 'enzyme';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import ReduxPromise from 'redux-promise';
import { BrowserRouter as Router } from 'react-router-dom';
import reducers from '../../redux/reducers';
import Login, { LoginComponent } from '../../views/Login';

const store = createStore(reducers, applyMiddleware(ReduxPromise));
describe('test Login component', () => {
  const loginComponent = mount(
    <Provider store={store}>
      <Router>
        <Login />
      </Router>
    </Provider>
  );
  it('should ensure that header exists', () => {
    expect(loginComponent.find('.section-title').text()).toEqual('Login');
  });

  it('should mock form submission', async () => {
    const mockFn = jest.fn();
    const loginForm = loginComponent.find('form.form-card');
    loginForm.simulate('submit', { preventDefault: mockFn });
  });

  it('should mock user input', async () => {
    const mockFn = jest.fn();
    const inputField = loginComponent.find('InputField').at(0);
    inputField.find('input').simulate('change', { preventDefault: mockFn });
  });
});

describe('test Login component with Errors', () => {
  const mockErrorMsg = { error: 'Incorrect username' };
  const loginComponent = shallow(<LoginComponent errors={{ error: mockErrorMsg }} />);
  it('should error tag is displayed', () => {
    expect(loginComponent.find('p.error').exists()).toBe(true);
  });
});
