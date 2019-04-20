import React, { Component } from 'react';
import axios from 'axios';
import 'regenerator-runtime';
import InputField from './FormComponents.jsx';
import Header from './Header.jsx';
import Footer from './Footer.jsx';
import Spinner from './Spinner.jsx';
import BASE_URL from '../config';

class SignUp extends Component {
  state = {
    buttonText: 'Sign Up'
  };

  inputChangeHandler = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  handleSignUp = async event => {
    const { buttonText, token, ...profileDetails } = this.state;
    this.setState({
      buttonText: 'Signing Up...'
    });
    event.preventDefault();
    const request = await axios({
      method: 'post',
      url: `${BASE_URL}/auth/register`,
      data: profileDetails
    });

    const response = await request;
    const { data } = response.data;

    if (response.status === 201) {
      localStorage.setItem('token', data[0].token);
    }
  };

  render() {
    return (
      <React.Fragment>
        <Header />
        <main>
          <section className="container form-container section-dark">
            <h2 className="section-title">Sign Up</h2>
            <form
              onSubmit={this.handleSignUp}
              className="form-card"
              method="post"
            >
              <InputField
                forAttr={'firstname'}
                label={'Enter First Name'}
                fieldType={'text'}
                required={'*'}
                fieldId={'firstname'}
                fieldName={'firstname'}
                placeHolder={'Enter First Name'}
                inputChangeHandler={this.inputChangeHandler}
              />
              <InputField
                forAttr={'lastname'}
                label={'Enter Last Name'}
                fieldType={'text'}
                required={'*'}
                fieldId={'lastname'}
                fieldName={'lastname'}
                placeHolder={'Enter Last Name'}
                inputChangeHandler={this.inputChangeHandler}
              />
              <InputField
                forAttr={'othername'}
                label={'Enter Other Name'}
                fieldType={'text'}
                required={''}
                fieldId={'othername'}
                fieldName={'othername'}
                placeHolder={'Enter Other Name'}
                inputChangeHandler={this.inputChangeHandler}
              />
              <InputField
                forAttr={'username'}
                label={'Enter Username'}
                fieldType={'text'}
                required={'*'}
                fieldId={'username'}
                fieldName={'username'}
                placeHolder={'Enter Username'}
                inputChangeHandler={this.inputChangeHandler}
              />
              <InputField
                forAttr={'email'}
                label={'Enter Email'}
                fieldType={'email'}
                required={'*'}
                fieldId={'email'}
                fieldName={'email'}
                placeHolder={'Enter Email'}
                inputChangeHandler={this.inputChangeHandler}
              />
              <InputField
                forAttr={'phonenumber'}
                label={'Enter Phone Number'}
                fieldType={'tel'}
                required={'*'}
                fieldId={'phonenumber'}
                fieldName={'phonenumber'}
                placeHolder={'Enter Phone Number'}
                inputChangeHandler={this.inputChangeHandler}
              />
              <InputField
                forAttr={'password'}
                label={'Enter Password'}
                fieldType={'password'}
                required={'*'}
                fieldId={'password'}
                fieldName={'password'}
                placeHolder={'Enter Password'}
                inputChangeHandler={this.inputChangeHandler}
              />
              <button type="submit" className="btn btn-primary">
                {this.state.buttonText === 'Signing Up...' ? <Spinner /> : ''}
                {'  '}
                {this.state.buttonText}
              </button>
            </form>
          </section>
        </main>
        <Footer />
      </React.Fragment>
    );
  }
}

export default SignUp;
