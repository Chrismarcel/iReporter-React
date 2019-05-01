import React from 'react';
import { shallow } from 'enzyme';
import Modal from '../../components/Modal';

describe('Modal component should be rendered', () => {
  const modalComponent = shallow(<Modal />);

  it('should contain a modal component', () => {
    expect(modalComponent.find('.modal-toggle').exists()).toBe(true);
  });
});
