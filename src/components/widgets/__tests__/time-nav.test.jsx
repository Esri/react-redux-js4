import React from 'react';
import { mount } from 'enzyme';
import { TimeNav } from '../time-nav';

function setup(date) {
  const props = {
    date,
    setDate: jest.fn(),
  };
  const wrapper = mount(<TimeNav {...props} />);

  return { props, wrapper };
}

describe('components', () => {
  describe('<TimeNav />', () => {
    it('should render self with range slider in the correct position', () => {
      const { wrapper } = setup(new Date(Date.UTC(2017, 3, 15, 12, 30)));
      expect(wrapper.find('.time-nav').exists()).toBe(true);
      expect(wrapper.find('input').props().id).toBe('time');
      expect(wrapper.find('input').props().type).toBe('range');
      expect(wrapper.find('input').props().min).toBe('0');
      expect(wrapper.find('input').props().max).toBe('23.99');
      expect(wrapper.find('input').props().step).toBe('0.02');
      expect(wrapper.find('input').props().value).toBe(12.5);
    });


    it('should call setDate when range slider is changed', () => {
      const { props, wrapper } = setup(new Date(Date.UTC(2017, 3, 15, 12, 30)));
      wrapper.find('input').simulate('change');
      expect(props.setDate).toHaveBeenCalledWith(new Date(Date.UTC(2017, 3, 15, 12, 30)));
    });
  });
});
