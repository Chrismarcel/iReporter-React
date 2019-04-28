import React, { Fragment, Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import {
  string, func, bool, objectOf
} from 'prop-types';
import ReactGoogleMapLoader from 'react-google-maps-loader';
import ReactGooglePlacesSuggest from 'react-google-places-suggest';
import dotenv from 'dotenv';
import Spinner from '../components/Spinner';
import { fetchReports, updateReport, updatingReport } from '../redux/actions/reportActions';
import Footer from '../components/Footer';
import Header from '../components/Header';

dotenv.config();

/**
 * @class EditReport
 * @description EditReports component
 */
export class EditReportComponent extends Component {
  state = {
    search: '',
    value: ''
  };

  /**
   * @method componentDidMount
   * @returns {undefined}
   */
  componentDidMount() {
    const { fetchReportsFn, isLoggedIn, match } = this.props;

    if (isLoggedIn) {
      fetchReportsFn();
    }
    const { params } = match;
    const { reportType, id } = params;

    const type = reportType === 'interventions' ? 'interventionReports' : 'redFlagReports';
    const { [type]: reportList } = this.props;
    const reportToUpdate = reportList.filter(report => report.id === Number(id));
    const { comment, latitude, longitude } = reportToUpdate[0];

    this.setState({ comment, location: `${latitude}, ${longitude}` });
  }

  /**
   * @param {object} event React synthetic event object
   * @returns {undefined}
   */
  inputChangeHandler = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  /**
   * @param {object} event React synthetic event object
   * @returns {undefined}
   */
  geocodeLocation = (event) => {
    this.setState({ search: event.target.value, value: event.target.value });
  };

  /**
   * @param {object} event React synthetic event object
   * @returns {undefined}
   */
  handleEditReport = async (event) => {
    const {
      search, value, formData, ...reportState
    } = this.state;
    event.preventDefault();
    const { displayLoader, updateReportFn, match } = this.props;
    const { params } = match;
    const { reportType, id } = params;
    displayLoader();
    updateReportFn({
      reportType,
      id,
      ...reportState
    });
  };

  /**
   * @param {object} suggest Object containing Google Maps suggested places
   * @returns {undefined}
   */
  handleSelectSuggest = (suggest) => {
    const { location } = suggest.geometry;
    this.setState({
      search: '',
      value: suggest.formatted_address,
      location: `${location.lat()}, ${location.lng()}`
    });
  };

  retrieveLocation = () => {
    navigator.geolocation.getCurrentPosition((pos) => {
      this.setState({ location: `${pos.coords.latitude}, ${pos.coords.longitude}` });
    });
  };

  /**
   * @method render
   * @description React's render method
   * @returns {JSX} JSX markup
   */
  render() {
    const { loadingText, isLoggedIn, updatedReport } = this.props;
    const {
      location, search, value, comment
    } = this.state;

    return (
      <Fragment>
        {!isLoggedIn && <Redirect to="/login" />}
        {updatedReport && <Redirect to="/dashboard" />}
        <Header />
        <main>
          <section className="container form-container section-dark">
            <h2 className="section-title">Edit Report</h2>
            <form onSubmit={this.handleEditReport} className="form-card" method="post">
              <label htmlFor={comment}>Update report comment</label>
              <textarea
                id="comment"
                name="comment"
                label="Update comment to be reported"
                value={comment}
                minLength="20"
                col="10"
                onChange={this.inputChangeHandler}
              />
              <div className="form-group">
                <ReactGoogleMapLoader
                  params={{ key: process.env.GOOGLE_API_KEY, libraries: 'places,geocode' }}
                  render={googleMaps => googleMaps && (
                  <div>
                    <ReactGooglePlacesSuggest
                      autocompletionRequest={{ input: search }}
                      googleMaps={googleMaps}
                      onSelectSuggest={this.handleSelectSuggest}
                    >
                      <label htmlFor="location">
                            Update Location
                        <span>*</span>
                      </label>
                      <input
                        type="text"
                        id="location"
                        name="location"
                        className="form-element"
                        placeholder="Enter Location"
                        onChange={this.geocodeLocation}
                        value={value}
                      />
                    </ReactGooglePlacesSuggest>
                  </div>
                  )
                  }
                />
                <span className="divider">OR</span>
                <button
                  onClick={this.retrieveLocation}
                  type="button"
                  className="btn btn-primary current-location"
                >
                  Use current location
                </button>
              </div>
              <p id="coordinates" data-coordinates="">
                {location && `Selected location coordinates are ${location}`}
              </p>
              <button type="submit" className="btn btn-primary">
                {loadingText ? <Spinner loadingText={loadingText} /> : 'Update Record'}
              </button>
            </form>
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
    updateReportFn: updateReport,
    displayLoader: updatingReport
  },
  dispatch
);

/**
 * @method mapStateToProps
 * @description maps reducer states to props
 * @param {object} * destructured reducer state object
 * @returns {object} state
 */
export const mapStateToProps = ({ reports, auth }) => {
  const { isLoggedIn } = auth;
  const {
    errors, loadingText, interventionReports, redFlagReports, updatedReport
  } = reports;

  return {
    reports,
    errors,
    loadingText,
    isLoggedIn,
    interventionReports,
    redFlagReports,
    updatedReport
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditReportComponent);

EditReportComponent.propTypes = {
  displayLoader: func.isRequired,
  loadingText: string.isRequired,
  isLoggedIn: bool.isRequired,
  updatedReport: bool.isRequired,
  fetchReportsFn: func.isRequired,
  updateReportFn: func.isRequired,
  updatingReportFn: func.isRequired,
  match: objectOf.isRequired,
  reportData: objectOf.isRequired
};
