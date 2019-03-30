import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage.jsx';
import './assets/scss/styles.scss';

const App = () => {
  return (
    <BrowserRouter>
      <Route exact path="/" component={LandingPage} />
    </BrowserRouter>
  );
};

ReactDOM.render(<App />, document.getElementById('app'));
