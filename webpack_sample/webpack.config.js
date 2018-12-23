

module.exports = {
  entry:'./src/main.js',
  output:{
    filename:'./app.js'
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
