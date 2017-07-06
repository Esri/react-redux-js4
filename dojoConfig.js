window.dojoConfig = {
  async: true,
  deps: ['app/main'],
  packages: [{
    name: 'react',
    location: 'https://cdnjs.cloudflare.com/ajax/libs/react/15.6.1/',
    main: 'react'
  }, {
    name: 'react-dom',
    location: 'https://cdnjs.cloudflare.com/ajax/libs/react/15.6.1/',
    main: 'react-dom'
  }, {
    name: 'prop-types',
    location: 'https://unpkg.com/prop-types/',
    main: 'prop-types'
  }, {
    name: 'redux',
    location: 'https://cdnjs.cloudflare.com/ajax/libs/redux/3.7.1/',
    main: 'redux'
  }, {
    name: 'react-redux',
    location: 'https://cdnjs.cloudflare.com/ajax/libs/react-redux/5.0.5/',
    main: 'react-redux'
  }, {
    name: 'redux-thunk',
    location: 'https://cdnjs.cloudflare.com/ajax/libs/redux-thunk/2.2.0/',
    main: 'redux-thunk'
  }, {
    name: 'app',
    location: location.origin + '/dist',
    main: 'main'
  }]
};
