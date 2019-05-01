import React from 'react';
import { shallow } from 'enzyme';
import 'regenerator-runtime';
import { CreateReportComponent } from '../../views/CreateReport';

describe('test Create Report component', () => {
  const mockGeolocation = {
    getCurrentPosition: jest.fn()
  };
  global.navigator.geolocation = mockGeolocation;

  const mockFn = jest.fn();
  const createReportComponent = shallow(
    <CreateReportComponent
      isLoggedIn
      displayLoader={mockFn}
      createReportFn={mockFn}
      loadingText="Loading"
    />
  );
  it('should ensure that header exists', () => {
    expect(createReportComponent.find('.section-title').text()).toEqual('Create Report');
  });

  it('should mock form submission with image', async () => {
    const mockImageData = new File(['image content'], { type: 'image/*' });
    const reportForm = createReportComponent.find('form.form-card');
    createReportComponent.setState({ formData: mockImageData, selectedFile: 'image.png' });
    reportForm.simulate('submit', {
      target: { files: [mockImageData] },
      preventDefault: mockFn
    });
  });

  it('should mock image selection', () => {
    const mockImageData = new File(['image content'], { type: 'image/*' });
    const reportForm = createReportComponent.find('input[name="images"]');
    createReportComponent.setState({ formData: mockImageData, selectedFile: 'image.png' });
    reportForm.simulate('change', {
      target: { files: [mockImageData] },
      preventDefault: mockFn
    });
  });

  it('should mock form submission without image', async () => {
    const reportForm = createReportComponent.find('form.form-card');
    createReportComponent.setState({ formData: '', selectedFile: '' });
    reportForm.simulate('submit', {
      target: { files: '' },
      preventDefault: mockFn
    });
  });

  it('should mock user input', () => {
    const selectReportType = createReportComponent.find('select');
    selectReportType.simulate('change', {
      preventDefault: mockFn,
      target: { name: 'comment', value: 'Some random text' }
    });
    createReportComponent.setProps({ loadingText: '' });
    createReportComponent.update();
  });

  it('should trigger the necessary functions when passed the correct props', () => {
    createReportComponent.instance().geocodeLocation({ target: { value: 'Mock location' } });
    createReportComponent
      .instance()
      .getUserLocation({ coords: { latitude: 4.5758484, longitude: 9.758575 } });
    createReportComponent.instance().handleSelectSuggest({
      geometry: { location: { lat: jest.fn(), lng: jest.fn() } },
      formatted_address: 'Mock address'
    });
    createReportComponent.setProps({
      isAdmin: false,
      isLoggedIn: false,
      loadingText: false,
      publishedReport: true
    });
    createReportComponent.setProps({
      isAdmin: true,
      isLoggedIn: true
    });
  });
});
