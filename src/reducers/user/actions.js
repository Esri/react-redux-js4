import OAuthInfo from 'esri/identity/OAuthInfo';
import IdentityManager from 'esri/identity/IdentityManager';
import Portal from 'esri/portal/Portal';

import { APP_ID } from '../../constants';

//export const SELECTION_CHANGE = 'SELECTION_CHANGE';
export const SET_IDENTITY = 'SET_IDENTITY';
export const SET_USER_WEBSCENES = 'SET_USER_WEBSCENES';


export function checkSignInStatus() {
    return (dispatch) => {
        var info = new OAuthInfo({
            appId: APP_ID,
            popup: false
          });

        IdentityManager.registerOAuthInfos([info]); 

        IdentityManager.checkSignInStatus(info.portalUrl + "/sharing")
            .then((response) => {
                dispatch(getIdentity());
            });
    }
}

export function signIn() {
    return (dispatch) => {
        var info = new OAuthInfo({
            appId: APP_ID,
            popup: false
          });

        IdentityManager.registerOAuthInfos([info]); 

        IdentityManager.checkSignInStatus(info.portalUrl + "/sharing")
            .then((response) => {
                dispatch(getIdentity());
            })
            .otherwise(() => {
                IdentityManager.getCredential(info.portalUrl + "/sharing")
                    .then(() => {
                        dispatch(getIdentity());
                    })
                    .otherwise(error => console.log(error));
            });
    }
}

export function signOut() {
    return (dispatch) => {
        IdentityManager.destroyCredentials();
        window.location.reload();
    }
}

export function getIdentity() {
    return (dispatch) => {
        var portal = new Portal();
        portal.authMode = 'immediate';
        portal.load()
            .then(() => {
                dispatch(setIdentity(portal.user.username, portal.user.fullName, portal.user.email, portal.user.thumbnailUrl));
                dispatch(queryItems(portal));
            })
            .otherwise(error => console.log(error));
    }
}

export function queryItems(portal) {
    return (dispatch, getState) => {
        portal.queryItems({
                query: "owner:" + portal.user.username + " AND type: Web Scene",
                sortField: "modified",
                sortOrder: "desc",
                num: 15
            })
            .then(({ results }) => dispatch(setUserWebscenes(results)));
    }
}

export function setIdentity(username, fullname, email, thumbnailurl) {
  return { 
    type: SET_IDENTITY, 
    username,
    fullname,
    email,
    thumbnailurl
  };
}

export function setUserWebscenes(websceneItems) {
    return {
        type: SET_USER_WEBSCENES,
        websceneItems
    }
}
