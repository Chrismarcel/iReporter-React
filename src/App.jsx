import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage.jsx';
import SignUp from './components/SignUp.jsx';
import './assets/scss/styles.scss';

const App = () => {
  return (
    <BrowserRouter>
      <div>
        <Route exact path="/" component={LandingPage} />
        <Route path="/signup" component={SignUp} />
      </div>
    </BrowserRouter>
  );
};

ReactDOM.render(<App />, document.getElementById('app'));
