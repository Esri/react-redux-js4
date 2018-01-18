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

 import itemReducer from './item';

 import {
   SELECTION_SET,
   SELECTION_ADD,
   SELECTION_REMOVE,
   SELECTION_RESET,
 } from '../../constants/action-types';

 const initialState = [];

 export const isEqual = (a, b) => JSON.stringify(a) === JSON.stringify(b);

 export default (state = initialState, action) => {
   switch (action.type) {
     case SELECTION_SET:
       return [itemReducer({}, action)];
     case SELECTION_ADD:
       return [
         ...state.filter(item => !isEqual(item, itemReducer({}, action))),
         itemReducer({}, action),
       ];
     case SELECTION_REMOVE:
       return state.filter(item => !isEqual(item, itemReducer({}, action)));
     case SELECTION_RESET:
       return initialState;
     default:
       return state;
   }
 };
