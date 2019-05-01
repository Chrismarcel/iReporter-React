import React from 'react';
import { shallow } from 'enzyme';
import { ReportCard, EmptyCard } from '../../components/ReportCard';

describe('Report Card component should be rendered', () => {
  const modalComponent = shallow(
    <ReportCard report={{ images: { length: 1 }, createdat: new Date() }} />
  );

  it('should contain a modal component', () => {
    expect(modalComponent.find('.report-card').exists()).toBe(true);
  });
});

describe('Test for conditional rendering for Report card details', () => {
  const modalComponent = shallow(
    <ReportCard report={{ status: 'drafted', images: { length: 5 }, createdat: new Date() }} />
  );

  it('should contain a modal component', () => {
    expect(modalComponent.find('.report-card').exists()).toBe(true);
  });
});

describe('Empty Report Card component should be rendered if no reports', () => {
  const modalComponent = shallow(<EmptyCard />);

  it('should contain a modal component', () => {
    expect(modalComponent.find('.no-reports').exists()).toBe(true);
  });
});
