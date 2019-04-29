import {
  CREATE_REPORT,
  CREATE_REPORT_ERROR,
  PUBLISHING_REPORT,
  FETCH_REPORTS,
  FETCHING_REPORTS,
  FETCH_REPORTS_ERROR,
  FETCH_SINGLE_REPORT,
  FETCHING_SINGLE_REPORT,
  FETCH_SINGLE_REPORT_ERROR,
  UPDATE_REPORT,
  UPDATING_REPORT,
  DELETE_REPORT,
  DELETING_REPORT,
  DELETE_REPORT_ERROR,
  UPDATE_STATUS,
  UPDATE_STATUS_ERROR,
  UPDATING_STATUS
} from '../actionTypes';

const initialState = {
  redFlagReports: [],
  singleReport: {},
  interventionReports: [],
  redFlagStats: {},
  interventionStats: {},
  reportStatus: {},
  errors: {},
  loadingText: '',
  publishedReport: false,
  updatedReport: false,
  deletedReport: false,
  fetchedSingleReport: false
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
        publishedReport: false,
        fetchedSingleReport: false
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
    case FETCH_SINGLE_REPORT:
      return {
        ...state,
        singleReport: payload.data,
        fetchedSingleReport: true,
        loadingText: ''
      };
    case FETCH_SINGLE_REPORT_ERROR:
      return {
        ...state,
        errors: payload
      };
    case FETCHING_SINGLE_REPORT:
      return {
        ...state,
        loadingText: 'Retrieving post...'
      };
    case UPDATE_STATUS:
      return {
        ...state,
        loadingText: '',
        interventionStats: payload.interventionStats,
        redFlagStats: payload.redFlagStats
      };
    case UPDATING_STATUS:
      return {
        ...state,
        loadingText: 'Updating Status...'
      };
    case UPDATE_STATUS_ERROR:
      return {
        ...state,
        errors: payload
      };
    default:
      return state;
  }
};

export default reportReducer;
