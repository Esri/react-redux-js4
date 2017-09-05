window.dojoConfig = {
  async: true,
  deps: ['app/bundle'],
  packages: [{
    name: 'app',
    location: `${location.origin}${location.pathname}dist`,
    main: 'bundle',
  }],
};
