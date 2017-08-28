import * as types from '../../constants/action-types';


export function setEnvironment(date, UTCOffset, shadows) {
  return {
    type: types.SET_ENVIRONMENT,
    date,
    UTCOffset,
    shadows,
  };
}

export function setDate(date) {
  return {
    type: types.SET_DATE,
    date,
  };
}

export function setShadows(shadows) {
  return {
    type: types.SET_SHADOWS,
    shadows,
  };
}
