import React from 'react';
import { mount } from 'enzyme';
import { ShadowsNav } from '../shadows-nav';

function setup(value) {
  const props = {
    shadows: value,
    setShadows: jest.fn(),
  };
  const wrapper = mount(<ShadowsNav {...props} />);

  return { props, wrapper };
}

describe('components', () => {
  describe('<ShadowsNav />', () => {
    it('should render self with checkbox in the checked state', () => {
      const { wrapper } = setup(true);
      expect(wrapper.find('.shadow-nav').exists()).toBe(true);
      expect(wrapper.find('input').props().id).toBe('shadows');
      expect(wrapper.find('input').props().type).toBe('checkbox');
      expect(wrapper.find('input').props().checked).toBe(true);
    });


    it('should render self with checkbox in the unchecked state', () => {
      const { wrapper } = setup(false);
      expect(wrapper.find('.shadow-nav').exists()).toBe(true);
      expect(wrapper.find('input').props().id).toBe('shadows');
      expect(wrapper.find('input').props().checked).toBe(false);
    });

    it('should call setShadows when checkbox is deselected', () => {
      const { props, wrapper } = setup(true);
      wrapper.find('input').simulate('change');
      expect(props.setShadows).toHaveBeenCalledWith(true);
    });
  });
});
