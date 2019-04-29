import React, { Component, Fragment } from 'react';
import 'regenerator-runtime';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  func, bool, objectOf, string
} from 'prop-types';
import { Redirect } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { ReportCard, EmptyCard } from '../components/ReportCard';
import {
  fetchReports,
  fetchingReports,
  deleteReport,
  deletingReport,
  fetchSingleReport,
  fetchingSingleReport
} from '../redux/actions/reportActions';
import Modal from '../components/Modal';
import Spinner from '../components/Spinner';
import HelperUtils from '../utils/HelperUtils';
import MapComponent from '../components/MapComponent';

/**
 * @class Dashboard
 * @description Dashboard component
 * @param {object} event - Synthetic event object
 */
export class DashboardView extends Component {
  state = {
    reportType: 'red-flags',
    modalType: '',
    modalIsOpen: '',
    reportId: 0
  };

  /**
   * @method componentDidMount
   * @returns {undefined}
   */
  componentDidMount() {
    const { fetchReportsFn, fetchingReportsFn, isLoggedIn } = this.props;
    if (isLoggedIn) {
      fetchingReportsFn();
      fetchReportsFn();
    }
  }

  toggleModal = (event) => {
    event.preventDefault();
    const modalType = event.target.dataset.type;
    this.setState({ reportId: event.target.id, modalIsOpen: 'modal-open', modalType });
  };

  closeModal = () => {
    this.setState({ modalIsOpen: '', modalType: '', reportFetched: false });
  };

  handleDeleteReport = () => {
    const { reportId, reportType } = this.state;
    const { deleteReportFn, deletingReportFn, fetchReportsFn } = this.props;
    fetchReportsFn();
    deletingReportFn();
    deleteReportFn(reportType, reportId).then(() => {
      this.setState({ modalIsOpen: '', modalType: '' });
    });
  };

  // Retrieve single report content from the network
  handleFetchSingleReport = () => {
    const { fetchSingleReportFn, fetchingSingleReportFn } = this.props;
    const { reportType, reportId } = this.state;
    fetchingSingleReportFn();
    fetchSingleReportFn(reportType, reportId).then(() => {
      this.setState({ reportFetched: true });
    });
  };

