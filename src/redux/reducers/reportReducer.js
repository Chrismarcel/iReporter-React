import {
  CREATE_REPORT,
  CREATE_REPORT_ERROR,
  PUBLISHING_REPORT,
  FETCH_REPORTS,
  FETCHING_REPORTS,
  FETCH_REPORTS_ERROR
} from '../actionTypes';

const initialState = {
  redFlagReports: [],
  interventionReports: [],
  redFlagStats: {},
  interventionStats: {},
  reportStatus: {},
  errors: {},
  loadingText: ''
};

/**
 * @param {object} state
 * @param {object} action
 * @returns {oject} the payload
 */
const reportReducer = (state = initialState, { type, payload }) => {
  console.log('Payload is', payload);
  switch (type) {
    case FETCH_REPORTS:
      return {
        ...state,
        loadingText: '',
        redFlagReports: payload.redFlags,
        redFlagStats: payload.redFlagStats,
        interventionReports: payload.interventions,
        interventionStats: payload.interventionStats
      };
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
    case FETCH_REPORTS_ERROR:
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
    case FETCHING_REPORTS:
      return {
        ...state,
        loadingText: 'Fetching Reports...'
      };
    default:
      return state;
  }
};

export default reportReducer;
