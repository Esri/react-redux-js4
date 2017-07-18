//import configureMockStore from 'redux-mock-store'
import authentication from '../arcgis-authentication';
import IdentityManager from 'esri/identity/IdentityManager';
import Portal from 'esri/portal/Portal';

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
    checkSignInStatus: jest.fn(() => Promise.resolve()),
    getCredential: jest.fn(),
    destroyCredentials: jest.fn()
  };
}, {virtual: true});

jest.mock('esri/portal/Portal', () => {
  return class Portal {
    constructor() {
      this.load = jest.fn(() => Promise.resolve()),
      this.user = {
        username: 'user123',
        fullName: 'John',
        email: 'john@gmail.com',
        thumbnailUrl: 'http://blabla.jpg'
      }
      this.queryItems = jest.fn(() => Promise.resolve({ results: [{id: 0, name: 'web scene'}] }));
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

describe('async actions', () => {
  it('passes through non-function action', () => {
    const { next, invoke } = create()
    const action = {type: 'TEST'}
    invoke(action)
    expect(next).toHaveBeenCalledWith(action)
  })

  it('loads portal and dispatches SET_IDENTITY on GET_IDENTITY', () => {
    const { next, invoke, store } = create()
    const action = {type: types.GET_IDENTITY}
    expect.assertions(4);
    invoke(action)
      .then(() => {
        expect(store.dispatch).toHaveBeenCalledWith({
          type: types.SET_IDENTITY,
          username: 'user123',
          fullname: 'John',
          email: 'john@gmail.com',
          thumbnailurl: 'http://blabla.jpg'
        })
        expect(store.dispatch).toHaveBeenCalledWith({
          type: types.GET_USER_WEBSCENES
        })
      });
    expect(next).toHaveBeenCalledWith(action);
    expect(IdentityManager.checkSignInStatus).toHaveBeenCalledWith('http://bla/sharing');
  })

  it('calls getCredential on SIGN_IN', () => {
    const { next, invoke } = create()
    const action = {type: types.SIGN_IN}
    invoke(action)
    expect(IdentityManager.getCredential).toHaveBeenCalledWith('http://bla/sharing');
    expect(next).toHaveBeenCalledWith(action)
  })

  it('calls destroyCredentials on SIGN_OUT', () => {
    const { next, invoke } = create()
    const action = {type: types.SIGN_OUT}
    invoke(action)
    expect(IdentityManager.destroyCredentials).toHaveBeenCalled;
    expect(next).toHaveBeenCalledWith(action)
  })

  it('loads user web scenes and dispatches SET_USER_WEBSCENES', () => {
    const { next, invoke, store } = create()
    const action = {type: types.GET_USER_WEBSCENES}
    expect.assertions(2);
    invoke(action)
      .then(() => {
        expect(store.dispatch).toHaveBeenCalledWith({
          type: types.SET_USER_WEBSCENES,
          websceneItems: [{id: 0, name: 'web scene'}]
        })
      });
    expect(next).toHaveBeenCalledWith(action);
  })
})
