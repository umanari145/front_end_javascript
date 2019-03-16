const mix = require('laravel-mix');
mix.pug = require('laravel-mix-pug');

//console.log(mix)
//pugはディレクトリのみでOK
//pugに関しては実行時ファイルの場所が起点になるっぽい
mix.pug('src/html/index.pug', '../../',{
        pug: {
            pretty: true,
            debug: false
        }
    })
    //sassは実行のsassライブラリを書かないとだめ
    .sass('src/css/index.scss', 'dest/css/index.css',{
        implementation: require('node-sass')
    })
    .js('src/js/app.js', 'dest/js/app.js');


//本番以外はdebug用にsource-mapをつける
if (!mix.inProduction()) {
    mix.webpackConfig({
        devtool: 'source-map'
    })
    .sourceMaps()
}
