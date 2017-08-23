const gulp = require('gulp');
const babel = require('gulp-babel');
const eslint = require('gulp-eslint');
const gutil = require('gulp-util');
const webpack = require('webpack');
const webpackConfig = require('./webpack.config.babel');
const WebpackDevServer = require('webpack-dev-server');

/* Babel */
gulp.task('babel', () => gulp.src([
  'src/*.jsx', 'src/**/*.jsx', 'src/**/**/*.jsx',
  'src/*.js', 'src/**/*.js', 'src/**/**/*.js',
  '!src/**/__tests__/*.jsx', '!src/**/**/__tests__/*.jsx',
  '!src/**/__tests__/*.js', '!src/**/**/__tests__/*.js',
])
  .pipe(babel({
    sourceMaps: 'inline',
    presets: ['es2015', 'stage-0', 'react'],
    plugins: ['transform-es2015-modules-amd'],
  }))
  .pipe(gulp.dest('target')));


/* Watcher */
gulp.task('watch', () =>
  gulp.watch([
    'src/*.jsx', 'src/**/*.jsx', 'src/**/**/*.jsx',
    'src/*.js', 'src/**/*.js', 'src/**/**/*.js',
  ], ['webpack']));


/* ES Lint */
gulp.task('lint', () => gulp.src([
  'src/*.jsx', 'src/**/*.jsx', 'src/**/**/*.jsx',
  'src/*.js', 'src/**/*.js', 'src/**/**/*.js',
])
  .pipe(eslint())
  .pipe(eslint.format())
  .pipe(eslint.failAfterError()));


/* Webpack */
gulp.task('webpack', ['babel'], (callback) => {
  const myConfig = Object.create(webpackConfig);
  myConfig.externals = /^esri/;

  // run webpack
  webpack(myConfig, (err, stats) => {
    if (err) throw new gutil.PluginError('webpack', err);
    gutil.log('[webpack]', stats.toString({
      colors: true,
      progress: true,
    }));
    callback();
  });
});


/* Webpack Dev Server */
gulp.task('server', ['webpack', 'watch'], () => {
  // modify some webpack config options
  const myConfig = Object.create(webpackConfig);
  myConfig.externals = /^esri/;

  // Start a webpack-dev-server
  new WebpackDevServer(webpack(myConfig), {
    publicPath: '/' + myConfig.output.publicPath,
    hot: true,
    stats: {
      colors: true,
    },
  }).listen(8080, 'localhost', (err) => {
    if (err) throw new gutil.PluginError('webpack-dev-server', err);
    gutil.log('[webpack-dev-server]', 'http://localhost:8080/webpack-dev-server/index.html');
  });
});
