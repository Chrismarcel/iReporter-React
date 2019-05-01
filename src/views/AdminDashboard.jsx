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
import {
  fetchReports,
  fetchingReports,
  updateReportStatus,
  fetchSingleReport,
  fetchingSingleReport,
  updatingStatus
} from '../redux/actions/reportActions';
import HelperUtils from '../utils/HelperUtils';
import Spinner from '../components/Spinner';
import Modal from '../components/Modal';
import MapComponent from '../components/MapComponent';
import Toast from '../components/Toast';

/**
 * @class AdminDashboard
 * @description AdminDashboard component
 * @param {object} event - Synthetic event object
 */
export class AdminDashboardView extends Component {
  state = {
    reportType: 'red-flags',
    modalIsOpen: '',
    reportId: 0,
    toastShow: 'toast-show',
    loadedTable: false
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
      this.setState({ loadedTable: true });
    }
  }

  closeModal = () => {
    this.setState({ modalIsOpen: '', reportFetched: false });
  };

  toggleModal = (event) => {
    event.preventDefault();
    this.setState({ reportId: event.target.id, modalIsOpen: 'modal-open' });
  };

  toggleReportType = (event) => {
    const { id: reportType } = event.target;
    this.setState({ reportType });

    const { fetchReportsFn } = this.props;
    fetchReportsFn();
  };

  // Retrieve single report content from the network
  handleFetchSingleReport = () => {
    const { fetchSingleReportFn, fetchingSingleReportFn } = this.props;
    const { reportType, reportId } = this.state;
    fetchingSingleReportFn();
    fetchSingleReportFn(reportType, reportId);
    this.setState({ reportFetched: true, loadedTable: true });
  };

  closeToast = () => {
    this.setState({ toastShow: '' });
  };

  // For testing purposes
  triggerCloseToast = () => {
    this.closeToast();
  };

  updateReportStatus = (event) => {
    event.preventDefault();
    this.setState({ toastShow: 'toast-show' });
    const reportId = event.target.dataset.id;
    const { updateReportStatusFn, displayLoader } = this.props;
    const { reportType, status } = this.state;
    displayLoader();
    const reportStatus = status || event.target.dataset.status;
    updateReportStatusFn(reportType, reportId, reportStatus);
    setTimeout(this.triggerCloseToast, 5000);
  };

  handleStatusChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  displaySingleReport = () => {
    const { singleReport, loadingText } = this.props;
    return (
      <div className="modal-body">
        {singleReport.images[0] && !loadingText && (
          <div className="modal-group modal-images">
            <img
              src={`https://res.cloudinary.com/myopinion-ng/image/upload/v1548601936/iReporter/${
                singleReport.images[0]
              }`}
              alt="Report thumbnail"
            />
          </div>
        )}

        {!loadingText && (
          <Fragment>
            <div className="modal-comment">
              <p>{singleReport.comment}</p>
            </div>
            <p className="report-time">
              <i className="icon icon-blue fas fa-clock" />
              {' '}
              {HelperUtils.convertUTCTOLocalTime(singleReport.createdat)}
            </p>
            <p className="report-location">
              <i className="icon icon-blue fas fa-map-marker-alt" />
              {' '}
              {`${singleReport.latitude}, ${singleReport.longitude}`}
            </p>
            <div className="map-container">
              <div id="map">
                <MapComponent lat={singleReport.latitude} lng={singleReport.longitude} />
              </div>
            </div>
          </Fragment>
        )}
      </div>
    );
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
      loadingText,
      singleReport,
      updatedReport
    } = this.props;

    const {
      reportType, modalIsOpen, reportFetched, toastShow, loadedTable
    } = this.state;

    const reports = reportType === 'red-flags' ? redFlagReports : interventionReports;
    const reportTitle = reportType === 'red-flags' ? 'red flags' : 'interventions';

    const reportModalIsOpen = Object.keys(singleReport).length > 0;

    // Sum total reports statistics
    const totalStats = { resolved: 0, pending: 0, rejected: 0 };

    [redFlagStats, interventionStats].forEach((stat) => {
      totalStats.resolved += stat.resolved;
      totalStats.pending += stat.pending;
      totalStats.rejected += stat.rejected;
    });

    const totalReports = totalStats.rejected + totalStats.pending + totalStats.resolved;
    const toastShouldShow = loadingText || updatedReport;
    const reportTable = reports.map((report, index) => (
      <tr key={report.id}>
        <td className="serial">{index + 1}</td>
        <td className="comment">
          <p>{report.comment}</p>
          <Link
            id={report.id}
            to={`./articles/${report.type}/${report.id}`}
            data-type={report.type}
            className="expand-report"
            onClick={this.toggleModal}
          >
            View Report Details
          </Link>
        </td>
        <td className="time">{HelperUtils.convertUTCTOLocalTime(report.createdat)}</td>
        <td>
          <form data-id={report.id} data-status={report.status} onSubmit={this.updateReportStatus}>
            <select
              name="status"
              className="form-element"
              data-id={report.id}
              onChange={this.handleStatusChange}
              defaultValue={report.status}
            >
              <option value="drafted">Drafted</option>
              <option value="investigating">Investigating</option>
              <option value="resolved">Resolved</option>
              <option value="rejected">Rejected</option>
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
                {loadingText && !loadedTable && (
                  <Spinner loadingText={loadingText || 'Fetching Reports...'} />
                )}
                {loadedTable && (
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
          {modalIsOpen && (
            <Modal
              closeModal={this.closeModal}
              title="Report Details"
              modalClass={`report-modal ${modalIsOpen}`}
            >
              {!reportFetched && this.handleFetchSingleReport()}
              {reportModalIsOpen && this.displaySingleReport()}
            </Modal>
          )}
          {toastShouldShow && (
            <Toast
              toastClass="toast-primary"
              toastShow={toastShow}
              handleCloseToast={this.closeToast}
              toastMessage={
                loadingText ? (
                  <Spinner loadingText={loadingText} />
                ) : (
                  'Report status updated successfully'
                )
              }
              closeBtn={!loadingText}
            />
          )}
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
    updateReportStatusFn: updateReportStatus,
    fetchSingleReportFn: fetchSingleReport,
    fetchingSingleReportFn: fetchingSingleReport,
    displayLoader: updatingStatus
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
    loadingText,
    singleReport,
    updatedReport
  } = reports;

  return {
    isAdmin,
    isLoggedIn,
    redFlagReports,
    redFlagStats,
    interventionReports,
    interventionStats,
    loadingText,
    singleReport,
    updatedReport
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AdminDashboardView);

AdminDashboardView.propTypes = {
  fetchReportsFn: func.isRequired,
  fetchingReportsFn: func.isRequired,
  fetchSingleReportFn: func.isRequired,
  fetchingSingleReportFn: func.isRequired,
  updateReportStatusFn: func.isRequired,
  displayLoader: func.isRequired,
  isLoggedIn: bool.isRequired,
  isAdmin: bool.isRequired,
  updatedReport: bool.isRequired,
  interventionStats: objectOf.isRequired,
  redFlagStats: objectOf.isRequired,
  interventionReports: objectOf.isRequired,
  redFlagReports: objectOf.isRequired,
  singleReport: objectOf.isRequired,
  loadingText: string.isRequired
};
