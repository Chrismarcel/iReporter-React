import React, { Component } from 'react';
import axios from 'axios';
import 'regenerator-runtime';
import InputField from './FormComponents.jsx';
import Header from './Header.jsx';
import Footer from './Footer.jsx';
import Spinner from './Spinner.jsx';

class SignUp extends Component {
  state = {
    username: '',
    password: '',
    firstname: '',
    lastname: '',
    othername: '',
    email: '',
    phonenumber: '',
    buttonText: 'Sign Up',
    token: ''
  };

  inputChangeHandler = event => {
    this.setState({
      [event.currentTarget.id]: event.currentTarget.value
    });
  };

  signUp = async event => {
    const { buttonText, token, ...profileDetails } = this.state;
    this.setState({
      buttonText: 'Loading'
    });
    event.preventDefault();
    const baseUrl = 'http://ireporter-api.herokuapp.com/api/v1';
    const request = await axios({
      method: 'post',
      url: `${baseUrl}/auth/register`,
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
            <form action="" className="form-card" method="post">
              <InputField
                forAttr={'firstname'}
                label={'Enter First Name'}
                type={'text'}
                required={'*'}
                fieldId={'firstname'}
                fieldName={'firstname'}
                placeHolder={'Enter First Name'}
                inputChangeHandler={this.inputChangeHandler}
              />
              <InputField
                forAttr={'lastname'}
                label={'Enter Last Name'}
                type={'text'}
                required={'*'}
                fieldId={'lastname'}
                fieldName={'lastname'}
                placeHolder={'Enter Last Name'}
                inputChangeHandler={this.inputChangeHandler}
              />
              <InputField
                forAttr={'othername'}
                label={'Enter Other Name'}
                type={'text'}
                required={''}
                fieldId={'othername'}
                fieldName={'othername'}
                placeHolder={'Enter Other Name'}
                inputChangeHandler={this.inputChangeHandler}
              />
              <InputField
                forAttr={'username'}
                label={'Enter Username'}
                type={'text'}
                required={'*'}
                fieldId={'username'}
                fieldName={'username'}
                placeHolder={'Enter Username'}
                inputChangeHandler={this.inputChangeHandler}
              />
              <InputField
                forAttr={'email'}
                label={'Enter Email'}
                type={'text'}
                required={'*'}
                fieldId={'email'}
                fieldName={'email'}
                placeHolder={'Enter Email'}
                inputChangeHandler={this.inputChangeHandler}
              />
              <InputField
                forAttr={'phonenumber'}
                label={'Enter Phone Number'}
                type={'text'}
                required={'*'}
                fieldId={'phonenumber'}
                fieldName={'phonenumber'}
                placeHolder={'Enter Phone Number'}
                inputChangeHandler={this.inputChangeHandler}
              />
              <InputField
                forAttr={'password'}
                label={'Enter Password'}
                type={'password'}
                required={'*'}
                fieldId={'password'}
                fieldName={'password'}
                placeHolder={'Enter Password'}
                inputChangeHandler={this.inputChangeHandler}
              />
              <button
                type="submit"
                onClick={this.signUp}
                className="btn btn-primary"
              >
                {this.state.buttonText === 'Loading' ? <Spinner /> : ''}
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
