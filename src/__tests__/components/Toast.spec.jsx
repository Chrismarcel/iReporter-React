import React from 'react';
import { shallow } from 'enzyme';
import Toast from '../../components/Toast';

describe('Toast component should be rendered', () => {
  const toastComponent = shallow(<Toast closeBtn />);

  it('should display a toast component', () => {
    expect(toastComponent.find('.toast').exists()).toBe(true);
    toastComponent.setProps({ closeBtn: false });
  });
});
