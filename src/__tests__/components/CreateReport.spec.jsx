import React from 'react';
import { shallow } from 'enzyme';
import 'regenerator-runtime';
import { CreateReportComponent } from '../../components/CreateReport';

describe('test Create Report component', () => {
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
    expect(createReportComponent.find('.section-title').text()).toEqual('Create Record');
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

  it('should trigger the geolocation function', () => {
    const locationBtn = createReportComponent.find('.current-location');
    const mockGeolocation = {
      getCurrentPosition: jest.fn()
    };
    global.navigator.geolocation = mockGeolocation;
    locationBtn.simulate('click', {
      preventDefault: mockFn,
      target: { name: 'comment', value: 'Some random text' }
    });
    createReportComponent.setState({ location: '4.893993093, 7.8373773' });
  });
});
