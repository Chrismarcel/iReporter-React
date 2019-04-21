import React from 'react';
import { shallow } from 'enzyme';
import Footer from '../../components/Footer';

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
