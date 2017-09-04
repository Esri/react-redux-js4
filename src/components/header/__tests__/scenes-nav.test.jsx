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
      expect(wrapper.find('.dropdown-link').length).toBe(2);
      expect(wrapper.find('.dropdown-link').at(0).text()).toBe('Webscene 1');
      expect(wrapper.find('.dropdown-link').at(0).props().href).toBe('/?id=12345');
      expect(wrapper.find('.dropdown-link').at(1).text()).toBe('Webscene 2');
      expect(wrapper.find('.dropdown-link').at(1).props().href).toBe('/?id=67890');
    });
  });
});
