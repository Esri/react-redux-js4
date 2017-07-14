export const GET_IDENTITY = 'GET_IDENTITY';
export const SIGN_IN = 'SIGN_IN';
export const SIGN_OUT = 'SIGN_OUT';
export const GET_USER_WEBSCENES = 'GET_USER_WEBSCENES';


export function getIdentity(username, fullname, email, thumbnailurl) {
  return {
    type: GET_IDENTITY,
    username,
    fullname,
    email,
    thumbnailurl
  }
}

export function signIn() {
  return {
    type: SIGN_IN
  }
}

export function signOut() {
  return {
    type: SIGN_OUT
  }
}

export function getUserWebscenes(websceneItems) {
  return {
    type: GET_USER_WEBSCENES,
    websceneItems
  }
}
