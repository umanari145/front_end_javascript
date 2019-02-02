const gulp = require('gulp');
const webpack = require('gulp-webpack');
const gulp_sass = require('gulp-sass');
const runSequence = require('run-sequence');
const browserSync = require('browser-sync').create();
const path = require('path')
//設定ファイルの読み込み
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

//対象ファイルが更新されたらそれぞれのメソッドを更新
gulp.task('watch', () => {
  let watchList = [
    config.css.src,
    config.js.src
  ];
  gulp.watch(config.css.src, ['sass'] );
  gulp.watch(config.js.src, ['webpack'] );

  gulp.watch( watchList , () => {
    browserReload()
  });
});

//ホットロードの立ち上げ
gulp.task('server', () => {
  browserSync.init({
      server: {
        baseDir:config.dirname
      }
  });
});

//リロード
const browserReload = function() {
  browserSync.reload()
}

gulp.task('default', () => {
  return runSequence(
    'sass',
    'webpack',
    'server',
    'watch'
  );
})
