/**
 * ESLint will not find these Esri modules because they are loaded as externals.
 * Specifying them as 'core-modules' will prevent ESLint from stumbling over them.
 */
module.exports = {
  "rules": {
    "import/no-extraneous-dependencies": 0,
    "import/extensions": 0,
  },
  "settings": {
    "import/core-modules": [
      "esri/config",
      "esri/identity/OAuthInfo",
      "esri/identity/IdentityManager",
      "esri/portal/Portal",
      "esri/views/SceneView",
      "esri/WebScene",
    ],
  },
};
