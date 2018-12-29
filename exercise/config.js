let dest = './dest'; // 出力先ディレクトリ
let src = './src';  // ソースディレクトリ

module.exports = {

  // jsのビルド設定
  js: {
    src: src + '/js/**',
    dest: dest + '/js/',
    uglify: true
  },
  // cssのビルド設定
  css: {
    src: src + '/css/**',
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
