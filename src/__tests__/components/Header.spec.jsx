import React from 'react';
import { shallow } from 'enzyme';
import Header, { Logo, Menu, MenuLink } from '../../components/Header';
import logo from '../../assets/img/logo.png';

describe('Logo component should be rendered', () => {
  const logoComponent = shallow(<Logo />);

  it('should ensure anchor tag is present', () => {
    expect(logoComponent.find('.navbar-logo').exists()).toBe(true);
  });

  it('should ensure anchor tag has an img child', () => {
    expect(logoComponent.find('.logo').exists()).toBe(true);
  });

  it('should contain a logo.png src attribute', () => {
    expect(logoComponent.find('.logo').prop('src')).toEqual(logo);
  });
});

describe('Menu links component should be rendered', () => {
  const menuLinksComponent = shallow(<MenuLink id="login" location="/login" linkName="Login" />);

  it('should ensure menu links are present', () => {
    expect(menuLinksComponent.find('.navbar-link').exists()).toBe(true);
  });
});

describe('Menu component should be rendered', () => {
  const menuComponent = shallow(<Menu />);

  it('should ensure menu links are present', () => {
    expect(menuComponent.find('.navbar-menu').exists()).toBe(true);
  });
});

describe('Header component should be rendered', () => {
  const headerComponent = shallow(<Header />);

  it('should ensure header tag is present', () => {
    expect(headerComponent.find('header').exists()).toBe(true);
  });

  it('should ensure header tag has a navbar child', () => {
    expect(headerComponent.find('header > .navbar').exists()).toBe(true);
  });
});
