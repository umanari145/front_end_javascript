const mix = require('laravel-mix');
const path = require('path');

const src_path = path.join(__dirname, './src/');
const dist_path = path.join(__dirname, './dist/');

mix.js(src_path + "main.js", dist_path + "app.js");
