import React from 'react';
import { mount, shallow } from 'enzyme';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import ReduxPromise from 'redux-promise';
import { BrowserRouter as Router } from 'react-router-dom';
import reducers from '../../redux/reducers';
import Header from '../../components/Header';
import MenuLink from '../../components/MenuLink';
import logo from '../../assets/img/logo.png';

describe('Menu links component should be rendered', () => {
  const menuLinksComponent = shallow(<MenuLink id="login" location="/login" linkName="Login" />);

  it('should ensure menu links are present', () => {
    expect(menuLinksComponent.find('.navbar-link').exists()).toBe(true);
  });
});

const store = createStore(reducers, applyMiddleware(ReduxPromise));
describe('Header component should be rendered', () => {
  const headerComponent = mount(
    <Provider store={store}>
      <Router>
        <Header />
      </Router>
    </Provider>
  );

  it('should ensure header tag is present', () => {
    expect(headerComponent.find('header').exists()).toBe(true);
  });

  it('should ensure header tag has a navbar child', () => {
    expect(headerComponent.find('header > .navbar').exists()).toBe(true);
  });

  it('should ensure anchor tag is present', () => {
    expect(headerComponent.find('.navbar-logo').exists()).toBe(true);
  });

  it('should ensure anchor tag has an img child', () => {
    expect(headerComponent.find('.logo').exists()).toBe(true);
  });

  it('should contain a logo.png src attribute', () => {
    expect(headerComponent.find('.logo').prop('src')).toEqual(logo);
  });

  it('should ensure menu links are present', () => {
    expect(headerComponent.find('.navbar-menu').exists()).toBe(true);
  });
});
