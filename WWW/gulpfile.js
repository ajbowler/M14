var gulp = require('gulp');

var browserify = require('browserify');
var del = require('del');
var reactify = require('reactify');
var source = require('vinyl-source-stream');
var jest = require('jest-cli');
var jestConfig = require('./jest.json');
var livereload = require('gulp-livereload');
var uglify = require('gulp-uglify');
var streamify = require('gulp-streamify');

var files = {
  main_js: ['./js/main.jsx'],
  jsx: ['./js/**/*.jsx'],
  html: ['./**/*.html']
};

var paths = {
  build: './js/build'
};

gulp.task('clean', function(cb) {
  del(['build'], cb);
});

gulp.task('js', ['clean'], function() {
  // Browserify/bundle the JS.
  browserify(files.main_js)
    .transform(reactify)
    .bundle()
    .pipe(source('bundle.js'))
    .pipe(streamify(uglify()))
    .pipe(gulp.dest(paths.build));
});

gulp.task('dev', ['clean'], function() {
  browserify({
    entries: files.main_js,
    extensions: ['jsx'],
    debug: true
  })
  .transform(reactify)
  .bundle()
  .pipe(source('bundle.js'))
  .pipe(gulp.dest(paths.build))
  .pipe(livereload());
});

gulp.task('test', function() {
    jest.runCLI({config: jestConfig},jestConfig.rootDir);
});

// Rerun the task when a file changes
gulp.task('watch', function() {
  livereload.listen();
  gulp.watch(files.jsx, ['dev']);
  gulp.watch(files.html).on('change', livereload.changed);
});

// The default task (called when you run `gulp` from cli)
gulp.task('default', ['watch', 'dev']);