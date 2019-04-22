import {
  REGISTER_USER,
  REGISTER_ERROR,
  LOGIN_USER,
  LOGIN_ERROR,
  PROCESSING_REQUEST,
  CLEAR_AUTH_ERROR
} from '../actionTypes';

const initialState = {
  userData: {},
  errors: {},
  loadingText: ''
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
        loadingText: '',
        userData: payload
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
        loadingText: '',
        userData: payload
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
    default:
      return state;
  }
};

export default authReducer;
