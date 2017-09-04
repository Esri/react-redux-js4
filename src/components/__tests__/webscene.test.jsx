/* Copyright 2017 Esri
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */

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
