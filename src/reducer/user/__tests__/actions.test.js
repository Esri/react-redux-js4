import * as actions from '../actions';

describe('actions', () => {
  it('should create an action to get the user identity', () => {
    const expectedAction = { type: actions.GET_IDENTITY };
    expect(actions.getIdentity()).toEqual(expectedAction);
  });

  it('should create an action to set the user identity', () => {
    const expectedAction = {
      type: actions.SET_IDENTITY,
      username: 'user123',
      fullname: 'John',
      email: 'john@doe.com',
      thumbnailurl: 'http://bla',
    };
    expect(actions.setIdentity('user123', 'John', 'john@doe.com', 'http://bla'))
      .toEqual(expectedAction);
  });

  it('should create an action to sign in', () => {
    const expectedAction = { type: actions.SIGN_IN };
    expect(actions.signIn()).toEqual(expectedAction);
  });

  it('should create an action to sign out', () => {
    const expectedAction = { type: actions.SIGN_OUT };
    expect(actions.signOut()).toEqual(expectedAction);
  });

  it('should create an action to get the user\'s webscenes', () => {
    const expectedAction = { type: actions.GET_USER_WEBSCENES };
    expect(actions.getUserWebscenes()).toEqual(expectedAction);
  });

  it('should create an action to set the user\'s webscenes', () => {
    const expectedAction = {
      type: actions.SET_USER_WEBSCENES,
      websceneItems: ['1', '2'],
    };
    expect(actions.setUserWebscenes(['1', '2'])).toEqual(expectedAction);
  });
});
