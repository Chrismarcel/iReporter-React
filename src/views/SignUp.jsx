import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  func, objectOf, object, string, bool
} from 'prop-types';
import 'regenerator-runtime';
import { InputField } from '../components/FormComponents';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Spinner from '../components/Spinner';
import { registerAction, processingRequest, clearErrors } from '../redux/actions/authActions';

/**
 * @class SignUp
 * @description SignUp component
 * @param {object} event - Synthetic event object
 */
export class SignUpComponent extends Component {
  /**
   * @method componentDidMount
   * @returns {undefined}
   */
  componentDidMount() {
    const { clearAuthErrors } = this.props;
    clearAuthErrors();
  }

  inputChangeHandler = (event) => {
    const { clearAuthErrors } = this.props;
    clearAuthErrors();
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  handleSignUp = (event) => {
    const { register, displayLoader } = this.props;
    event.preventDefault();
    displayLoader();
    register(this.state);
  };

  /**
   * @method render
   * @description React render method
   * @returns {JSX} React component markup
   */
  render() {
    const { errors, loadingText, isLoggedIn } = this.props;
    return (
      <React.Fragment>
        {isLoggedIn && <Redirect to="./dashboard" />}
        <Header />
        <main>
          <section className="container form-container section-dark">
            <h2 className="section-title">Sign Up</h2>
            <form onSubmit={this.handleSignUp} className="form-card" method="post">
              <InputField
                forAttr="firstname"
                label="Enter First Name"
                fieldType="text"
                required
                fieldId="firstname"
                fieldName="firstname"
                placeHolder="Enter First Name"
                inputChangeHandler={this.inputChangeHandler}
              />
              <InputField
                forAttr="lastname"
                label="Enter Last Name"
                fieldType="text"
                required
                fieldId="lastname"
                fieldName="lastname"
                placeHolder="Enter Last Name"
                inputChangeHandler={this.inputChangeHandler}
              />
              <InputField
                forAttr="othername"
                label="Enter Other Name"
                fieldType="text"
                fieldId="othername"
                fieldName="othername"
                placeHolder="Enter Other Name"
                inputChangeHandler={this.inputChangeHandler}
              />
              <InputField
                forAttr="username"
                label="Enter Username"
                fieldType="text"
                required
                fieldId="username"
                fieldName="username"
                placeHolder="Enter Username"
                inputChangeHandler={this.inputChangeHandler}
              />
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
                forAttr="phonenumber"
                label="Enter Phone Number"
                fieldType="tel"
                required
                fieldId="phonenumber"
                fieldName="phonenumber"
                placeHolder="Enter Phone Number"
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
              {errors.error && <p className="error">{errors.error}</p>}
              <button type="submit" className="btn btn-primary">
                {loadingText ? <Spinner loadingText={loadingText} /> : 'Sign Up'}
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
    register: registerAction,
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
  const { errors, loadingText, isLoggedIn } = auth;
  return { errors, loadingText, isLoggedIn };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignUpComponent);

SignUpComponent.propTypes = {
  register: func.isRequired,
  errors: objectOf(object).isRequired,
  loadingText: string.isRequired,
  displayLoader: func.isRequired,
  clearAuthErrors: func.isRequired,
  isLoggedIn: bool.isRequired
};
