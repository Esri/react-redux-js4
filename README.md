# ArcGIS JS API 4.4 / React / Redux Boilerplate

Web Scene viewer boilerplate web application using React and Redux, including the ArcGIS JS API
as middleware. This boilerplate example integrates:

* [ArcGIS JS API 4.4](https://developers.arcgis.com/javascript/)
* [React](https://facebook.github.io/react/)
* [Redux](http://redux.js.org/)
* [React Redux](https://github.com/reactjs/react-redux) (connect)
* [Redux Thunk](https://github.com/gaearon/redux-thunk)
* [Calcite Web](http://esri.github.io/calcite-web/)

It provides two useful Redux middleware examples:

* **arcgis-authentication** to handle Portal login
* **arcgis-sceneview** to show a SceneView with a WebScene

# Tests

This example includes [Jest](http://facebook.github.io/jest/) tests for:

* Action creators
* Reducers
* ArcGIS Middleware

And [Enzyme](http://airbnb.io/enzyme/index.html) tests for:

* Components

For more details on testing see
[Writing Tests - Redux](http://redux.js.org/docs/recipes/WritingTests.html).

# Registering your App

For this code to work, you need to
[register an app](http://doc.arcgis.com/en/marketplace/provider/register-app.htm), add the correct
redirect URI (e.g. `http://localhost:8080`), and add the application ID to `src/constants.js`.

# Instructions

Install dependencies:

`npm install`

Run tests:

`npm test`

Run [ESLint](http://eslint.org/):

`gulp lint`

Build and run live server:

`gulp`
