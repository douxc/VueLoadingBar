/**
 * Created by xinchao.dou on 2016/11/1.
 */
var gulp = require('gulp');
var rename = require('gulp-rename');
var autoprefixer = require('gulp-autoprefixer');
var cleanCss = require('gulp-clean-css');
var uglify = require('gulp-uglify');
gulp.task('css', function() {
    gulp.src('./src/*.css')
        .pipe(autoprefixer({ browsers: ['Android >= 4.2', 'iOS >= 9', '> 5%'] }))
        .pipe(cleanCss())
        .pipe(gulp.dest('./dist'));
});
gulp.task('js', function() {
    gulp.src('./src/*.js').pipe(uglify()).pipe(gulp.dest('./dist'));
});
gulp.task('dist', ['js', 'css']);