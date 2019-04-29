import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import ReduxPromise from 'redux-promise';
import Dashboard from './views/Dashboard';
import LandingPage from './views/LandingPage';
import SignUp from './views/SignUp';
import Login from './views/Login';
import CreateReport from './views/CreateReport';
import AdminDashboard from './views/AdminDashboard';
import EditReport from './views/EditReport';
import reducers from './redux/reducers';
import './assets/scss/styles.scss';

const store = createStore(reducers, applyMiddleware(ReduxPromise));

/**
 * @method App
 * @description Main app component
 * @returns {undefined}
 */
const App = () => (
  <Provider store={store}>
    <BrowserRouter>
      <div>
        <Route exact path="/" component={LandingPage} />
        <Route path="/signup" component={SignUp} />
        <Route path="/login" component={Login} />
        <Route path="/create-report" component={CreateReport} />
        <Route path="/edit-report/:reportType/:id" component={EditReport} />
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/admin" component={AdminDashboard} />
      </div>
    </BrowserRouter>
  </Provider>
);

ReactDOM.render(<App />, document.getElementById('app'));
