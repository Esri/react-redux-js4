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

import reducer from '../thumbnailurl';
import * as types from '../../../constants/action-types';


describe('thumbnailurl reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(null);
  });

  it('should handle SET_IDENTITY', () => {
    expect(reducer(null, {
      type: types.SET_IDENTITY,
      thumbnailurl: 'http://bla',
    })).toEqual('http://bla');

    expect(reducer('http://bla', {
      type: types.SET_IDENTITY,
      thumbnailurl: 'http://bla2',
    })).toEqual('http://bla2');
  });
});
