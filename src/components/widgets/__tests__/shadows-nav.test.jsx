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
