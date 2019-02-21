var gulp = require( 'gulp' ),
    lint = require( 'gulp-eslint' ),
    test = require( 'gulp-qunit' ),
    fix = require( 'gulp-plumber' ),
    run = require( 'run-sequence');

var testpage = './tests/test.html',
    testjs = './tests/tests.js';

var jssource = './src/simplate.js',
    jsdestination = './src';

gulp.task( 'lint', function() {
  return gulp.src( jssource )
    .pipe( fix() )
    .pipe( lint() )
    .pipe( lint.format() )
    .pipe( lint.failAfterError() )
    .pipe( gulp.dest( jsdestination ) )
});

gulp.task( 'test', function() {
  return gulp.src( testpage )
        .pipe( test() );
});

gulp.task( 'watch', function() {
  gulp.watch( testjs , ['test'] );
  gulp.watch( jssource , ['test','lint'] );
});

gulp.task( 'default', ['watch']);
