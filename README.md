# ArcGIS JS API 4.x / React / Redux Boilerplate

Web scene viewer boilerplate web application using React and Redux, including the ArcGIS JS API
as middleware. The example application displays a web scene with a simple sun position slider.

![Cover image](/img/screenshot1.jpg?raw=true "Cover image")

## Features

This boilerplate example integrates:

* [ArcGIS JS API 4.x](https://developers.arcgis.com/javascript/)
* [React](https://facebook.github.io/react/)
* [Redux](http://redux.js.org/)
* [React Redux](https://github.com/reactjs/react-redux)
* [Redux Thunk](https://github.com/gaearon/redux-thunk)
* [Calcite Web](http://esri.github.io/calcite-web/)

It provides two useful Redux
[middleware](https://medium.com/@jacobp100/you-arent-using-redux-middleware-enough-94ffe991e6) examples:

* **arcgis-authentication** to handle Portal login
* **arcgis-sceneview** to show a SceneView with a WebScene, handle selection, and environment changes.

It provides support for:

* [Redux DevTools Extension](https://github.com/zalmoxisus/redux-devtools-extension) - You can browse
  the state and dispatch actions live while the application is running.
* [Hot Module Replacement](https://webpack.js.org/concepts/hot-module-replacement/) - Updated
  **components** or **reducers** are automatically replaced while the application is running.
  The state is preserved during updates, and the web scene does not need to be reloaded.
* Tests with [Jest](http://facebook.github.io/jest/) and [Enzyme](http://airbnb.io/enzyme/index.html).

![Redux Dev Tools](/img/screenshot2.jpg?raw=true "Redux Dev Tools")

![Hot Module Replacement](/img/screenshot3.jpg?raw=true "Hot Module Replacement")

## Instructions

### Installing

Download the repository and install the dependencies:

```
$ npm install
```

### Registering your App

For this code to work, you need to
[add](http://doc.arcgis.com/en/marketplace/provider/add-item-to-agol.htm) and
[register](http://doc.arcgis.com/en/marketplace/provider/register-app.htm) an app in ArcGIS Online,
add the correct redirect URI (e.g. `http://localhost:8080`), and add the App ID to [/src/constants/app-constants.js](/src/constants/app-constants.js).

* [How to add an app in ArcGIS Online](http://doc.arcgis.com/en/marketplace/provider/add-item-to-agol.htm)
* [How to register an app in ArcGIS Online](http://doc.arcgis.com/en/marketplace/provider/register-app.htm)
* Make sure to set the correct redirect URI (e.g. `http://localhost:8080`)

Finally, update [/src/constants/app-constants.js](/src/constants/app-constants.js) to contain your App ID (and portal URL if not ArcGIS Online):

```javascript
export const APP_ID = '<insert App ID here>';
export const APP_PORTAL_URL = 'https://www.arcgis.com';
```

### Running

Run tests:

```
$ npm test
```

Run [ESLint](http://eslint.org/):

```
$ npm run lint
```

Build and run live server:

```
$ npm run server
```

## Requirements

* Notepad or your favorite editor
* [npm](https://www.npmjs.com/)
* Web browser with access to the Internet

## Resources

* [ArcGIS for JavaScript API Resource Center](https://developers.arcgis.com/javascript/)
* [How to add an app in ArcGIS Online](http://doc.arcgis.com/en/marketplace/provider/add-item-to-agol.htm)
* [How to register an app in ArcGIS Online](http://doc.arcgis.com/en/marketplace/provider/register-app.htm)
* [React](https://facebook.github.io/react/)
* [Redux](http://redux.js.org/)
* [React Redux](https://github.com/reactjs/react-redux)
* [Redux Thunk](https://github.com/gaearon/redux-thunk)
* [Calcite Web](http://esri.github.io/calcite-web/)
* [Why you aren't using Redux middleware enough](https://medium.com/@jacobp100/you-arent-using-redux-middleware-enough-94ffe991e6)
* [Writing Tests - Redux](http://redux.js.org/docs/recipes/WritingTests.html)
* [Jest Tests](http://facebook.github.io/jest/)
* [Enzyme Tests](http://airbnb.io/enzyme/index.html)
* [ArcGIS Blog](http://blogs.esri.com/esri/arcgis/)
* [twitter@esri](http://twitter.com/esri)

## Issues

Find a bug or want to request a new feature?  Please let us know by submitting an issue.

## Contributing

Esri welcomes contributions from anyone and everyone. Please see our [guidelines for contributing](https://github.com/esri/contributing).

## Licensing
Copyright 2017 Esri

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

   http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.

A copy of the license is available in the repository's [license.txt](/license.txt) file.

[](Esri Tags: ArcGIS Web Mapping QuickStart)
[](Esri Language: JavaScript)​
