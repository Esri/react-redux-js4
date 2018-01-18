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

import reducer from '../index';
import * as types from '../../../constants/action-types';


describe('selection reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual([]);
  });

  it('should handle SELECTION_SET', () => {
    expect(reducer([], {
      type: types.SELECTION_SET,
      layer: 'foo',
      OID: 1,
    })).toEqual([{
      layer: 'foo',
      OID: 1,
    }]);
  });

  it('should handle SELECTION_ADD', () => {
    expect(reducer([], {
      type: types.SELECTION_ADD,
      layer: 'foo',
      OID: 1,
    })).toEqual([{
      layer: 'foo',
      OID: 1,
    }]);
  });

  it('should handle SELECTION_REMOVE', () => {
    expect(reducer([{
      layer: 'foo',
      OID: 1,
    }], {
      type: types.SELECTION_REMOVE,
      layer: 'foo',
      OID: 1,
    })).toEqual([]);
  });
});
