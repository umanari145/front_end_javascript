const path = require('path')
let dirname = path.resolve('./')

let dest = dirname + '/dest'; // 出力先ディレクトリ
let src =  dirname + '/src';  // ソースディレクトリ

module.exports = {
  dirname:dirname,
  // jsのビルド設定
  js: {
    src: src + '/js/**/*.js',
    dest: dest + '/js/',
    uglify: true
  },
  // cssのビルド設定
  css: {
    src: src + '/css/**/*.scss',
    dest: dest + '/css/'
  },
  // webpackの設定
  webpack: {
    entry: src + '/js/app.js',
    output: {
      filename: 'app.js'
    }
  }
}
