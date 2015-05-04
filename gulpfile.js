var gulp    = require( 'gulp' ),
    uglify  = require( 'gulp-uglify' ),
    rename  = require( 'gulp-rename' ),
    jshint  = require( 'gulp-jshint' ),
    qunit   = require( 'gulp-qunit' ),
    plumbr  = require( 'gulp-plumber' ),
    run     = require( 'run-sequence');

var renameOptions = { suffix : '.min' };

var testpage = './tests/test.html',
    testjs = './tests/tests.js';

var jssource        = './src/simplate.js',
    jsdestination   = './dist';

gulp.task( 'js', function() {
  return gulp.src( jssource )
    .pipe( plumbr() )
    .pipe( jshint() )
    .pipe( jshint.reporter( 'default' ) )
    .pipe( gulp.dest( jsdestination ) )
    .pipe( uglify() )
    .pipe( rename( renameOptions ) )
    .pipe( gulp.dest( jsdestination ) )
});

gulp.task( 'test', function() {
  return gulp.src( testpage )
        .pipe( qunit() );
});


gulp.task( 'testAndjs', function() {
  run('js','test');
});

gulp.task( 'watch', function() {
  gulp.watch( testjs , ['test'] );
  gulp.watch( jssource , ['testAndjs'] );
});

gulp.task( 'default', ['watch']);
