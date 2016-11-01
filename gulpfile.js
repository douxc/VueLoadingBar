/**
 * Created by xinchao.dou on 2016/11/1.
 */
var gulp = require('gulp');
var autoprefixer = require('gulp-autoprefixer');
gulp.task('css', function() {
    gulp.src('./src/*.css')
        .pipe(autoprefixer({ browsers: ['Android >= 4.2', 'iOS >= 9', '> 5%'] }))
        .pipe(gulp.dest('./src/loadingbar.min.css'));
});