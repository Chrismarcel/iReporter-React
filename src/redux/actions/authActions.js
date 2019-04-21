import { post } from 'axios';
import BASE_URL from '../../config';
import {
  REGISTER_USER,
  REGISTER_ERROR,
  LOGIN_USER,
  LOGIN_ERROR,
  PROCESSING_REQUEST,
  CLEAR_AUTH_ERRORS
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
    return {
      type: REGISTER_USER,
      payload: registerUser.data
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
    return {
      type: LOGIN_USER,
      payload: data
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
  type: CLEAR_AUTH_ERRORS
});

export {
  registerAction, loginAction, processingRequest, clearErrors
};
