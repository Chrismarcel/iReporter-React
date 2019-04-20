import React, { Component } from 'react';
import axios from 'axios';
import 'regenerator-runtime';
import InputField from './FormComponents.jsx';
import Header from './Header.jsx';
import Footer from './Footer.jsx';
import Spinner from './Spinner.jsx';
import BASE_URL from '../config';

class Login extends Component {
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
      [event.target.id]: event.target.value
    });
  };

  handleLogin = async event => {
    const { buttonText, token, ...profileDetails } = this.state;
    this.setState({
      buttonText: 'Logging in...'
    });
    event.preventDefault();
    const request = await axios({
      method: 'post',
      url: `${BASE_URL}/auth/login`,
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
            <h2 className="section-title">Login</h2>
            <form
              onSubmit={this.handleLogin}
              className="form-card"
              method="post"
            >
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

export default Login;
