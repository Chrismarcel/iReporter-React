import React from 'react';
import { mount } from 'enzyme';
import MapComponent from '../../components/MapComponent';

describe('Test for map component', () => {
  const mapComponent = mount(
    <MapComponent google={{ google: {} }} lat={6.73638863} lng={6.897068686} />
  );
  it('should render a text field with the passed in prop', () => {
    expect(mapComponent.find('textarea').exists()).toBe(false);
  });
});
