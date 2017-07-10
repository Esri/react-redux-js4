import OAuthInfo from 'esri/identity/OAuthInfo'
import IdentityManager from 'esri/identity/IdentityManager'
import Portal from 'esri/portal/Portal'

import { APP_ID } from '../constants'

import { CHECK_SIGN_IN_STATUS, GET_IDENTITY, SET_IDENTITY, SIGN_IN, SIGN_OUT, GET_USER_WEBSCENES, SET_USER_WEBSCENES } from '../reducers/user/actions'


const info = new OAuthInfo({
  appId: APP_ID,
  popup: false
});

IdentityManager.registerOAuthInfos([info]); 

const portal = new Portal();
portal.authMode = 'immediate';


const arcgisMiddleWare = store => next => action => {
  switch (action.type) {

    case CHECK_SIGN_IN_STATUS:
      console.log('check sign in status');
      IdentityManager.checkSignInStatus(info.portalUrl + "/sharing")
        .then((response) => {
            store.dispatch({
              type: GET_IDENTITY
            });
        });

      return next(action);

    case GET_IDENTITY:

      portal.load()
        .then(() => {
          store.dispatch({
            type: SET_IDENTITY,
            username: portal.user.username,
            fullname: portal.user.fullName,
            email: portal.user.email, 
            thumbnailurl: portal.user.thumbnailUrl
          });
          store.dispatch({
            type: GET_USER_WEBSCENES
          })
        })

      return next(action);

    case GET_USER_WEBSCENES:

      portal.queryItems({
        query: "owner:" + portal.user.username + " AND type: Web Scene",
        sortField: "modified",
        sortOrder: "desc",
        num: 15
      })
        .then(({ results }) => store.dispatch({
          type: SET_USER_WEBSCENES,
          websceneItems: results
        }));

      return next(action);

    case SIGN_IN:

      IdentityManager.checkSignInStatus(info.portalUrl + "/sharing")
        .then(() => {
          store.dispatch({
            type: GET_IDENTITY
          });
        })
        .otherwise(() => {
          IdentityManager.getCredential(info.portalUrl + "/sharing")
            .then(() => {
              store.dispatch({
                type: GET_IDENTITY
              });
            })
            .otherwise(error => console.log(error));
        });

      return next(action);

    case SIGN_OUT:

      IdentityManager.destroyCredentials();
      window.location.reload();
      return next(action);


    default:
      return next(action);
  }
}

export default arcgisMiddleWare;
