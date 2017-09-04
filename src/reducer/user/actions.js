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

import * as types from '../../constants/action-types';


export function getIdentity() {
  return {
    type: types.GET_IDENTITY,
  };
}

export function setIdentity(username, fullname, email, thumbnailurl) {
  return {
    type: types.SET_IDENTITY,
    username,
    fullname,
    email,
    thumbnailurl,
  };
}

export function signIn() {
  return {
    type: types.SIGN_IN,
  };
}

export function signOut() {
  return {
    type: types.SIGN_OUT,
  };
}

export function getUserWebscenes() {
  return {
    type: types.GET_USER_WEBSCENES,
  };
}

export function setUserWebscenes(websceneItems) {
  return {
    type: types.SET_USER_WEBSCENES,
    websceneItems,
  };
}
