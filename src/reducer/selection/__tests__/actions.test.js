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

import * as actions from '../actions';
import * as types from '../../../constants/action-types';


describe('actions', () => {
  it('should create an action to set the selection', () => {
    const expectedAction = {
      type: types.SELECTION_SET,
      layer: 'foo',
      OID: 3,
    };
    expect(actions.selectionSet('foo', 3)).toEqual(expectedAction);
  });


  it('should create an action to add to the selection', () => {
    const expectedAction = {
      type: types.SELECTION_ADD,
      layer: 'foo',
      OID: 3,
    };
    expect(actions.selectionAdd('foo', 3)).toEqual(expectedAction);
  });


  it('should create an action to remove from the selection', () => {
    const expectedAction = {
      type: types.SELECTION_REMOVE,
      layer: 'foo',
      OID: 3,
    };
    expect(actions.selectionRemove('foo', 3)).toEqual(expectedAction);
  });


  it('should create an action to reset the selection', () => {
    const expectedAction = {
      type: types.SELECTION_RESET,
    };
    expect(actions.selectionReset()).toEqual(expectedAction);
  });
});
