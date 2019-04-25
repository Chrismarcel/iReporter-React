import { get, post } from 'axios';
import {
  CREATE_REPORT,
  CREATE_REPORT_ERROR,
  PUBLISHING_REPORT,
  FETCH_REPORTS_ERROR,
  FETCH_REPORTS
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
 * @method publishingReport
 * @returns {object} action object
 */
const publishingReport = () => ({
  type: PUBLISHING_REPORT
});

export { createReport, publishingReport, fetchReports };
