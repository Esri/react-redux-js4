import authentication from '../arcgis-authentication';
import IdentityManager from 'esri/identity/IdentityManager'; // eslint-disable-line

import * as types from '../../reducer/user/actions';

jest.mock('esri/config', () => ({ request: { corsEnabledServers: [] } }), { virtual: true });

jest.mock('esri/identity/OAuthInfo', () => {
  const OAuthInfo = jest.fn();
  OAuthInfo.prototype.portalUrl = 'http://bla';
  return OAuthInfo;
}, { virtual: true });

jest.mock('esri/identity/IdentityManager', () => ({
  registerOAuthInfos: jest.fn(),
  checkSignInStatus: jest.fn(() => Promise.resolve()),
  getCredential: jest.fn(),
  destroyCredentials: jest.fn(),
}), { virtual: true });

jest.mock('esri/portal/Portal', () => {
  const Portal = jest.fn();
  Portal.prototype.load = jest.fn(() => Promise.resolve());
  Portal.prototype.user = {
    username: 'user123',
    fullName: 'John',
    email: 'john@gmail.com',
    thumbnailUrl: 'http://blabla.jpg',
  };
  Portal.prototype.queryItems = jest.fn(() => {
    console.log('query items');
    return Promise.resolve({ results: [{ id: 0, name: 'web scene' }] });
  });
  return Portal;
}, { virtual: true });

const create = () => {
  const store = {
    getState: jest.fn(() => ({})),
    dispatch: jest.fn(),
  };
  const next = jest.fn();
  const invoke = action => authentication(store)(next)(action);
  return { store, next, invoke };
};

describe('async actions', () => {
  it('passes through non-function action', () => {
    const { next, invoke } = create();
    const action = { type: 'TEST' };
    invoke(action);
    expect(next).toHaveBeenCalledWith(action);
  });

  it('loads portal and dispatches SET_IDENTITY on GET_IDENTITY', () => {
    const { next, invoke, store } = create();
    const action = { type: types.GET_IDENTITY };
    expect.hasAssertions();
    invoke(action)
      .then(() => {
        expect(store.dispatch).toHaveBeenCalledWith({
          type: types.SET_IDENTITY,
          username: 'user123',
          fullname: 'John',
          email: 'john@gmail.com',
          thumbnailurl: 'http://blabla.jpg',
        });
        expect(store.dispatch).toHaveBeenCalledWith({ type: types.GET_USER_WEBSCENES });
      });
    expect(next).toHaveBeenCalledWith(action);
    expect(IdentityManager.checkSignInStatus).toHaveBeenCalledWith('http://bla/sharing');
  });

  it('calls getCredential on SIGN_IN', () => {
    const { next, invoke } = create();
    const action = { type: types.SIGN_IN };
    invoke(action);
    expect(IdentityManager.getCredential).toHaveBeenCalledWith('http://bla/sharing');
    expect(next).toHaveBeenCalledWith(action);
  });

  it('calls destroyCredentials on SIGN_OUT', () => {
    const { next, invoke } = create();
    const action = { type: types.SIGN_OUT };
    invoke(action);
    expect(IdentityManager.destroyCredentials).toHaveBeenCalled();
    expect(next).toHaveBeenCalledWith(action);
  });

  it('loads user web scenes and dispatches SET_USER_WEBSCENES', () => {
    const { next, invoke, store } = create();
    const action = { type: types.GET_USER_WEBSCENES };
    expect.assertions(2);
    invoke(action)
      .then(() => {
        expect(store.dispatch).toHaveBeenCalledWith({
          type: types.SET_USER_WEBSCENES,
          websceneItems: [{ id: 0, name: 'web scene' }],
        });
      });
    expect(next).toHaveBeenCalledWith(action);
  });
});
