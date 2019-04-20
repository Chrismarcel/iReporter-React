import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import SignUp from '../components/SignUp.jsx';

configure({ adapter: new Adapter() });

describe('test Sign up component', () => {
  const signUp = shallow(<SignUp />);
  it('should ensure that header exists', () => {
    expect(signUp.find('.section-title').text()).toEqual('Sign Up');
  });
});
