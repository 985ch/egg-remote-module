'use strict';

const RemoteModuleError = require('./error');
const redis = require('./redis');
const requireString = require('require-from-string');

module.exports = function(app, config) {
  const modules = config.modules || {};
  const channel = config.channel || 'remoteModule';
  const cache = {};

  redis(app, cache, channel, config.redis);

  return async (ctx, name, params) => {
    const info = modules[name];
    if (!info) throw new RemoteModuleError('undefined module:' + name);

    const key = channel + ':' + name;
    let m = cache[key];
    if (m) return m;

    const { status, data } = await ctx.curl(info.url, { dataType: 'text' });
    if (status !== 200) {
      throw new RemoteModuleError('failed to get remote script ' + name, { status, data });
    }
    m = requireString(data, 'remoteModule/' + name)(ctx, params);
    cache[key] = m;

    return m;
  };
};
