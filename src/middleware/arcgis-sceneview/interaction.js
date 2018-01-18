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

import {
  SELECTION_SET,
  SELECTION_ADD,
  SELECTION_REMOVE,
  SELECTION_RESET,
} from '../../constants/action-types';


export const getSelectionType = (shiftKey, altKey) => {
  if (shiftKey) return SELECTION_ADD;
  if (altKey) return SELECTION_REMOVE;
  return SELECTION_SET;
};


export const registerClickEvent = (view, store) =>
  view.on('click', event =>
    view.hitTest(event.screenPoint)
      .then((response) => {
        const graphic = response.results && response.results[0] && response.results[0].graphic;

        if (graphic) {
          store.dispatch({
            type: getSelectionType(event.native.shiftKey, event.native.altKey),
            layer: graphic.layer.id,
            OID: graphic.attributes[graphic.layer.objectIdField],
          });

          return;
        }

        if (!event.native.shiftKey && !event.native.altKey) {
          store.dispatch({ type: SELECTION_RESET });
        }
      }));


export default registerClickEvent;
