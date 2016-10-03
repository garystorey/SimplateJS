var gulp = require( 'gulp' ),
    min = require( 'gulp-uglify' ),
    ren = require( 'gulp-rename' ),
    lint = require( 'gulp-eslint' ),
    test = require( 'gulp-qunit' ),
    fix = require( 'gulp-plumber' ),
    run = require( 'run-sequence');

var renOptions = { suffix : '.min' };

var testpage = './tests/test.html',
    testjs = './tests/tests.js';

var jssource = './src/simplate.js',
    jsdestination = './dist';

gulp.task( 'build', function() {
  return gulp.src( jssource )
    .pipe( fix() )
    .pipe( lint() )
    .pipe( lint.format() )
    .pipe( lint.failAfterError() )
    .pipe( gulp.dest( jsdestination ) )
    .pipe( min() )
    .pipe( ren( renOptions ) )
    .pipe( gulp.dest( jsdestination ) )
});

gulp.task( 'test', function() {
  return gulp.src( testpage )
        .pipe( test() );
});

gulp.task( 'buildtest', function() {
  run('build','test');
});

gulp.task( 'watch', function() {
  gulp.watch( testjs , ['test'] );
  gulp.watch( jssource , ['test','build'] );
});

gulp.task( 'default', ['watch']);
