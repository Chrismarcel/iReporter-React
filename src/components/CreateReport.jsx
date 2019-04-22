import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { string, func } from 'prop-types';
import ReactGoogleMapLoader from 'react-google-maps-loader';
import ReactGooglePlacesSuggest from 'react-google-places-suggest';
import { InputField, TextField } from './FormComponents';
import Spinner from './Spinner';
import { createReport, publishingReport } from '../redux/actions/reportActions';
import HelperUtils from '../utils/HelperUtils';

const GOOGLE_API_KEY = 'AIzaSyCpPGmgTAgtfyNnrBRzsOKmx3XfOpHxFK8';
const CLOUDINARY_PRESET = 'nkztoivt';
/**
 * @class CreateReport
 * @description CreateReports component
 */
export class CreateReportComponent extends Component {
  state = {
    search: '',
    value: '',
    selectedFile: ''
  };

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
  handleImageUpload = (event) => {
    const formData = new FormData();
    const { files } = event.target;
    formData.append('file', files[0]);
    formData.append('upload_preset', CLOUDINARY_PRESET);

    this.setState({ selectedFile: files[0].name });
    this.setState({ formData });
  };

  /**
   * @param {object} event React synthetic event object
   * @returns {undefined}
   */
  handleCreateReport = async (event) => {
    const {
      search, value, selectedFile, formData, ...reportState
    } = this.state;
    event.preventDefault();
    const { createReportFn, displayLoader } = this.props;
    displayLoader();
    if (formData) {
      const secureUrl = await HelperUtils.uploadImage(formData);
      this.setState({ images: secureUrl });
    }
    const { images } = this.state;
    createReportFn({ issue: 'red-flags', ...reportState, images });
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
    const { loadingText } = this.props;
    const {
      location, search, value, selectedFile
    } = this.state;

    return (
      <main>
        <section className="container form-container section-dark">
          <h2 className="section-title">Create Record</h2>
          <form onSubmit={this.handleCreateReport} className="form-card" method="post">
            <TextField
              fieldId="comment"
              fieldName="comment"
              forAttr="comment"
              required
              label="Enter issue to be reported"
              placeHolder="Enter a comment about the issue eg 'Blocked drainage system'"
              minCharLength="20"
              columnSize="10"
              inputChangeHandler={this.inputChangeHandler}
            />
            <label htmlFor="issue">
              Select Recorded type
              {' '}
              <span>*</span>
            </label>
            <select
              onChange={this.inputChangeHandler}
              type="text"
              id="issue"
              name="issue"
              className="form-element"
              required
            >
              <option value="red-flags">Red Flag</option>
              <option value="interventions">Intervention</option>
            </select>
            <div className="form-group">
              <ReactGoogleMapLoader
                params={{ key: GOOGLE_API_KEY, libraries: 'places,geocode' }}
                render={googleMaps => googleMaps && (
                <div>
                  <ReactGooglePlacesSuggest
                    autocompletionRequest={{ input: search }}
                    googleMaps={googleMaps}
                    onSelectSuggest={this.handleSelectSuggest}
                  >
                    <InputField
                      forAttr="location"
                      label="Enter Location"
                      fieldType="text"
                      required
                      fieldId="location"
                      fieldName="location"
                      placeHolder="Enter Location"
                      inputChangeHandler={this.geocodeLocation}
                      fieldValue={value}
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
            <label htmlFor="attachment">Attach Image</label>
            <div className="upload-btn-wrapper">
              <button type="button" id="attachment" className="btn btn-primary-hollow form-element">
                <i className="fas fa-cloud-upload-alt" />
                Upload media
              </button>
              <input
                accept="image/jpeg, image/jpg, image/png"
                onChange={this.handleImageUpload}
                type="file"
                name="images"
                multiple
              />
            </div>
            {selectedFile && (
              <ul id="file-list">
                <li>
                  {selectedFile}
                  {' '}
                  <i className="fas fa-check" />
                </li>
              </ul>
            )}
            <button type="submit" className="btn btn-primary">
              {loadingText ? <Spinner loadingText={loadingText} /> : 'Create Record'}
            </button>
          </form>
        </section>
      </main>
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
    createReportFn: createReport,
    displayLoader: publishingReport
  },
  dispatch
);

/**
 * @method mapStateToProps
 * @description maps reducer states to props
 * @param {object} * destructured reducer state object
 * @returns {object} state
 */
export const mapStateToProps = ({ report }) => {
  const { reportData, errors, loadingText } = report;
  return {
    reportData,
    errors,
    loadingText
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateReportComponent);

CreateReportComponent.propTypes = {
  createReportFn: func.isRequired,
  displayLoader: func.isRequired,
  loadingText: string.isRequired
};
