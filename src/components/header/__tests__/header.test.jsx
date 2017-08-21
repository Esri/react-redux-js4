import React from 'react';
import { shallow } from 'enzyme';
import Header from '../header';

function setup() {
  const props = {};
  const wrapper = shallow(<Header {...props} />);

  return { props, wrapper };
}

describe('components', () => {
  describe('<Header />', () => {
    it('should render self', () => {
      const { wrapper } = setup();

      expect(wrapper.find('header').hasClass('top-nav')).toBe(true);
      expect(wrapper.find('a').hasClass('top-nav-title')).toBe(true);
      expect(wrapper.find('a').text()).toBe('ArcGIS React Redux');
      expect(wrapper.find('Connect(ScenesNav)').length).toBe(1);
      expect(wrapper.find('Connect(IdentityNav)').length).toBe(1);
    });
  });
});
