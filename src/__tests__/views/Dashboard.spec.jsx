import React from 'react';
import { shallow } from 'enzyme';
import 'regenerator-runtime';
import { DashboardView } from '../../views/Dashboard';

describe('test Dashboard component', () => {
  const dashboardComponent = shallow(
    <DashboardView
      isLoggedIn
      redFlagStats={{ reportStatus: { resolved: 0, rejected: 0, pending: 0 } }}
      interventionStats={{ reportStatus: { resolved: 0, rejected: 0, pending: 0 } }}
      redFlagReports={[{ createdat: new Date() }]}
      interventionReports={[{ createdat: new Date() }]}
      fetchReportsFn={jest.fn()}
      fetchingReportsFn={jest.fn()}
      fetchSingleReportFn={jest.fn()}
      fetchingSingleReportFn={jest.fn()}
      deletingReportFn={jest.fn()}
      deleteReportFn={jest.fn()}
      loadingText="Fetching reports"
      singleReport={{
        id: 3,
        comment: 'This is a test comment',
        images: ['demo.jpg'],
        createdat: new Date()
      }}
      userData={{
        email: 'mockemail@gmail.com',
        username: 'MockUsername',
        fullname: 'Mock Fullname',
        phonenumber: '08088998899'
      }}
    />
  );

  it('should ensure that header exists', () => {
    expect(dashboardComponent.find('.section-title').text()).toEqual('Dashboard');
  });

  it('should trigger the necessary functions when passed the correct props', () => {
    dashboardComponent.instance().handleFetchSingleReport();
    dashboardComponent.instance().displaySingleReport();
    dashboardComponent.instance().closeModal({ target: { id: 1 } });
    dashboardComponent.instance().displayDeleteModal();
    dashboardComponent.instance().handleDeleteReport();
    dashboardComponent.instance().toggleReportType({ target: { id: 'interventions' } });
    dashboardComponent.instance().toggleModal({
      preventDefault: jest.fn(),
      target: { id: 1, dataset: { type: 'interventions' } }
    });
    dashboardComponent.setProps({ isAdmin: true, loadingText: false, isLoggedIn: false });
    dashboardComponent.setProps({
      redFlagStats: { resolved: 0, rejected: 0, pending: 0 },
      interventionStats: { resolved: 0, rejected: 0, pending: 0 },
      loadingText: false
    });
    dashboardComponent.setState({ reportType: 'interventions', modalType: 'delete' });
    dashboardComponent.setProps({ loadingText: '', singleReport: { images: ['demo.jpg'] } });
    dashboardComponent.update();
  });
});
