var gulp = require('gulp');

var browserify = require('browserify');
var del = require('del');
var reactify = require('reactify');
var source = require('vinyl-source-stream');

var paths = {
    main_js: ['./js/main.jsx'],
    jsx: ['./js/*.jsx']
};

gulp.task('clean', function(cb) {
    del(['build'], cb);
});

gulp.task('js', ['clean'], function() {
    // Browserify/bundle the JS.
    browserify(paths.main_js)
        .transform(reactify)
        .bundle()
        .pipe(source('bundle.js'))
        .pipe(gulp.dest('./js/build/'));
});

gulp.task('dev', ['clean'], function() {
    browserify({
        entries: paths.main_js,
        extensions: ['jsx'],
        debug: true
    })
    .transform(reactify)
    .bundle()
    .pipe(source('bundle.js'))
    .pipe(gulp.dest('./js/build/'));
});

// Rerun the task when a file changes
gulp.task('watch', function() {
    gulp.watch(paths.jsx, ['dev']);
});

// The default task (called when you run `gulp` from cli)
gulp.task('default', ['watch', 'dev']);