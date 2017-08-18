
export const setEnvironment = (view, date, utcOffset, shadows) => {
  view.environment.lighting.date = date;
  view.environment.lighting.displayUTCOffset = utcOffset;
  view.environment.lighting.directShadowsEnabled = shadows;
};

export default setEnvironment;
