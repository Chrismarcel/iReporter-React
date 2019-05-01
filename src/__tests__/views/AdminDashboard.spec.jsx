import React from 'react';
import { shallow } from 'enzyme';
import { AdminDashboardView } from '../../views/AdminDashboard';

describe('Testing Admin Dashboard Component', () => {
  const adminDashboardComponent = shallow(
    <AdminDashboardView
      isAdmin
      isLoggedIn
      singleReport={{ images: ['demo-image.png'], createdat: new Date() }}
      redFlagStats={{ resolved: 0, rejected: 5, pending: 2 }}
      interventionStats={{ resolved: 1, rejected: 3, pending: 0 }}
      redFlagReports={[{ createdat: new Date() }]}
      interventionReports={[{ createdat: new Date() }]}
      fetchReportsFn={jest.fn()}
      fetchingReportsFn={jest.fn()}
      fetchSingleReportFn={jest.fn()}
      fetchingSingleReportFn={jest.fn()}
      displayLoader={jest.fn()}
      updateReportStatusFn={jest.fn()}
      loadingText="Fetching reports"
    />
  );

  it('should show the correct title', () => {
    expect(adminDashboardComponent.find('.section-title').text()).toEqual('Admin Dashboard');
  });

  it('should trigger the necessary functions when passed the correct props', () => {
    adminDashboardComponent.instance().displaySingleReport();
    adminDashboardComponent.instance().closeModal({ target: { id: 1 } });
    adminDashboardComponent.instance().closeToast();
    adminDashboardComponent.instance().triggerCloseToast();
    adminDashboardComponent.instance().toggleReportType({ target: { id: 'interventions' } });
    adminDashboardComponent
      .instance()
      .toggleModal({ preventDefault: jest.fn(), target: { id: 1 } });
    adminDashboardComponent
      .instance()
      .updateReportStatus({ preventDefault: jest.fn(), target: { dataset: { id: 1 } } });
    adminDashboardComponent.instance().handleStatusChange({
      preventDefault: jest.fn(),
      target: { name: 'status', value: 'drafted' }
    });
    adminDashboardComponent.setProps({ isAdmin: false, loadingText: false, isLoggedIn: false });
    adminDashboardComponent.setProps({
      redFlagStats: { resolved: 0, rejected: 0, pending: 0 },
      interventionStats: { resolved: 0, rejected: 0, pending: 0 },
      loadingText: false
    });
    adminDashboardComponent.setState({ reportType: 'interventions', loadingTable: false });
  });
});
