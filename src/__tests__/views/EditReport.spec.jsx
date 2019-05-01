import React from 'react';
import { shallow } from 'enzyme';
import 'regenerator-runtime';
import { EditReportComponent } from '../../views/EditReport';

describe('test Create Report component', () => {
  const mockGeolocation = {
    getCurrentPosition: jest.fn()
  };
  global.navigator.geolocation = mockGeolocation;

  const mockFn = jest.fn();
  const editReportComponent = shallow(
    <EditReportComponent
      isLoggedIn
      displayLoader={mockFn}
      createReportFn={mockFn}
      loadingText="Loading"
      fetchReportsFn={mockFn}
      match={{ params: { reportType: 'red-flags', id: 40 } }}
      interventionReports={[
        {
          id: 40,
          comment: 'This is a mock comment',
          latitude: 4.7474848,
          longitude: '7.84947474'
        }
      ]}
      redFlagReports={[
        {
          id: 40,
          comment: 'This is a mock comment',
          latitude: 4.7474848,
          longitude: '7.84947474'
        }
      ]}
    />
  );
  it('should ensure that header exists', () => {
    expect(editReportComponent.find('.section-title').text()).toEqual('Edit Report');
  });

  it('should mock form submission with image', async () => {
    const mockImageData = new File(['image content'], { type: 'image/*' });
    const reportForm = editReportComponent.find('form.form-card');
    editReportComponent.setState({ formData: mockImageData, selectedFile: 'image.png' });
    reportForm.simulate('submit', {
      target: { files: [mockImageData] },
      preventDefault: mockFn
    });
  });

  it('should mock form submission without image', async () => {
    const reportForm = editReportComponent.find('form.form-card');
    editReportComponent.setState({ formData: '', selectedFile: '' });
    reportForm.simulate('submit', {
      target: { files: '' },
      preventDefault: mockFn
    });
  });

  it('should mock user input', () => {
    const enterComment = editReportComponent.find('textarea');
    enterComment.simulate('change', {
      preventDefault: mockFn,
      target: { name: 'comment', value: 'Some random text' }
    });
    editReportComponent.setProps({ loadingText: '' });
    editReportComponent.update();
  });

  it('should trigger the necessary functions when passed the correct props', () => {
    editReportComponent.instance().geocodeLocation({ target: { value: 'Mock location' } });
    editReportComponent.instance().retrieveLocation();
    editReportComponent
      .instance()
      .getUserLocation({ coords: { latitude: 4.5758484, longitude: 9.758575 } });
    editReportComponent.instance().handleSelectSuggest({
      geometry: { location: { lat: jest.fn(), lng: jest.fn() } },
      formatted_address: 'Mock address'
    });
    editReportComponent
      .instance()
      .getUserLocation({ coords: { latitude: 4.5758484, longitude: 9.758575 } });
    editReportComponent.instance().handleSelectSuggest({
      geometry: { location: { lat: jest.fn(), lng: jest.fn() } },
      formatted_address: 'Mock address'
    });
    editReportComponent.setProps({
      isAdmin: false,
      isLoggedIn: false,
      loadingText: false,
      publishedReport: true
    });
    editReportComponent.setProps({
      isAdmin: true,
      isLoggedIn: true
    });
    editReportComponent.setProps({
      match: { params: { reportType: 'interventions', id: 40 } }
    });
    editReportComponent.setProps({
      updatedReport: true
    });
  });
});
