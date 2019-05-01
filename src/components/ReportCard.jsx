import React from 'react';
import { Link } from 'react-router-dom';
import { objectOf, string, func } from 'prop-types';
import HelperUtils from '../utils/HelperUtils';

/**
 * @method ReportCard
 * @description - Card component for rendering reports
 * @returns {JSX} JSX markup
 */
const ReportCard = ({ report, toggleModal }) => {
  const reportImages = report.images || [];
  return (
    <div className="card report-card">
      <p className="report-time">
        <i className="icon icon-blue fas fa-clock" />
        {HelperUtils.convertUTCTOLocalTime(report.createdat)}
      </p>
      <div className={`report-status ${report.status}`}>{report.status}</div>
      <p data-type="red-flag" data-id="25" className="report-comment">
        {report.comment}
      </p>
      <Link
        to={`./aricles/${report.type}s/${report.id}`}
        id={report.id}
        onClick={toggleModal}
        className="expand-report"
        data-type="report"
      >
        See more details
      </Link>
      <div className="report-media">
        <div className="report-image">
          <i className="icon icon-blue fas fa-images" />
          {reportImages.length}
          {' '}
          {reportImages.length === 1 ? 'Photo' : 'Photos'}
        </div>
      </div>
      <p className="report-location">
        <i className="icon icon-blue fas fa-map-marker-alt" />
        {`${report.latitude}, `}
        {report.longitude}
      </p>
      {report.status === 'drafted' && (
        <Link
          id={report.id}
          to={`./edit-report/${report.type}s/${report.id}`}
          className="btn btn-primary edit-report"
        >
          <i className="icon icon-white fas fa-pen" />
          Edit Report
        </Link>
      )}
      {report.status === 'drafted' && (
        <button
          type="button"
          className="btn btn-warning delete-report"
          id={report.id}
          data-type="delete"
          onClick={toggleModal}
        >
          <i className="icon icon-white fas fa-trash-alt" />
          Delete Report
        </button>
      )}
    </div>
  );
};

/**
 * @method EmptyCard
 * @description - Card component to render if there are no lists to render
 * @returns {JSX} JSX markup
 */
const EmptyCard = ({ reportType }) => (
  <div className="card report-card no-reports">
    <p>{`You have not created any ${reportType} records`}</p>
  </div>
);

export { ReportCard, EmptyCard };

ReportCard.propTypes = {
  report: objectOf.isRequired,
  toggleModal: func.isRequired
};

EmptyCard.propTypes = {
  reportType: string.isRequired
};
