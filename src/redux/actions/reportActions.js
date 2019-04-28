import axios, { get, post, patch } from 'axios';
import {
  CREATE_REPORT,
  CREATE_REPORT_ERROR,
  PUBLISHING_REPORT,
  FETCH_REPORTS_ERROR,
  FETCH_REPORTS,
  FETCH_SINGLE_REPORT,
  FETCH_SINGLE_REPORT_ERROR,
  UPDATE_REPORT,
  UPDATING_REPORT,
  UPDATE_REPORT_ERROR,
  DELETE_REPORT,
  DELETING_REPORT,
  DELETE_REPORT_ERROR,
  FETCHING_SINGLE_REPORT
} from '../actionTypes';
import BASE_URL from '../../config';

/**
 * @method fetchReports
 * @param {object} endPoint
 * @returns {object} action object
 */
const fetchReports = async () => {
  try {
    const redFlagsRequest = await get(`${BASE_URL}/red-flags`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('userToken')}` }
    });
    const interventionsRequest = await get(`${BASE_URL}/interventions`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('userToken')}` }
    });
    const { data: redFlags } = redFlagsRequest;
    const { data: interventions } = interventionsRequest;
    return {
      type: FETCH_REPORTS,
      payload: {
        redFlags: redFlags.data,
        interventions: interventions.data,
        redFlagStats: redFlags.reportStats,
        interventionStats: interventions.reportStats
      }
    };
  } catch (error) {
    return {
      type: FETCH_REPORTS_ERROR,
      payload: error
    };
  }
};

/**
 * @method fetchSingleReport
 * @param {string} reportType
 * @param {number} id
 * @returns {object} action object
 */
const fetchSingleReport = async (reportType, id) => {
  try {
    const reportRequest = await get(`${BASE_URL}/${reportType}/${id}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('userToken')}` }
    });
    const { data: report } = reportRequest;
    return {
      type: FETCH_SINGLE_REPORT,
      payload: report
    };
  } catch (error) {
    return {
      type: FETCH_SINGLE_REPORT_ERROR,
      payload: error
    };
  }
};

/**
 * @method createReport
 * @param {object} reportData
 * @returns {object} action object
 */
const createReport = async (reportData) => {
  const { location, ...otherReportData } = reportData;
  const coordinates = location.split(',');
  const latitude = coordinates[0].trim();
  const longitude = coordinates[1].trim();

  try {
    const report = await post(
      `${BASE_URL}/${otherReportData.issue}`,
      {
        ...otherReportData,
        latitude,
        longitude
      },
      { headers: { Authorization: `Bearer ${localStorage.getItem('userToken')}` } }
    );
    const { data } = report.data;
    return {
      type: CREATE_REPORT,
      payload: data
    };
  } catch (error) {
    return {
      type: CREATE_REPORT_ERROR,
      payload: error
    };
  }
};

/**
 * @method updateReport
 * @param {object} reportData
 * @returns {object} action object
 */
const updateReport = async (reportData) => {
  const {
    reportType, id, comment, location
  } = reportData;
  const coordinates = location.split(',');
  const latitude = coordinates[0].trim();
  const longitude = coordinates[1].trim();
  try {
    const updateCommentRequest = await patch(
      `${BASE_URL}/${reportType}/${id}/comment`,
      {
        comment
      },
      {
        headers: { Authorization: `Bearer ${localStorage.getItem('userToken')}` }
      }
    );
    const updateLocationRequest = await patch(
      `${BASE_URL}/${reportType}/${id}/location`,
      { latitude, longitude },
      {
        headers: { Authorization: `Bearer ${localStorage.getItem('userToken')}` }
      }
    );

    const result = {
      commentResponse: updateCommentRequest.data,
      locationResponse: updateLocationRequest.data
    };

    return {
      type: UPDATE_REPORT,
      payload: result
    };
  } catch (error) {
    return {
      type: UPDATE_REPORT_ERROR,
      payload: error
    };
  }
};

/**
 * @method deleteReport
 * @param {string} reportType - The report id
 * @param {number} id - The report id
 * @returns {object} action object
 */
const deleteReport = async (reportType, id) => {
  try {
    await axios.delete(`${BASE_URL}/${reportType}/${id}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('userToken')}` }
    });
    const updatedReportsRequest = await fetchReports();
    const { payload } = updatedReportsRequest;

    return {
      type: DELETE_REPORT,
      payload
    };
  } catch (error) {
    return {
      type: DELETE_REPORT_ERROR,
      payload: error
    };
  }
};

/**
 * @method publishingReport
 * @returns {object} action object
 */
const publishingReport = () => ({
  type: PUBLISHING_REPORT
});

/**
 * @method updatingReport
 * @returns {object} action object
 */
const updatingReport = () => ({
  type: UPDATING_REPORT
});

/**
 * @method deletingReport
 * @returns {object} action object
 */
const deletingReport = () => ({
  type: DELETING_REPORT
});

/**
 * @method fetchingSingleReport
 * @returns {object} action object
 */
const fetchingSingleReport = () => ({
  type: FETCHING_SINGLE_REPORT
});

export {
  createReport,
  publishingReport,
  fetchReports,
  fetchSingleReport,
  fetchingSingleReport,
  updateReport,
  updatingReport,
  deleteReport,
  deletingReport
};
