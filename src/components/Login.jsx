import React, { Component } from 'react';
import 'regenerator-runtime';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  func, object, string, objectOf
} from 'prop-types';
import { InputField } from './FormComponents';
import Header from './Header';
import Footer from './Footer';
import Spinner from './Spinner';
import { loginAction, processingRequest, clearErrors } from '../redux/actions/authActions';

/**
 * @class Login
 * @description Login component
 * @param {object} event - Synthetic event object
 */
export class LoginComponent extends Component {
  inputChangeHandler = (event) => {
    const { clearAuthErrors } = this.props;
    clearAuthErrors();
    this.setState({
      [event.target.id]: event.target.value
    });
  };

  handleLogin = (event) => {
    const { login, displayLoader } = this.props;
    event.preventDefault();
    displayLoader();
    login(this.state);
  };

  /**
   * @method render
   * @description React render method
   * @returns {JSX} React component markup
   */
  render() {
    const { errors, loadingText } = this.props;
    return (
      <React.Fragment>
        <Header />
        <main>
          <section className="container form-container section-dark">
            <h2 className="section-title">Login</h2>
            <form onSubmit={this.handleLogin} className="form-card" method="post">
              {errors.error && <p className="error">{errors.error}</p>}
              <InputField
                forAttr="email"
                label="Enter Email"
                fieldType="email"
                required
                fieldId="email"
                fieldName="email"
                placeHolder="Enter Email"
                inputChangeHandler={this.inputChangeHandler}
              />
              <InputField
                forAttr="password"
                label="Enter Password"
                fieldType="password"
                required
                fieldId="password"
                fieldName="password"
                placeHolder="Enter Password"
                inputChangeHandler={this.inputChangeHandler}
              />
              <button type="submit" className="btn btn-primary">
                {loadingText ? <Spinner loadingText={loadingText} /> : 'Login'}
              </button>
            </form>
          </section>
        </main>
        <Footer />
      </React.Fragment>
    );
  }
}

/**
 * @method mapDispatchToProps
 * @description maps redux actions to props
 * @param {callback} dispatch destructured reducer state object
 * @returns {object} state
 */
export const mapDispatchToProps = dispatch => bindActionCreators(
  {
    login: loginAction,
    displayLoader: processingRequest,
    clearAuthErrors: clearErrors
  },
  dispatch
);

/**
 * @method mapStateToProps
 * @description maps reducer states to props
 * @param {object} * destructured reducer state object
 * @returns {object} state
 */
export const mapStateToProps = ({ auth }) => {
  const { errors, loadingText } = auth;
  return {
    errors,
    loadingText
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginComponent);

LoginComponent.propTypes = {
  login: func.isRequired,
  errors: objectOf(object).isRequired,
  displayLoader: func.isRequired,
  loadingText: string.isRequired,
  clearAuthErrors: func.isRequired
};
