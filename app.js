'use strict';

const init = require('./lib');

module.exports = app => {
  if (app.config.remoteModule)app.remoteModule = init(app, app.config.remoteModule);
};
