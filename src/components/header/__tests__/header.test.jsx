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
