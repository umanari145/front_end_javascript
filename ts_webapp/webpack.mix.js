const mix = require('laravel-mix');

mix
  .ts('ts_webapp/src/index.ts', 'ts_webapp/dist/index.js');