import {
  REGISTER_USER,
  REGISTER_ERROR,
  LOGIN_USER,
  LOGIN_ERROR,
  PROCESSING_REQUEST,
  CLEAR_AUTH_ERROR,
  LOGOUT_USER
} from '../actionTypes';

import HelperUtils from '../../utils/HelperUtils';

const initialState = {
  isLoggedIn: !!localStorage.userToken,
  userData: {
    email: localStorage.email || '',
    username: localStorage.username || '',
    phonenumber: localStorage.phonenumber || '',
    fullname: localStorage.fullname || ''
  },
  token: localStorage.userToken || '',
  errors: {},
  loadingText: '',
  isAdmin: HelperUtils.verifyToken(localStorage.userToken).isadmin
};

/**
 * @param {object} state
 * @param {object} action
 * @returns {oject} the payload
 */
const authReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case REGISTER_USER:
      return {
        ...state,
        isLoggedIn: true,
        loadingText: '',
        userData: {
          email: payload.email,
          username: payload.username,
          phonenumber: payload.phonenumber,
          fullname: `${payload.firstname} ${payload.lastname}`
        },
        token: payload.token
      };
    case REGISTER_ERROR:
      return {
        ...state,
        loadingText: '',
        errors: payload
      };
    case LOGIN_USER:
      return {
        ...state,
        isLoggedIn: true,
        loadingText: '',
        userData: {
          email: payload.email,
          username: payload.username,
          phonenumber: payload.phonenumber,
          fullname: `${payload.firstname} ${payload.lastname}`
        },
        token: payload.token
      };
    case LOGIN_ERROR:
      return {
        ...state,
        loadingText: '',
        errors: payload
      };
    case PROCESSING_REQUEST:
      return {
        ...state,
        loadingText: 'Processing Request...'
      };
    case CLEAR_AUTH_ERROR:
      return {
        ...state,
        loadingText: '',
        errors: {}
      };
    case LOGOUT_USER:
      return {
        ...state,
        isLoggedIn: false
      };
    default:
      return state;
  }
};

export default authReducer;
