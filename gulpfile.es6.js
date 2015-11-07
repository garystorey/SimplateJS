
'use strict';

import gulp from 'gulp';
import ugly from 'gulp-uglify';
import ren from 'gulp-rename';
import hint from 'gulp-jshint';
import fix from 'gulp-plumber';
import test from 'gulp-qunit';
import run from 'run-sequence';

let settings = {};
settings.rename = '.min';
settings.test.html = './tests/test.html';
settings.test.js = './tests/tests.js';
settings.js.src = './src/simplate.js';
settings.js.dest = './dist';


gulp.task( 'js', () => {
  gulp.src( settings.js.src )
    .pipe( fix() )
    .pipe( hint() )
    .pipe( hint.reporter( 'default' ) )
    .pipe( gulp.dest( settings.js.dest ) )
    .pipe( ugly() )
    .pipe( ren( settings.rename ) )
    .pipe( gulp.dest( settings.js.dest ) );
});

gulp.task( 'test', () => {
  gulp.src( settings.test.html ).pipe( test() );
});


gulp.task( 'testAndjs', () => {
  run('js', 'test');
});

gulp.task( 'watch', () => {
  gulp.watch( settings.test.js , 'test' );
  gulp.watch( settings.js.src , 'testAndjs' );
});

gulp.task( 'default', 'watch' );
