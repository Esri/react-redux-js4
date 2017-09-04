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

import { SELECTION_SET, SELECTION_TOGGLE, SELECTION_RESET } from '../../constants/action-types';

const initialState = [];

const findItem = (array, layer, OID) =>
  array.find(item => item.layer === layer && item.OID === OID);

const addItem = (array, layer, OID) => {
  const newArray = array.slice();
  newArray.push({
    layer,
    OID,
  });
  return newArray;
};

const removeItem = (array, layer, OID) => {
  const newArray = array.slice();
  newArray.splice(array.findIndex(item => item.layer === layer && item.OID === OID), 1);
  return newArray;
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SELECTION_SET:
      return [{
        layer: action.layer,
        OID: action.OID,
      }];
    case SELECTION_TOGGLE:
      return findItem(state, action.layer, action.OID)
        ? removeItem(state, action.layer, action.OID) : addItem(state, action.layer, action.OID);
    case SELECTION_RESET:
      return initialState;
    default:
      return state;
  }
};
