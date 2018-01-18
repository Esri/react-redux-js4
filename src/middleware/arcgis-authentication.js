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
/*eslint-disable */
import esriConfig from 'esri/config';
import OAuthInfo from 'esri/identity/OAuthInfo';
import IdentityManager from 'esri/identity/IdentityManager';
import Portal from 'esri/portal/Portal';
/* eslint-enable */

import { APP_ID, APP_PORTAL_URL } from '../constants/app-constants';

import {
  GET_IDENTITY,
  SET_IDENTITY,
  SIGN_IN,
  SIGN_OUT,
  GET_USER_WEBSCENES,
  SET_USER_WEBSCENES,
} from '../constants/action-types';


esriConfig.portalUrl = APP_PORTAL_URL;
const info = new OAuthInfo({ appId: APP_ID, popup: false, portalUrl: APP_PORTAL_URL });
const portal = new Portal({ authMode: 'immediate' });


IdentityManager.registerOAuthInfos([info]);

/**
 * Middleware function with the signature
 *
 * storeInstance =>
 * functionToCallWithAnActionThatWillSendItToTheNextMiddleware =>
 * actionThatDispatchWasCalledWith =>
 * valueToUseAsTheReturnValueOfTheDispatchCall
 *
 * Typically written as
 *
 * store => next => action => result
 */
const arcgisMiddleWare = store => next => (action) => {
  switch (action.type) {
    case GET_IDENTITY:
      next(action);
      return IdentityManager.checkSignInStatus(`${info.portalUrl}/sharing`)
        .then(() => portal.load())
        .then(() => {
          store.dispatch({
            type: SET_IDENTITY,
            username: portal.user.username,
            fullname: portal.user.fullName,
            email: portal.user.email,
            thumbnailurl: portal.user.thumbnailUrl,
          });

          store.dispatch({ type: GET_USER_WEBSCENES });
        });


    case SIGN_IN:
      IdentityManager.getCredential(`${info.portalUrl}/sharing`);
      return next(action);


    case SIGN_OUT:
      IdentityManager.destroyCredentials();
      window.location.reload();
      return next(action);


    case GET_USER_WEBSCENES:
      next(action);
      return portal.queryItems({
        query: `owner:${portal.user.username} AND type: Web Scene`,
        sortField: 'modified',
        sortOrder: 'desc',
        num: 15,
      })
        .then(({ results }) => store.dispatch({
          type: SET_USER_WEBSCENES,
          websceneItems: results,
        }));


    default:
      return next(action);
  }
};


export default arcgisMiddleWare;
