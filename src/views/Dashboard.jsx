import React, { Component } from 'react';
import 'regenerator-runtime';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { func, bool, objectOf } from 'prop-types';
import { Redirect } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { ReportCard, EmptyCard } from '../components/ReportCard';
import { fetchReports } from '../redux/actions/reportActions';

/**
 * @class Dashboard
 * @description Dashboard component
 * @param {object} event - Synthetic event object
 */
export class DashboardView extends Component {
  state = {
    reportType: 'red-flags'
  };

  /**
   * @method componentDidMount
   * @returns {undefined}
   */
  componentDidMount() {
    const { fetchReportsFn, isLoggedIn } = this.props;
    if (isLoggedIn) {
      fetchReportsFn();
    }
  }

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
      redFlagReports,
      interventionReports,
      redFlagStats,
      interventionStats,
      userData
    } = this.props;

    const {
      email, fullname, phonenumber, username
    } = userData;

    const { reportType } = this.state;

    const totalStats = [redFlagStats, interventionStats].reduce(
      (defaultStats = { resolved: 0, pending: 0, rejected: 0 }, reportStat) => {
        defaultStats.resolved += reportStat.resolved;
        defaultStats.rejected += reportStat.rejected;
        defaultStats.pending += reportStat.pending;

        return defaultStats;
      }
    );

    const reports = reportType === 'red-flags' ? redFlagReports : interventionReports;
    const reportTitle = reportType === 'red-flags' ? 'red flags' : 'interventions';
    const reportList = reports.map(report => <ReportCard key={report.id} report={report} />);

    return (
      <React.Fragment>
        {!isLoggedIn && <Redirect to="./login" />}
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
                <p className="profile username">{username}</p>
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
                <div className="column cards-list">
                  {reportList.length > 0 ? reportList : <EmptyCard reportType={reportTitle} />}
                </div>
              </div>
            </div>
          </section>
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
    fetchReportsFn: fetchReports
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
    errors, loadingText, isLoggedIn, userData, token
  } = auth;
  const {
    redFlagReports, interventionReports, redFlagStats, interventionStats
  } = reports;
  return {
    errors,
    loadingText,
    redFlagReports,
    redFlagStats,
    interventionReports,
    interventionStats,
    isLoggedIn,
    userData,
    token
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DashboardView);

DashboardView.propTypes = {
  fetchReportsFn: func.isRequired,
  isLoggedIn: bool.isRequired,
  redFlagReports: objectOf.isRequired,
  interventionReports: objectOf.isRequired,
  redFlagStats: objectOf.isRequired,
  interventionStats: objectOf.isRequired,
  userData: objectOf.isRequired
};
