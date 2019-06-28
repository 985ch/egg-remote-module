# egg-remote-module
![node version][node-image]
[![NPM version][npm-image]][npm-url]
[![npm download][download-image]][download-url]

[node-image]: https://img.shields.io/badge/node-%3E%3D8-blue.svg
[npm-image]: https://img.shields.io/npm/v/egg-remote-module.svg?style=flat-square
[npm-url]: https://npmjs.org/package/egg-remote-module
[download-image]: https://img.shields.io/npm/dm/egg-remote-module.svg?style=flat-square
[download-url]: https://npmjs.org/package/egg-remote-module

This egg plugin provides the ability to load remote modules and can be updated via redis without restarting the project.

## Install

```bash
$ npm i egg-remote-module --save
```

## Usage

```js
// {app_root}/config/plugin.js
exports.remoteModule = {
  enable: true,
  package: 'egg-remote-module',
};
```
```js
//config/config.default.js
exports.remoteModule = {
  redis: (app) => { return redis.createClient()}, // get redis client
  channel: 'remoteModule', // the redis channel for subscribe
  modules: {
    test: { url: 'http://localhost/public/test.js' },
  },
}
```
```js
//http://localhost/public/test.js
module.exports = (ctx, params) => {
  return {
    add(a, b){
      return a + b;
    }
  }
}
```
```js
//{app_root}/app/****.js
const test = await ctx.remote('test', params);
console.log(test.add(1, 2));
```
## Use with egg-redis
When using the [egg-redis](https://github.com/eggjs/egg-redis) plugin, you can specify the redis client directly in the configuration.
```js
exports.cache9 = {
  redis: 'remote',
  channel: 'remoteModule',
  modules: {
    test: { url: 'http://localhost/public/test.js' },
  },
};
```
## Configuration

see [config/config.default.js](config/config.default.js) for more detail.

## License

[MIT](LICENSE)<br />
This README was translate by [google](https://translate.google.cn)
