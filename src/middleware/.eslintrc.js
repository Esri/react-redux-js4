/**
 * ESLint will not find these Esri modules because they are loaded as externals.
 * Specifying them as 'core-modules' will prevent ESLint from stumbling over them.
 */
module.exports = {
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
