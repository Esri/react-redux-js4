var gulp = require('gulp');
var babel = require('gulp-babel');
var connect = require('gulp-connect');

gulp.task('react', function () {
  return gulp.src([
    'src/*.jsx', 'src/**/*.jsx', 'src/**/**/*.jsx',
    'src/*.js', 'src/**/*.js', 'src/**/**/*.js',
    '!src/**/**/__tests__/*.js'
  ])
  .pipe(babel({
    sourceMaps: 'inline',
    presets: ['es2015', 'stage-0', 'react'],
    plugins: ['transform-es2015-modules-amd']
  }))
  .pipe(gulp.dest('dist'))
  .pipe(connect.reload());
});

gulp.task('watch', function(){
  gulp.watch([
    'src/*.jsx', 'src/**/*.jsx', 'src/**/**/*.jsx',
    'src/*.js', 'src/**/*.js', 'src/**/**/*.js'
  ], ['react']);
});

gulp.task('webserver', function() {
  connect.server({
    livereload: true
  }); 
});

gulp.task('default', ['react', 'webserver', 'watch']);
