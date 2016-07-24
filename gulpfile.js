'use strict';

const exit = process.exit;
const gulp = require('gulp');
const { Use } = require('yellfy-use');
const { Loader } = require('yellfy-loader');
const logger = require('./gulp/helpers/logger');

let needToInstall = [];

global.use = new Use({
  gulp,
  helperDir: './gulp/helpers',
  reporter: (toInstall) => {
    needToInstall = needToInstall.concat(toInstall);
  }
}).use;

new Loader('./gulp/tasks', {
  gulp
}).load();

if (needToInstall.length) {
  const toInstall = needToInstall.join(' ');

  logger.error('Something is not enough.');
  logger.error(`Use 'npm i -D ${toInstall}'`);
  exit(1);
}
