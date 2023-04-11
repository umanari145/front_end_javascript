const mix = require('laravel-mix');
const path = require('path');

/* いろいろやるが直でつかえない・・・
mix.alias({
    "@src": path.join(__dirname, './src/'),
    "@dist": path.join(__dirname, './dist/')
});
// /var/www/html/laravel_mix
*/

const src_path = path.join(__dirname, './src/');
const dist_path = path.join(__dirname, './dist/');

mix.js(src_path + "main.js", dist_path + "app.js");
