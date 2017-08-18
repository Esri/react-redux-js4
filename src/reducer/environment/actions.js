export const SET_ENVIRONMENT = 'SET_ENVIRONMENT';
export const SET_DATE = 'SET_DATE';

export function setEnvironment(date, UTCOffset, shadows) {
  return {
    type: SET_DATE,
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
