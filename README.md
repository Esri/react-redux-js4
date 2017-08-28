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
* **arcgis-sceneview** to show a SceneView with a WebScene, handle selection, and environment changes.

The example application displays a web scene with a simple sun position slider.

![Cover image](/img/screenshot1.jpg?raw=true "Cover image")

# Instructions

### Registering your App

For this code to work, you need to
[register an app](http://doc.arcgis.com/en/marketplace/provider/register-app.htm) in ArcGIS Online,
add the correct redirect URI (e.g. `http://localhost:8080`), and add the App ID to
`src/constants.js`.

* [How to register an app in ArcGIS Online](http://doc.arcgis.com/en/marketplace/provider/register-app.htm)
* Make sure to set the correct redirect URI (e.g. `http://localhost:8080`)

Finally, update `src/constants/app-constants.js` to contain your App ID (and portal URL if not ArcGIS Online):

```javascript
export const APP_ID = '<insert App ID here>';
export const APP_PORTAL_URL = 'https://www.arcgis.com';

export default APP_ID;
```

### Installing

Download the repository and install the dependencies:

```
$ npm install
```

### Running

Run tests:

```
$ npm test
```

Run [ESLint](http://eslint.org/):

```
$ gulp lint
```

Build and run live server:

```
$ gulp server
```

# Development Workflow

The [ArcGIS JS API](https://developers.arcgis.com/javascript/) is based on
[Dojo](https://dojotoolkit.org/). To make this ES6 application work, we use
[Babel](https://babeljs.io/) to transpile and [Webpack](https://webpack.github.io/) to bundle it
into an AMD module. This AMD module is configured as the application (app) in
[dojoConfig.js](src/dojoConfig.js).

This package uses [Gulp](https://gulpjs.com/) for workflow automation.

# Redux Dev Tools

This package supports the [Redux DevTools Extension](https://github.com/zalmoxisus/redux-devtools-extension)
for Chrome. You can browse the state and dispatch actions live while the application is running.

![Redux Dev Tools](/img/screenshot2.jpg?raw=true "Redux Dev Tools")

# Hot Module Replacement

This example supports [Hot Module Replacement](https://webpack.js.org/concepts/hot-module-replacement/).
Updated **components** or **reducers** are automatically replaced while the application is running.
The state is preserved during updates, and the web scene does not need to be reloaded.

![Hot Module Replacement](/img/screenshot3.jpg?raw=true "Hot Module Replacement")

# Tests

This example includes [Jest](http://facebook.github.io/jest/) tests for:

* Action creators
* Reducers
* ArcGIS Middleware

And [Enzyme](http://airbnb.io/enzyme/index.html) tests for:

* Components

For more details on testing see
[Writing Tests - Redux](http://redux.js.org/docs/recipes/WritingTests.html).
