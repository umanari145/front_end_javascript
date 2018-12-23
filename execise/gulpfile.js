const gulp = require('gulp');
const webpack = require('gulp-webpack');
//実ファイルの読み込み
const config = require('./config.js');


gulp.task('webpack',function(){
    return gulp.src(config.webpack.entry)
        .pipe(webpack(config.webpack))
        .pipe(gulp.dest(config.js.dest));
});
