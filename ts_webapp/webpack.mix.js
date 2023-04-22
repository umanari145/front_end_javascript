const mix = require('laravel-mix');

mix
  .ts('ts_webapp/src/js/index.ts', 'ts_webapp/dist/js/index.js')
  .sass('ts_webapp/src/css/app.scss', 'ts_webapp/dist/css/app.css')
  .sourceMaps('true');