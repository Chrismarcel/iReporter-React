import React from 'react';
import { Link } from 'react-router-dom';
import { objectOf } from 'prop-types';
import HelperUtils from '../utils/HelperUtils';

/**
 * @method ReportCard
 * @description - Card component for rendering reports
 * @returns {JSX} JSX markup
 */
const ReportCard = ({ report }) => (
  <div className="card report-card">
    <p className="report-time">
      <i className="icon icon-blue fas fa-clock" />
      {HelperUtils.convertUTCTOLocalTime(report.createdat)}
    </p>
    <div className={`report-status ${report.status}`}>{report.status}</div>
    <p data-type="red-flag" data-id="25" className="report-comment">
      {report.comment}
    </p>
    <Link to={`./report/${report.id}`} className="expand-report">
      See more details
    </Link>
    <div className="report-media">
      <div className="report-image">
        <i className="icon icon-blue fas fa-images" />
        {report.images.length}
        {' '}
        {report.images.length === 1 ? 'Photo' : 'Photos'}
      </div>
    </div>
    <p className="report-location">
      <i className="icon icon-blue fas fa-map-marker-alt" />
      {`${report.latitude}, `}
      {report.longitude}
    </p>
    <a href="./edit-report.html?type=red-flags&amp;id=25" className="btn btn-primary edit-report">
      <i className="icon icon-white fas fa-pen" />
      Edit Report
    </a>
    <button
      type="button"
      className="btn btn-warning delete-report"
      id="delete-25"
      data-type="red-flag"
    >
      <i className="icon icon-white fas fa-trash-alt" />
      Delete Report
    </button>
  </div>
);

export default ReportCard;

ReportCard.propTypes = {
  report: objectOf.isRequired
};
