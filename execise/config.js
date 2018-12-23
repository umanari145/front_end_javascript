let dest = './dest'; // 出力先ディレクトリ
let src = './src';  // ソースディレクトリ

module.exports = {
  // 出力先の指定
  dest: dest,

  // jsのビルド設定
  js: {
    src: src + '/**',
    dest: dest + '/',
    uglify: true
  },
  // webpackの設定
  webpack: {
    entry: src + '/app.js',
    output: {
      filename: 'app.js'
    }
  }
}
