import { CREATE_REPORT, CREATE_REPORT_ERROR, PUBLISHING_REPORT } from '../actionTypes';

const initialState = {
  reportData: {},
  errors: {},
  loadingText: ''
};

/**
 * @param {object} state
 * @param {object} action
 * @returns {oject} the payload
 */
const reportReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case CREATE_REPORT:
      return {
        ...state,
        loadingText: '',
        reportData: payload
      };
    case CREATE_REPORT_ERROR:
      return {
        ...state,
        loadingText: '',
        errors: payload
      };
    case PUBLISHING_REPORT:
      return {
        ...state,
        loadingText: 'Publishing Article...'
      };
    default:
      return state;
  }
};

export default reportReducer;
