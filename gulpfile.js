var gulp    = require( 'gulp' ),
    uglify  = require( 'gulp-uglify' ),
    concat  = require( 'gulp-concat' ),
    rename  = require( 'gulp-rename' ),
    jshint  = require( 'gulp-jshint' ),
    plumbr  = require( 'gulp-plumber' );

var renameOptions = { suffix : '.min' };

var jssource        ='./src/**.*',
    jsfilename      = 'simplate.js',
    jsdestination   ='./dist';

gulp.task('js', function() {
  return gulp.src( jssource )
    .pipe( plumbr() )
    .pipe( concat( jsfilename ) )
    .pipe( jshint() )
    .pipe( jshint.reporter( 'default' ) )
    .pipe( gulp.dest( jsdestination ) )
    .pipe( uglify() )
    .pipe( rename( renameOptions ) )
    .pipe( gulp.dest( jsdestination ) )
});

gulp.task( 'watch', function() {
  gulp.watch( jssource , ['js'] );
});

gulp.task( 'default', ['watch']);
