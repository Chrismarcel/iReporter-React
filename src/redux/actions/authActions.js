import { post } from 'axios';
import BASE_URL from '../../config';
import 'regenerator-runtime';
import {
  REGISTER_USER,
  REGISTER_ERROR,
  LOGIN_USER,
  LOGIN_ERROR,
  PROCESSING_REQUEST,
  CLEAR_AUTH_ERROR,
  LOGOUT_USER
} from '../actionTypes';

/**
 * @method registerAction
 * @param {object} userData
 * @returns {object} action object
 */
const registerAction = async (userData) => {
  try {
    const registerUser = await post(`${BASE_URL}/auth/register`, userData);
    const { data } = registerUser.data;
    localStorage.setItem('userToken', data[0].token);
    const userDetails = data[0].user;
    const {
      username, email, firstname, lastname, phonenumber
    } = userDetails;
    localStorage.setItem('username', username);
    localStorage.setItem('email', email);
    localStorage.setItem('fullname', `${firstname} ${lastname}`);
    localStorage.setItem('phonenumber', phonenumber);
    return {
      type: REGISTER_USER,
      payload: userDetails
    };
  } catch (error) {
    return {
      type: REGISTER_ERROR,
      payload: error.response.data
    };
  }
};

/**
 * @method loginAction
 * @param {object} userData
 * @returns {object} action object
 */
const loginAction = async (userData) => {
  try {
    const loginUser = await post(`${BASE_URL}/auth/login`, userData);
    const { data } = loginUser.data;
    localStorage.setItem('userToken', data[0].token);
    const userDetails = data[0].user;
    const {
      username, email, firstname, lastname, phonenumber
    } = userDetails;
    localStorage.setItem('username', username);
    localStorage.setItem('email', email);
    localStorage.setItem('fullname', `${firstname} ${lastname}`);
    localStorage.setItem('phonenumber', phonenumber);

    return {
      type: LOGIN_USER,
      payload: userDetails
    };
  } catch (error) {
    return {
      type: LOGIN_ERROR,
      payload: error.response.data
    };
  }
};

/**
 * @method processingRequest
 * @returns {object} action object
 */
const processingRequest = () => ({
  type: PROCESSING_REQUEST
});

/**
 * @method clearErrors
 * @returns {object} action object
 */
const clearErrors = () => ({
  type: CLEAR_AUTH_ERROR
});

/**
 * @method logoutUser
 * @returns {object} action object
 */
const logoutUser = () => {
  localStorage.clear();
  return {
    type: LOGOUT_USER
  };
};

export {
  registerAction, loginAction, processingRequest, clearErrors, logoutUser
};
