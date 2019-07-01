'use strict';

const _ = require('lodash');
const RemoteModuleError = require('./error');

module.exports = function(app, cache, channel, rds) {
  if (!rds) return;

  let redis = null;
  if (_.isString(rds)) {
    redis = app.redis.get(rds);
  } else if (_.isFunction(rds)) {
    redis = app.redis(app);
  }

  if (!redis) throw new RemoteModuleError('invalid redis client');

  redis.on('message', (chan, msg) => {
    if (channel !== chan) return;
    const key = channel + ':' + msg;
    if (cache[key]) {
      delete cache[key];
    }
  });
  redis.subscribe(channel);
};
