import React from 'react';
import { mount } from 'enzyme';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import ReduxPromise from 'redux-promise';
import { BrowserRouter as Router } from 'react-router-dom';
import reducers from '../../redux/reducers';
import LandingPage from '../../views/LandingPage';

const store = createStore(reducers, applyMiddleware(ReduxPromise));
describe('test Landing Page component', () => {
  const landingPage = mount(
    <Provider store={store}>
      <Router>
        <LandingPage />
      </Router>
    </Provider>
  );
  it('should ensure that header, main section and footer components exist', () => {
    expect(landingPage.find('MainSection').exists()).toBe(true);
    expect(landingPage.find('Footer').exists()).toBe(true);
  });
});
