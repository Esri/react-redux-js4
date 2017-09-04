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