  // Display contents of the modal
  displaySingleReport = () => {
    const { singleReport, loadingText } = this.props;
    return (
      <div className="modal-body">
        {loadingText && <Spinner loadingText={loadingText} />}
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

  displayDeleteModal = () => {
    const { loadingText } = this.props;
    return (
      <Fragment>
        <p className="modal-message">
          {loadingText ? (
            <Spinner loadingText={loadingText} />
          ) : (
            'Are you sure you want to delete record?'
          )}
        </p>
        {!loadingText && (
          <div className="modal-group">
            <button
              type="button"
              onClick={this.closeModal}
              className="btn btn-primary modal-btn"
              id="cancel"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={this.handleDeleteReport}
              className="btn btn-warning modal-btn"
              id="delete"
            >
              Delete
            </button>
          </div>
        )}
      </Fragment>
    );
  };

  toggleReportType = (event) => {
    const { id } = event.target;
    this.setState({ reportType: id });

    const { fetchReportsFn } = this.props;
    fetchReportsFn();
  };

  /**
   * @method render
   * @description React render method
   * @returns {JSX} React component markup
   */
  render() {
    const {
      isLoggedIn,
      isAdmin,
      redFlagReports,
      interventionReports,
      redFlagStats,
      singleReport,
      interventionStats,
      userData,
      loadingText
    } = this.props;

    const {
      email, fullname, phonenumber, username
    } = userData;

    let modalTitle;
    let modalClass;

    const {
      reportType, modalIsOpen, modalType, reportFetched
    } = this.state;

    if (modalType === 'delete') {
      modalTitle = 'Delete Report';
      modalClass = 'delete-modal';
    } else {
      modalTitle = 'Report Details';
      modalClass = 'report-modal';
    }

    // Sum total reports statistics
    const totalStats = { resolved: 0, pending: 0, rejected: 0 };

    [redFlagStats, interventionStats].forEach((stat) => {
      totalStats.resolved += stat.resolved;
      totalStats.pending += stat.pending;
      totalStats.rejected += stat.rejected;
    });

    // Check if single report modal is open and report has been fetched
    const reportModalIsOpen = Object.keys(singleReport).length > 0;

    const reports = reportType === 'red-flags' ? redFlagReports : interventionReports;
    const reportTitle = reportType === 'red-flags' ? 'red flags' : 'interventions';
    const reportList = reports.map(report => (
      <ReportCard key={report.id} toggleModal={this.toggleModal} report={report} />
    ));

    return (
      <React.Fragment>
        {!isLoggedIn && <Redirect to="./login" />}
        {isAdmin && <Redirect to="./admin" />}
        <Header />
        <main>
          <section className="container reports-container">
            <div className="container-header">
              <h2 className="section-title">Dashboard</h2>
              <div className="toggle-reports">
                <button
                  type="button"
                  onClick={this.toggleReportType}
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
              <h2>{`Displaying ${reportTitle} reports`}</h2>
            </div>
            <div className="profile">
              <div className="card profile-card">
                <div className="profile-image">
                  <p>{fullname && fullname.substr(0, 1)}</p>
                </div>
                <p className="profile profile-name fullname">{fullname}</p>
                <p className="profile username">{`(${username})`}</p>
                <p className="profile phonenumber">{phonenumber}</p>
                <p className="profile email">{email}</p>
                <p className="profile-divider">Reports Statistics</p>
                <p className="stat-toggle" />
                <div className="profile-stats">
                  <div className="stats">
                    <p className="stat-value" id="resolved">
                      {totalStats.resolved || 0}
                    </p>
                    <span className="stat-type">Resolved</span>
                  </div>
                  <div className="stats">
                    <p className="stat-value" id="pending">
                      {totalStats.pending || 0}
                    </p>
                    <span className="stat-type">Pending</span>
                  </div>
                  <div className="stats">
                    <p className="stat-value" id="rejected">
                      {totalStats.rejected || 0}
                    </p>
                    <span className="stat-type">Rejected</span>
                  </div>
                </div>
              </div>
              <div className="user-reports">
                {loadingText && <Spinner loadingText={loadingText} />}
                <div className="column cards-list">
                  {reportList.length > 0 ? reportList : <EmptyCard reportType={reportTitle} />}
                </div>
              </div>
            </div>
          </section>
          {modalIsOpen && (
            <Modal
              closeModal={this.closeModal}
              title={modalTitle}
              modalClass={`${modalClass} ${modalIsOpen}`}
            >
              {modalType === 'delete' && this.displayDeleteModal()}
              {modalType === 'report' && !reportFetched && this.handleFetchSingleReport()}
              {reportModalIsOpen && modalType === 'report' && this.displaySingleReport()}
            </Modal>
          )}
        </main>
        <Footer />
      </React.Fragment>
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
    deleteReportFn: deleteReport,
    deletingReportFn: deletingReport,
    fetchSingleReportFn: fetchSingleReport,
    fetchingSingleReportFn: fetchingSingleReport,
    fetchingReportsFn: fetchingReports
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
  const {
    errors, isLoggedIn, isAdmin, userData, token
  } = auth;
  const {
    redFlagReports,
    interventionReports,
    redFlagStats,
    singleReport,
    interventionStats,
    loadingText
  } = reports;

  return {
    errors,
    loadingText,
    redFlagReports,
    redFlagStats,
    interventionReports,
    interventionStats,
    isLoggedIn,
    isAdmin,
    userData,
    singleReport,
    token
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DashboardView);

DashboardView.propTypes = {
  fetchReportsFn: func.isRequired,
  fetchingReportsFn: func.isRequired,
  isLoggedIn: bool.isRequired,
  isAdmin: bool.isRequired,
  loadingText: string.isRequired,
  redFlagReports: objectOf.isRequired,
  interventionReports: objectOf.isRequired,
  redFlagStats: objectOf.isRequired,
  interventionStats: objectOf.isRequired,
  userData: objectOf.isRequired,
  deleteReportFn: func.isRequired,
  deletingReportFn: func.isRequired,
  fetchSingleReportFn: func.isRequired,
  fetchingSingleReportFn: func.isRequired,
  singleReport: objectOf.isRequired
};
