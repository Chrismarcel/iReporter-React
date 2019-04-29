import React, { Component, Fragment } from 'react';
import 'regenerator-runtime';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  func, bool, objectOf, string
} from 'prop-types';
import { Link, Redirect } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { fetchReports, fetchingReports, updateReportStatus } from '../redux/actions/reportActions';
import HelperUtils from '../utils/HelperUtils';
import Spinner from '../components/Spinner';

/**
 * @class AdminDashboard
 * @description AdminDashboard component
 * @param {object} event - Synthetic event object
 */
class AdminDashboard extends Component {
  state = {
    reportType: 'red-flags'
  };

  /**
   * @method componentDidMount
   * @returns {undefined}
   */
  componentDidMount() {
    const {
      fetchReportsFn, fetchingReportsFn, isAdmin, isLoggedIn
    } = this.props;
    if (isLoggedIn && isAdmin) {
      fetchingReportsFn();
      fetchReportsFn();
    }
  }

  toggleReportType = (event) => {
    const { id } = event.target;
    this.setState({ reportType: id });

    const { fetchReportsFn } = this.props;
    fetchReportsFn();
  };

  updateReportStatus = (event) => {
    event.preventDefault();
    const { updateReportStatusFn } = this.props;
    const { reportType, status, reportId } = this.state;
    updateReportStatusFn(reportType, reportId, status);
  };

  handleStatusChange = (event) => {
    const reportId = event.target.dataset.id;
    this.setState({ [event.target.name]: event.target.value, reportId });
  };

  /**
   * @method render
   * @description React render method
   * @returns {JSX} React component markup
   */
  render() {
    const {
      interventionStats,
      redFlagStats,
      isAdmin,
      isLoggedIn,
      redFlagReports,
      interventionReports,
      loadingText
    } = this.props;

    const { reportType } = this.state;

    const reports = reportType === 'red-flags' ? redFlagReports : interventionReports;
    const reportTitle = reportType === 'red-flags' ? 'red flags' : 'interventions';

    // Sum total reports statistics
    const totalStats = { resolved: 0, pending: 0, rejected: 0 };

    [redFlagStats, interventionStats].forEach((stat) => {
      totalStats.resolved += stat.resolved;
      totalStats.pending += stat.pending;
      totalStats.rejected += stat.rejected;
    });

    const totalReports = totalStats.rejected + totalStats.pending + totalStats.resolved;

    const reportTable = reports.map((report, index) => (
      <tr key={report.id}>
        <td className="serial">{index + 1}</td>
        <td className="comment">
          <p data-type="red-flag" data-id={report.id}>
            {report.comment}
          </p>
          <Link to="./articles/report-type/id" className="expand-report">
            View Details
          </Link>
        </td>
        <td className="time">{HelperUtils.convertUTCTOLocalTime(report.createdat)}</td>
        <td>
          <form onSubmit={this.updateReportStatus}>
            <select
              name="status"
              className="form-element"
              data-id={report.id}
              onChange={this.handleStatusChange}
            >
              <option value="drafted" selected={report.status === 'drafted' && 'selected'}>
                Drafted
              </option>
              <option
                value="investigating"
                selected={report.status === 'investigating' && 'selected'}
              >
                Investigating
              </option>
              <option value="resolved" selected={report.status === 'resolved' && 'selected'}>
                Resolved
              </option>
              <option value="rejected" selected={report.status === 'rejected' && 'selected'}>
                Rejected
              </option>
            </select>
            <button
              type="submit"
              className="btn btn-primary update-record"
              data-type={report.reportType}
            >
              Update
            </button>
          </form>
        </td>
      </tr>
    ));

    return (
      <Fragment>
        <Header />
        {!isLoggedIn && !isAdmin && <Redirect to="./login" />}
        <main>
          <section className="container">
            <div className="container-header">
              <h2 className="section-title">Admin Dashboard</h2>
              <div className="toggle-reports">
                <button
                  onClick={this.toggleReportType}
                  type="button"
                  id="red-flags"
                  className={`btn ${reportType === 'red-flags' ? 'toggled' : ''}`}
                >
                  Red-flags
                </button>
                <button
                  onClick={this.toggleReportType}
                  type="button"
                  id="interventions"
                  className={`btn ${reportType === 'interventions' ? 'toggled' : ''}`}
                >
                  Interventions
                </button>
              </div>
            </div>
            <div className="report-type">
              <h2>{`Displaying all ${reportTitle} records`}</h2>
            </div>
            <div className="admin-report">
              <div className="report-stat">
                <p id="total">{totalReports || 0}</p>
                <span>Total records</span>
              </div>
              <div className="report-stat">
                <p id="pending">{totalStats.pending || 0}</p>
                <span>Pending</span>
              </div>
              <div className="report-stat">
                <p id="resolved">{totalStats.resolved || 0}</p>
                <span>Resolved</span>
              </div>
              <div className="report-stat">
                <p id="rejected">{totalStats.rejected || 0}</p>
                <span>Rejected</span>
              </div>
            </div>
            <div className="dashboard">
              <div className="admin-table">
                {loadingText && <Spinner loadingText={loadingText || 'Fetching Reports...'} />}
                {!loadingText && (
                  <table className="stats-table">
                    <tbody>
                      <tr>
                        <th>S/N</th>
                        <th>Comment</th>
                        <th>Date Reported</th>
                        <th>Change Status</th>
                      </tr>
                      {reportTable}
                    </tbody>
                  </table>
                )}
              </div>
            </div>
          </section>
        </main>
        <Footer />
      </Fragment>
    );
  }
}

/**
 * @method mapDispatchToProps
 * @description maps redux actions to props
 * @param {callback} dispatch destructured reducer state object
 * @returns {object} state
 */
export const mapDispatchToProps = dispatch => bindActionCreators(
  {
    fetchReportsFn: fetchReports,
    fetchingReportsFn: fetchingReports,
    updateReportStatusFn: updateReportStatus
  },
  dispatch
);

/**
 * @method mapStateToProps
 * @description maps reducer states to props
 * @param {object} * destructured reducer state object
 * @returns {object} state
 */
export const mapStateToProps = ({ auth, reports }) => {
  const { isLoggedIn, isAdmin } = auth;
  const {
    redFlagReports,
    interventionReports,
    redFlagStats,
    interventionStats,
    loadingText
  } = reports;

  return {
    isAdmin,
    isLoggedIn,
    redFlagReports,
    redFlagStats,
    interventionReports,
    interventionStats,
    loadingText
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AdminDashboard);

AdminDashboard.propTypes = {
  fetchReportsFn: func.isRequired,
  fetchingReportsFn: func.isRequired,
  updateReportStatusFn: func.isRequired,
  isLoggedIn: bool.isRequired,
  isAdmin: bool.isRequired,
  interventionStats: objectOf.isRequired,
  redFlagStats: objectOf.isRequired,
  interventionReports: objectOf.isRequired,
  redFlagReports: objectOf.isRequired,
  loadingText: string.isRequired
};
