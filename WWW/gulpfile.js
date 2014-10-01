var gulp = require('gulp');

var browserify = require('browserify');
var del = require('del');
var reactify = require('reactify');
var source = require('vinyl-source-stream');
var jest = require('jest-cli');
var jestConfig = require('./jest.json');

var files = {
  main_js: ['./js/main.jsx'],
  jsx: ['./js/*.jsx']
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
   .pipe(gulp.dest(paths.build));
});

gulp.task('test', function() {
    jest.runCLI({config: jestConfig},jestConfig.rootDir);
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
  .pipe(gulp.dest(paths.build));
});

// Rerun the task when a file changes
gulp.task('watch', function() {
  gulp.watch(files.jsx, ['dev']);
});

// The default task (called when you run `gulp` from cli)
gulp.task('default', ['watch', 'dev']);