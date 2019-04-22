import { post } from 'axios';
import { CREATE_REPORT, CREATE_REPORT_ERROR, PUBLISHING_REPORT } from '../actionTypes';
import BASE_URL from '../../config';

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

export { createReport, publishingReport };
