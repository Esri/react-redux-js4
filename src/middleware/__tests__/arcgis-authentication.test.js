//import configureMockStore from 'redux-mock-store'
import authentication from '../arcgis-authentication';
import IdentityManager from 'esri/identity/IdentityManager';

import * as actions from '../../reducer/user/actions'
import * as types from '../../reducer/user/actions'
//import nock from 'nock'

jest.mock('esri/identity/OAuthInfo', () => {
    return class OAuthInfo {
      constructor() {
        this.portalUrl = 'http://bla';
      }
    }
}, {virtual: true});

jest.mock('esri/identity/IdentityManager', () => {
  return {
    registerOAuthInfos: jest.fn(),
    checkSignInStatus: jest.fn(),
    getCredential: jest.fn(),
    destroyCredentials: jest.fn()
  };
}, {virtual: true});

jest.mock('esri/portal/Portal', () => {
  return class Portal {
    constructor() {
      this.load = jest.fn();
    }
  }
}, {virtual: true});


const create = () => {
  const store = {
    getState: jest.fn(() => ({})),
    dispatch: jest.fn(),
  };
  const next = jest.fn()

  const invoke = (action) => authentication(store)(next)(action)

  return {store, next, invoke}
};



//const mockStore = configureMockStore([authentication])

describe('async actions', () => {
  it('passes through non-function action', () => {
    const { next, invoke } = create()
    const action = {type: 'TEST'}
    invoke(action)
    expect(next).toHaveBeenCalledWith(action)
  })

  it('calls getCredential on SIGN_IN', () => {
    const { next, invoke } = create()
    const action = {type: 'SIGN_IN'}
    invoke(action)
    expect(IdentityManager.getCredential).toHaveBeenCalledWith('http://bla/sharing');
    expect(next).toHaveBeenCalledWith(action)
  })

  it('calls destroyCredentials on SIGN_OUT', () => {
    const { next, invoke } = create()
    const action = {type: 'SIGN_OUT'}
    invoke(action)
    expect(IdentityManager.destroyCredentials).toHaveBeenCalled;
    expect(next).toHaveBeenCalledWith(action)
  })

})
