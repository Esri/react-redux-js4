import React from 'react';
import { mount } from 'enzyme';
import { WebSceneView } from '../webscene';

function setup() {
  const props = {
    init: jest.fn(),
    websceneId: 'a1b2c3',
  };
  const wrapper = mount(<WebSceneView {...props} />);

  return { props, wrapper };
}

describe('components', () => {
  describe('<WebSceneView />', () => {
    it('should render self and call init()', () => {
      const { props, wrapper } = setup();
      expect(wrapper.find('div').hasClass('websceneview')).toBe(true);
      expect(props.init).toHaveBeenCalled();
      expect(props.init).toHaveBeenCalledWith(wrapper.find('div').node, 'a1b2c3');
    });
  });
});
