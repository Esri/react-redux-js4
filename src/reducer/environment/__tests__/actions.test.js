import * as actions from '../actions';


describe('actions', () => {
  it('should create an action to set the environment', () => {
    const expectedAction = {
      type: actions.SET_ENVIRONMENT,
      date: new Date(2017),
      UTCOffset: -1,
      shadows: true,
    };
    expect(actions.setEnvironment(new Date(2017), -1, true)).toEqual(expectedAction);
  });


  it('should create an action to set the date', () => {
    const expectedAction = {
      type: actions.SET_DATE,
      date: new Date(2017),
    };
    expect(actions.setDate(new Date(2017))).toEqual(expectedAction);
  });


  it('should create an action to set the shadows', () => {
    const expectedAction = {
      type: actions.SET_SHADOWS,
      shadows: false,
    };
    expect(actions.setShadows(false)).toEqual(expectedAction);
  });
});
