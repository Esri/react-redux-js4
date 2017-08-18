export const SET_ENVIRONMENT = 'SET_ENVIRONMENT';
export const SET_DATE = 'SET_DATE';
export const SET_SHADOWS = 'SET_SHADOWS';

export function setEnvironment(date, UTCOffset, shadows) {
  return {
    type: SET_ENVIRONMENT,
    date,
    UTCOffset,
    shadows,
  };
}

export function setDate(date) {
  return {
    type: SET_DATE,
    date,
  };
}

export function setShadows(shadows) {
  return {
    type: SET_SHADOWS,
    shadows,
  };
}
