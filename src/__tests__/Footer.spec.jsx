import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Footer from '../components/Footer.jsx';

configure({ adapter: new Adapter() });

describe('Footer component should be rendered', () => {
  const footerComponent = shallow(<Footer />);

  it('should contain a footer element', () => {
    expect(footerComponent.find('footer').exists()).toBe(true);
  });

  it('should contain a p child element', () => {
    expect(footerComponent.find('footer > p').exists()).toBe(true);
    expect(footerComponent.find('p').length).toBe(1);
  });
});
