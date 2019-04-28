import {
  CREATE_REPORT,
  CREATE_REPORT_ERROR,
  PUBLISHING_REPORT,
  FETCH_REPORTS,
  FETCHING_REPORTS,
  FETCH_REPORTS_ERROR,
  UPDATE_REPORT,
  UPDATING_REPORT,
  DELETE_REPORT,
  DELETING_REPORT,
  DELETE_REPORT_ERROR
} from '../actionTypes';

const initialState = {
  redFlagReports: [],
  interventionReports: [],
  redFlagStats: {},
  interventionStats: {},
  reportStatus: {},
  errors: {},
  loadingText: '',
  publishedReport: false,
  updatedReport: false,
  deletedReport: false
};

/**
 * @param {object} state
 * @param {object} action
 * @returns {oject} the payload
 */
const reportReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case FETCH_REPORTS:
      return {
        ...state,
        loadingText: '',
        redFlagReports: payload.redFlags,
        redFlagStats: payload.redFlagStats,
        interventionReports: payload.interventions,
        interventionStats: payload.interventionStats,
        updatedReport: false,
        deletedReport: false,
        publishedReport: false
      };
    case CREATE_REPORT:
      return {
        ...state,
        loadingText: '',
        publishedReport: true,
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
        loadingText: 'Publishing Report...'
      };
    case FETCHING_REPORTS:
      return {
        ...state,
        loadingText: 'Fetching Reports...'
      };
    case UPDATE_REPORT:
      return {
        ...state,
        updatedReport: true
      };
    case UPDATING_REPORT:
      return {
        ...state,
        loadingText: 'Updating Report...'
      };
    case DELETE_REPORT:
      return {
        ...state,
        interventionReports: payload.interventions,
        interventionStats: payload.interventionStats,
        redFlagReports: payload.redFlags,
        redFlagStats: payload.redFlagStats
      };
    case DELETING_REPORT:
      return {
        ...state,

        loadingText: 'Deleting Report...'
      };
    case DELETE_REPORT_ERROR:
      return {
        ...state,
        errors: payload
      };
    default:
      return state;
  }
};

export default reportReducer;
