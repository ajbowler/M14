var gulp = require('gulp');
var browserify = require('browserify');

/*
 * Browserify
 * 1. Only source main (browserify will find the rest)
 * 2. Browserify!
 * 3. Output to dist/bundle.js
 */
gulp.task('browserify', function() {
    gulp.src(['js/main.js'])
    .pipe(browserify({
        insertGlobals: true,
        debug: false
    }))
    .pipe(concat('bundle.js'))
    .pipe(gulp.dest('dist'));
});


// var del = require('del');
// var source = require('vinyl-source-stream');
// var stylus = require('gulp-stylus');

// var paths = {
//     css: ['src/css/**/*.styl'],
//     index_js: ['./src/js/index.jsx'],
//     js: ['src/js/*.js'],
// };

// gulp.task('clean', function(cb) {
//     del(['build'], cb);
// });

// gulp.task('css', ['clean'], function() {
//     return gulp.src(paths.css)
//         .pipe(stylus())
//         .pipe(gulp.dest('./src/css'));
// });

// gulp.task('js', ['clean'], function() {
//     // Browserify/bundle the JS.
//     browserify(paths.index_js)
//         .transform(reactify)
//         .bundle()
//         .pipe(source('bundle.js'))
//         .pipe(gulp.dest('./src/'));
// });

// // Rerun the task when a file changes
// gulp.task('watch', function() {
//     gulp.watch(paths.css, ['css']);
//     gulp.watch(paths.js, ['js']);
// });

// // The default task (called when you run `gulp` from cli)
// gulp.task('default', ['watch', 'css', 'js']);