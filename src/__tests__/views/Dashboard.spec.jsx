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
      redFlagReports={[]}
      interventionReports={[]}
      fetchReportsFn={jest.fn()}
      singleReport={{ id: 3, comment: 'This is a test comment' }}
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
});
