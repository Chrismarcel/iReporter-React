import React, { Component } from 'react';
import 'regenerator-runtime';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { func, bool, objectOf } from 'prop-types';
import { Redirect } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import { ReportCard, EmptyCard } from './ReportCard';
import { fetchReports } from '../redux/actions/reportActions';

/**
 * @class Dashboard
 * @description Dashboard component
 * @param {object} event - Synthetic event object
 */
class Dashboard extends Component {
  /**
   * @returns {undefined}
   */
  componentDidMount() {
    const { fetchReportsFn, isLoggedIn } = this.props;
    if (isLoggedIn) {
      fetchReportsFn();
    }
  }

  /**
   * @method render
   * @description React render method
   * @returns {JSX} React component markup
   */
  render() {
    const {
      isLoggedIn, redFlagReports, redFlagStats, interventionStats
    } = this.props;
    const totalStats = [redFlagStats, interventionStats].reduce(
      (defaultStats = { resolved: 0, pending: 0, rejected: 0 }, reportStat) => {
        defaultStats.resolved += reportStat.resolved;
        defaultStats.rejected += reportStat.rejected;
        defaultStats.pending += reportStat.pending;

        return defaultStats;
      }
    );

    const reportList = redFlagReports.map(report => <ReportCard key={report.id} report={report} />);
    const {
      email, fullname, username, phonenumber
    } = localStorage;
    return (
      <React.Fragment>
        {!isLoggedIn && <Redirect to="./login" />}
        <Header />
        <main>
          <section className="container reports-container">
            <div className="container-header">
              <h2 className="section-title">Dashboard</h2>
              <div className="toggle-reports">
                <button type="button" id="red-flags" className="btn toggled">
                  Red-flags
                </button>
                <button type="button" id="interventions" className="btn">
                  Interventions
                </button>
              </div>
            </div>
            <div className="report-type">
              <h2>Displaying red-flags records</h2>
            </div>
            <div className="profile">
              <div className="card profile-card">
                <div className="profile-image">
                  <p>{fullname.substr(0, 1)}</p>
                </div>
                <p className="profile profile-name fullname">{fullname}</p>
                <p className="profile username">{username}</p>
                <p className="profile phonenumber">{phonenumber}</p>
                <p className="profile email">{email}</p>
                <p className="profile-divider">Records Statistics</p>
                <p className="stat-toggle" />
                {redFlagReports.length > 0 && (
                  <div className="profile-stats">
                    <div className="stats">
                      <p className="stat-value" id="resolved">
                        {totalStats.resolved}
                      </p>
                      <span className="stat-type">Resolved</span>
                    </div>
                    <div className="stats">
                      <p className="stat-value" id="pending">
                        {totalStats.pending}
                      </p>
                      <span className="stat-type">Pending</span>
                    </div>
                    <div className="stats">
                      <p className="stat-value" id="rejected">
                        {totalStats.rejected}
                      </p>
                      <span className="stat-type">Rejected</span>
                    </div>
                  </div>
                )}
              </div>
              <div className="user-reports">
                <div className="column cards-list">
                  {redFlagReports.length > 0 ? reportList : <EmptyCard reportType="red flags" />}
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
  const { errors, loadingText, isLoggedIn } = auth;
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
    isLoggedIn
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Dashboard);

Dashboard.propTypes = {
  fetchReportsFn: func.isRequired,
  isLoggedIn: bool.isRequired,
  redFlagReports: objectOf.isRequired,
  redFlagStats: objectOf.isRequired,
  interventionStats: objectOf.isRequired
};
