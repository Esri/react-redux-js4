# ArcGIS JS API 4.4 / React / Redux Boilerplate

Web Scene viewer boilerplate web application using React and Redux. This boilerplate example integrates:

* ArcGIS JS API 4.4
* [React](https://facebook.github.io/react/)
* [Redux](http://redux.js.org/)
* [React Redux](https://github.com/reactjs/react-redux) (connect)
* [Redux Thunk](https://github.com/gaearon/redux-thunk)
* [Calcite Web](http://esri.github.io/calcite-web/)

It provides two useful React middleware examples:

* **arcgis-authentication** to handle Portal login
* **arcgis-sceneview** to show a SceneView with a WebScene

# Registering your App

For this code to work, you need to [register an app](http://doc.arcgis.com/en/marketplace/provider/register-app.htm), add the correct redirect URI (e.g. `http://localhost:8080`), and add the application ID to `src/constants.js`.
