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
    uglify: true,

  },
  // cssのビルド設定
  css: {
    src: src + '/css/index.scss',
    dest: dest + '/css/'
  },
  //html
  html: {
    src: src +'/html/index.pug',
    dest: dirname +'/',
  },
  // webpackの設定
  webpack: {
    //これをつけるとデバッグが簡単に!
    mode:'development',
    //mode:'production',
    devtool: 'inline-source-map',
    entry: src + '/js/app.js',
    output: {
      filename: 'app.js'
    },
    module:{
      rules:[
        {
          //jsに対してbabel-loaderを適用
          test:/\.js$/,
          use:{
            loader:'babel-loader',
            options:{
              presets:['@babel/preset-env']
            }
          }
        }
      ]
    }
  }
}
