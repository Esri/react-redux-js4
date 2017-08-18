import React from 'react';
import { mount } from 'enzyme';
import { ScenesNav } from '../scenes-nav';

function setup() {
  const props = {
    websceneItems: [{
      id: '12345',
      title: 'Webscene 1',
    },
    {
      id: '67890',
      title: 'Webscene 2',
    }],
    loadWebScene: jest.fn(),
  };
  const wrapper = mount(<ScenesNav {...props} />);

  return { props, wrapper };
}

describe('components', () => {
  describe('<ScenesNav />', () => {
    it('should render self with two scenes in the dropdown', () => {
      const { wrapper } = setup();
      expect(wrapper.find('.userscenesdropdown').hasClass('hidden')).toBe(false);
      expect(wrapper.find('.dropdown-link').length).toBe(2);
      expect(wrapper.find('.dropdown-link').at(0).text()).toBe('Webscene 1');
      expect(wrapper.find('.dropdown-link').at(1).text()).toBe('Webscene 2');
    });

    it('should call loadWebScene when web scene link is clicked', () => {
      const { props, wrapper } = setup();
      wrapper.find('.dropdown-link').at(0).simulate('click');
      expect(props.loadWebScene).toHaveBeenCalledWith('12345');
      wrapper.find('.dropdown-link').at(1).simulate('click');
      expect(props.loadWebScene).toHaveBeenCalledWith('67890');
    });
  });
});
