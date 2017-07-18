export const GET_IDENTITY = 'GET_IDENTITY';
export const SET_IDENTITY = 'SET_IDENTITY';
export const SIGN_IN = 'SIGN_IN';
export const SIGN_OUT = 'SIGN_OUT';
export const GET_USER_WEBSCENES = 'GET_USER_WEBSCENES';
export const SET_USER_WEBSCENES = 'SET_USER_WEBSCENES';

export function getIdentity() {
  return {
    type: GET_IDENTITY,
  };
}

export function setIdentity(username, fullname, email, thumbnailurl) {
  return {
    type: SET_IDENTITY,
    username,
    fullname,
    email,
    thumbnailurl,
  };
}

export function signIn() {
  return {
    type: SIGN_IN,
  };
}

export function signOut() {
  return {
    type: SIGN_OUT,
  };
}

export function getUserWebscenes() {
  return {
    type: GET_USER_WEBSCENES,
  };
}

export function setUserWebscenes(websceneItems) {
  return {
    type: SET_USER_WEBSCENES,
    websceneItems,
  };
}
