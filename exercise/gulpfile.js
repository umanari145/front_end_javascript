const gulp = require('gulp');
const webpack = require('gulp-webpack');
const gulp_sass = require('gulp-sass');
const runSequence = require('run-sequence');
//実ファイルの読み込み
const config = require('./config.js');

//js コンパイル
gulp.task('webpack',() => {
    return gulp.src(config.webpack.entry)
        .pipe(webpack(config.webpack))
        .pipe(gulp.dest(config.js.dest));
});

//sass コンパイル
//ここをcompressedだと圧縮してcssがはかれます。
gulp.task('sass',() => {
    return gulp.src(config.css.src)
          .pipe(gulp_sass({outputStyle: 'expanded'}))
          .pipe(gulp.dest(config.css.dest));
});



gulp.task('default', () => {
  return runSequence(
    'sass',
    'webpack'
  );
})
