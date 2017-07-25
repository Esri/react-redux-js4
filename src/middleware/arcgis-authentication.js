import esriConfig from 'esri/config'; // eslint-disable-line
import OAuthInfo from 'esri/identity/OAuthInfo'; // eslint-disable-line
import IdentityManager from 'esri/identity/IdentityManager'; // eslint-disable-line
import Portal from 'esri/portal/Portal'; // eslint-disable-line

import { APP_ID, APP_PORTAL_URL } from '../constants';

import {
  GET_IDENTITY,
  SET_IDENTITY,
  SIGN_IN,
  SIGN_OUT,
  GET_USER_WEBSCENES,
  SET_USER_WEBSCENES,
} from '../reducer/user/actions';

esriConfig.portalUrl = APP_PORTAL_URL;
const info = new OAuthInfo({ appId: APP_ID, popup: false, portalUrl: APP_PORTAL_URL });
const portal = new Portal({ authMode: 'immediate' });


IdentityManager.registerOAuthInfos([info]);


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

          return Promise.resolve();
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
