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
