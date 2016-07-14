// include gulp
var gulp = require('gulp'),
   jshint = require('gulp-jshint'),
   concat = require('gulp-concat'),
   stripDebug = require('gulp-strip-debug'),
   uglify = require('gulp-uglify'),
   server = require( 'gulp-develop-server' );

// JS hint task
gulp.task('jshint', function() {
  gulp.src(['./middlewares/*.js', './routes/*.js', './shakaApi/*.js'])
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

// JS concat, strip debugging and minify
gulp.task('scripts', function() {
  gulp.src(['./middlewares/*.js', './routes/*.js', './shakaApi/*.js'])
    .pipe(concat('script.js'))
    .pipe(stripDebug())
    .pipe(uglify())
    .pipe(gulp.dest('./build/'));
});


// run server
gulp.task( 'server:start', function() {
    server.listen( { path: './shakaApi/server.js' } );
});

// default gulp task
gulp.task('default', ['scripts', 'server:start'], function() {
  // watch for JS changes
  gulp.watch(['./middlewares/*.js', './routes/*.js', './shakaApi/*.js'],['server:start']);

});
